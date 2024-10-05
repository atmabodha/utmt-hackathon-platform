import React from "react";
import "./AboutContest.css";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import ContestEditFooter from "./ContestEditFooter";
import { useFormHandler } from "./FormHandlers";
import TextAreaField, {
  FileInputField,
} from "../../../utilities/FormComponents";
import { HOST_ENDPOINT, BASE_SERVER_URL, CONTESTS } from "../../../Constants";
import { sendData } from "../../apis/ApiRequests";
import { storage } from "../../../firebase/firebase"; // Import the firebase configuration
import showSwalAlert from "../../../utilities/AlertComponents";
import { useUser } from "../../../context/user";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import LoadingOverlay from "react-loading-overlay-ts";
import PulseLoader from "react-spinners/PulseLoader";

function AboutContest({ contestUrl }) {
  const {current: user} = useUser()
  const url = BASE_SERVER_URL + HOST_ENDPOINT + CONTESTS + "details/";
  const inputFields = [
    {
      label: "About",
      name: "about",
    },
    {
      label: "Eligibility",
      name: "eligibility",
    },
    {
      label: "Rules",
      name: "rules",
    },
    {
      label: "Others",
      name: "others",
    },
  ];

  const {
    formData: aboutData,
    handleInputChange,
    handleFileChange,
    imageUploadStatus,
  } = useFormHandler({
    about: "",
    eligibility: "",
    others: "",
    rules: "",
    bannerImage: null,
  });

  console.log("user", user)
  const handleAboutSubmit = async () => {
    const aboutFormData = new FormData();
    aboutFormData.append("about", aboutData.about);
    aboutFormData.append("eligibility", aboutData.eligibility);
    aboutFormData.append("rules", aboutData.rules);
    aboutFormData.append("others", aboutData.others);

    if (aboutData.bannerImage) {
      const uniqueImageName = user?.uid + aboutData.bannerImage.name;
      const storageRef = ref(storage, `images/${uniqueImageName}`);
      uploadBytes(storageRef, aboutData.bannerImage)
        .then((snapshot) => {
          return getDownloadURL(snapshot.ref);
        })
        .then( async (imageUrl) => {
          aboutFormData.append("contest_banner_image", imageUrl);
          await sendData(url, aboutFormData);
        })
        .catch((error) => {
          showSwalAlert({
            icon: "error",
            title: error.code,
            text: error.message,
          });
        });
    }
  };

  return (
    <div>
      <LoadingOverlay
        active={true}
        text="Hold tight digesting the details..."
        spinner={
          <PulseLoader
            color={"black"}
            loading={true}
            size={15}
            margin={10}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        }
      >
      <div className="about-contest">
        <div className="about-contest-header">
          <h2 style={{ fontWeight: 600 }}>About the Contest</h2>
          <Link
            to=""
            style={{ textDecoration: "none", color: "var(--text-color)" }}
          >
            {contestUrl}www.codehut.com/hackHard
          </Link>
        </div>
        <div className="about-form">
          <Form>
            <FileInputField
              label="Contest Banner Image"
              name="bannerImage"
              onChange={(event) => handleFileChange(event, 1024 * 1024)}
              required={false}
              groupClass="mb-3 about-input-field"
              labelClass="text-area-label"
              controlClass="form-control-custom"
              accept=".jpg, .png, .jpeg, .svg"
              value={aboutData.bannerImage}
              helperText="Please select a JPG, PNG, JPEG, or SVG file."
              uploadStatus={imageUploadStatus}
            />
            {inputFields.map((field, index) => (
              <TextAreaField
                key={index}
                label={field.label}
                name={field.name}
                value={aboutData[field.name]}
                onChange={handleInputChange}
                controlId={`ControlTextarea${index}`}
                groupClass={"about-input-field"}
                labelClass={"text-area-label"}
                controlClass={"text-area-control"}
              />
            ))}
          </Form>
        </div>
      </div>
      <ContestEditFooter saveChanges={handleAboutSubmit} />
      </LoadingOverlay>
    </div>
  );
}

export default AboutContest;
