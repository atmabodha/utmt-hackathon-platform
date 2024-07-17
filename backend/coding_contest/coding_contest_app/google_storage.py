import os
import io
import json
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from google.auth.transport.requests import Request
from google.auth.exceptions import RefreshError
from tempfile import SpooledTemporaryFile
from django.core.files.storage import Storage
from googleapiclient.http import MediaIoBaseUpload
from django.conf import settings
from coding_contest.settings import CLIENT_SECRET_FILE

SCOPES = ["https://www.googleapis.com/auth/drive.file"]
TOKEN_FILE = os.path.join(settings.BASE_DIR, "token.json")
DRIVE_FOLDER_ID_JSON_PATH = os.path.join(settings.BASE_DIR, "drive_folders.json")
permission = {
    'type': 'domain',
    'role': 'reader',  # or 'writer', 'commenter'
    'domain': 'localhost'
}

class GoogleDriveStorage(Storage):
    def __init__(self):
        self.credentials = None
        self.service = None
        self._authenticate()
        self._build_service()

    def _authenticate(self, revoked=None):
        if revoked:
            self._create_token_file()

        elif os.path.exists(TOKEN_FILE):
            with open(TOKEN_FILE, "r") as token:
                creds_data = json.load(token)
                self.credentials = Credentials.from_authorized_user_info(
                    creds_data, SCOPES
                )
                try:
                    if not self.credentials.valid:
                        if self.credentials.expired and self.credentials.refresh_token:
                            try:
                                self.credentials.refresh(Request())
                            except:
                                self._create_token_file()
                        else:
                            self._create_token_file()
                except RefreshError as e:
                    self._create_token_file()
        else:
            self._create_token_file()

    def _create_token_file(self):
        flow = InstalledAppFlow.from_client_secrets_file(CLIENT_SECRET_FILE, SCOPES)
        self.credentials = flow.run_local_server(
            port=1674, access_type="offline", prompt="consent"
        )
        with open(TOKEN_FILE, "w") as token:
            token.write(self.credentials.to_json())

    def _build_service(self):
        if not self.service:
            self.service = build("drive", "v3", credentials=self.credentials)
            # ids = self.service.permissions().create(fileId='1YTZDCon4vcWnmOo6-nIf5biH2dl2Osi5', body=permission, fields="id").execute()
            # print("Perissioon created for ", ids)

    def _open(self, name):
        # try:
        #     return self._open_helper(name)
        # except ReferenceError as e:
        #     self._authenticate("revoked")
        #     return self._open_helper(name)
        pass

    def _open_helper(self, name, mode="rb"):
        request = self.service.files().get_media(fileId=name)
        file_handle = io.BytesIO()
        downloader = io.BytesIO()
        while True:
            try:
                _, done = downloader.next_chunk()
                if done:
                    break
            except:
                break
        file_handle.seek(0)
        return file_handle

    def _save(self, name, content):
        folder_id = self._get_folder_id(os.path.basename(os.path.dirname(name)))
        file_name = os.path.basename(name)

        temp_file = SpooledTemporaryFile()
        for chunk in content.chunks():
            temp_file.write(chunk)
        temp_file.seek(0)
        media = MediaIoBaseUpload(temp_file, mimetype=content.content_type)
        file_metadata = {"name": file_name, "parents": [folder_id]}
        try:
            file = (
                self.service.files()
                .create(body=file_metadata, media_body=media, fields="id")
                .execute()
            )

        except RefreshError as e:
            self._authenticate("revoked")
            file = (
                self.service.files()
                .create(body=file_metadata, media_body=media, fields="id")
                .execute()
            )
        return file.get("id")

    def delete(self, name):
        self.service.files().delete(fileId=name).execute()

    def exists(self, name):
        try:
            self.service.files().get(fileId=name).execute()
            return True
        except:
            return False

    def url(self, name):
        return f"https://drive.google.com/thumbnail?id={name}"

    ########## Helpers #############
    def _get_folder_id(self, folder_name):
        with open(DRIVE_FOLDER_ID_JSON_PATH, "r") as file:
            folder_paths = json.load(file)
        if folder_name in folder_paths:
            return folder_paths[folder_name]
        else:
            file_metadata = {
                "name": folder_name,
                "mimeType": "application/vnd.google-apps.folder",
                "parents": [folder_paths["coding contest"]],
            }
            file = (
                self.service.files().create(body=file_metadata, fields="id").execute()
            )
            folder_ids = {folder_name: file.get("id")}
            self._write_folder_ids(folder_ids)
            return file.get("id")

    def _write_folder_ids(self, folder_ids):
        with open(DRIVE_FOLDER_ID_JSON_PATH, "r+") as file:
            existing_data = json.load(file)
            existing_data.update(folder_ids)
            file.seek(0)
            json.dump(existing_data, file, indent=4)
            file.truncate()
