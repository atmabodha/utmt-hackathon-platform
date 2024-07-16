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

SCOPES = ['https://www.googleapis.com/auth/drive.file']
TOKEN_FILE = os.path.join(settings.BASE_DIR, 'token.json')

class GoogleDriveStorage(Storage):
    def __init__(self):
        self.credentials = None
        self.service = None
        self._authenticate()
        self._build_service()

    def _authenticate(self):
        if os.path.exists(TOKEN_FILE):
            with open(TOKEN_FILE, 'r') as token:
                creds_data = json.load(token)
                self.credentials = Credentials.from_authorized_user_info(creds_data, SCOPES)
                if not self.credentials.valid:
                    if self.credentials.expired and self.credentials.refresh_token:
                        self.credentials.refresh(Request())
                    else:
                        flow = InstalledAppFlow.from_client_secrets_file(
                            CLIENT_SECRET_FILE, SCOPES)
                        self.credentials = flow.run_local_server(port=1674, access_type='offline', prompt='consent')
                    with open(TOKEN_FILE, 'w') as token:
                        token.write(self.credentials.to_json())
        else:
            self._create_token_file()

    def _create_token_file(self):
        flow = InstalledAppFlow.from_client_secrets_file(
                CLIENT_SECRET_FILE, SCOPES)
        self.credentials = flow.run_local_server(port=1674, access_type='offline', prompt='consent')
            # Save the credentials to the token file
        with open(TOKEN_FILE, 'w') as token:
            token.write(self.credentials.to_json())

    
    def _build_service(self):
        if not self.service:
            self.service = build('drive', 'v3', credentials=self.credentials)

    def _open(self, name, mode='rb'):
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
        print("i am trying to save \n\n")
        try:
            temp_file = SpooledTemporaryFile()
            for chunk in content.chunks():
                temp_file.write(chunk)
            temp_file.seek(0)

            media = MediaIoBaseUpload(temp_file, mimetype=content.content_type)

            file_metadata = {
                'name': name,
                'parent':''
            }

            file = self.service.files().create(
                body=file_metadata,
                media_body=media,
                fields='id'
            ).execute()

        except RefreshError as e:
            print("i am going to authanticate \n\n")
            self._authenticate()
            file = self.service.files().create(
                body=file_metadata,
                media_body=media,
                fields='id'
            ).execute()

        print("showing others errors\n\n\n\n\n")
        return 0

    def delete(self, name):
        self.service.files().delete(fileId=name).execute()

    def exists(self, name):
        try:
            self.service.files().get(fileId=name).execute()
            return True
        except:
            return False

    def url(self, name):
        return f'https://drive.google.com/uc?id={name}'
