// useContestSubmit.js
import { useState } from "react";
import { sendData } from "../../apis/ApiRequests";
import { toast } from "react-toastify";
import moment from "moment";
import { convertToDbDateTime } from "../../../utilities/TimeConversion";

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
        setImageUploadStatus(
          `Error: File size exceeds ${maxFileSize / (1024 * 1024)} MB`
        );
      }
    }
  };

  return {
    formData,
    handleInputChange,
    handleFileChange,
    imageUploadStatus,
    setFormData,
    handleOtherInputChange,
  };
};

export const useContestRegistrationSubmit = () => {
  const handleSubmit = async (formData, host, callback, url) => {
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

    console.log(formData)
    let formDataToSend = new FormData();
    formDataToSend.append("host", host);
    formDataToSend.append("contest_name", formData.contestName);
    formDataToSend.append("organization_type", formData.organizationType);
    formDataToSend.append("organization_name", formData.organizationName);
    formDataToSend.append("start_date_time", convertToDbDateTime(formData.startDateTime));
    formDataToSend.append("end_date_time", convertToDbDateTime(formData.endDateTime));
    formDataToSend.append("contest_visibility", formData.contestVisibility);
    formDataToSend.append("participant_limit", formData.participantLimit);
    formDataToSend.append(
      "registration_deadline",
      convertToDbDateTime(formData.registrationDeadline)
    );
    const response = await sendData(url, formDataToSend);
    const data = response.data.data;
    if (data) {
      callback(data);
    }
    setLoading(false);
  };

  return [handleSubmit];
};
