import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { BASE_SERVER_URL, HOST_ENDPOINT } from "../../../Constants";
import { showConfirmationAlert } from "../../../utilities/AlertComponents";
import { deleteData } from "../../apis/ApiRequests";
import {
  showErrorToast,
  showSuccessToast,
  showInfoToast,
} from "../../../utilities/AlertComponents";

function Sidebar({ contestName, contestId }) {
  const [activeLinkIndex, setActiveLinkIndex] = useState(0);
  const navigate = useNavigate(); // Initialize useNavigate

  const links = [
    { label: "Basic Contest Details", to: "basic details" },
    { label: "About the Contest", to: "about" },
    { label: "Challenges", to: "challenges" },
    { label: "Prizes", to: "prizes" },
    { label: "Analytics", to: "analytics" },
    { label: "Delete contest", to: "" },
  ];

  const handleDeleteContest = async (contestId) => {
    const confirmed = await showConfirmationAlert({
      title: "Are you sure?",
      text: "This contest will be permanently deleted!",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    });

    if (confirmed) {
      try {
        const url = `${BASE_SERVER_URL}${HOST_ENDPOINT}api/contests/${contestId}/delete/`;
        const response = await deleteData(url, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Show success toast
        showSuccessToast("Contest deleted successfully!");

        if (response) {
          navigate("/administration/dashboard");
        }
      } catch (error) {
        console.error("Error deleting contest:", error);

        // Show error toast
        showErrorToast("Failed to delete the contest.");
      }
    } else {
      showInfoToast("Contest deletion was canceled.");
    }
  };

  const changeActiveIndex = (index) => {
    setActiveLinkIndex(index);
  };

  return (
    <div className="sidebar">
      <div>
        <h3 className="manage">Manage</h3>
      </div>
      <div>
        <h3 className="sidebar-contest-name">{contestName}</h3>
      </div>
      <div className="sidebar-links">
        {links.map((link, index) => (
          <Link
            key={index}
            className="sidebar-link"
            to={link.to}
            style={activeLinkIndex === index ? { fontWeight: "600" } : {}}
            onClick={() => {
              changeActiveIndex(index);
              if (link.label === "Delete contest") {
                handleDeleteContest(contestId); // Pass contestId to delete function
              }
            }}
          >
            <FaEdit size={24} style={{ paddingRight: "5px" }} /> {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
