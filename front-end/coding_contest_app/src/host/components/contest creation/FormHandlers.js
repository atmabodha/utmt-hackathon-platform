// useContestSubmit.js
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import moment from "moment";
import { BASE_SERVER_URL } from "../../../Constants.js";

export const useFormHandler = (initialState) => {
  const [formData, setFormData] = useState(initialState);
  const [imageUploadStatus, setImageUploadStatus] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOtherInputChange = (name, object) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: object,
    }));
    console.log(object)
  };

  const handleFileChange = (e, maxFileSize) => {
    const file = e.target.files[0];
    const name = e.target.name;
    if (file) {
      if (file.size <= maxFileSize) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: file,
        }));
        setImageUploadStatus("Image uploaded successfully");
      } else {
        setImageUploadStatus(`Error: File size exceeds ${maxFileSize / (1024 * 1024)} MB`);
      }
    }
  };

  return {
    formData,
    handleInputChange,
    handleFileChange,
    imageUploadStatus,
    handleOtherInputChange
  };
};


export const useContestRegistrationSubmit = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    if (!formData.startDateTime) {
      document.querySelector(".start-date input").focus();
      return;
    }

    if (!formData.endDateTime) {
      document.querySelector(".end-date input").focus();
      return;
    }

    if (moment(formData.endDateTime).isBefore(moment(formData.startDateTime))) {
      toast.warn(
        "Make sure end date and time is greater than start date and time"
      );
      return;
    }

    try {
      let formDataToSend = new FormData();
      formDataToSend.append("host", formData.host);
      formDataToSend.append("contest_name", formData.contestName);
      formDataToSend.append("organization_type", formData.organizationType);
      formDataToSend.append("organization_name", formData.organizationName);
      formDataToSend.append("start_date_time", formData.startDateTime);
      formDataToSend.append("end_date_time", formData.endDateTime);
      formDataToSend.append("contest_visibility", formData.contestVisibility);
      formDataToSend.append("participant_limit", formData.participantLimit);
      formDataToSend.append("registration_deadline", formData.registrationDeadline);

      setLoading(true);
      const response = await axios.post(
        BASE_SERVER_URL + "host/add-contest-details/",
        formDataToSend
      );

      Swal.fire(
        "Contest Created",
        "Now move to forward for questions",
        "success"
      );
    } catch (error) {
      if (!error.response) {
        Swal.fire(
          "Network Error",
          "Please check your internet connection and try again",
          "error"
        );
      } else if (error.response.status === 500) {
        Swal.fire(
          "Contest not created",
          "Oops! Facing internal server error",
          "error"
        );
      } else if (error.response.status === 400) {
        console.log("message: ", error.response)
        Swal.fire(
          "Bad Request",
          "Please check the submitted data and try again",
          "error"
        );
      } else {
        Swal.fire(
          "Error",
          `An error occurred: ${error.response.statusText}`,
          "error"
        );
      }
    }
    setLoading(false);
  };

  return { loading, handleSubmit };
};

