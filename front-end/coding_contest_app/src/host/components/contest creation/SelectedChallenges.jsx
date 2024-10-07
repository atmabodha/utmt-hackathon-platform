import React, { useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SelectedChallenges.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Swal from 'sweetalert2';
import axios from 'axios';
import { BASE_SERVER_URL, CONTESTS, HOST_ENDPOINT } from "../../../Constants";
import { useParams } from "react-router-dom";
import { getData } from "../../apis/ApiRequests";


const SelectedChallenges = ({ contestUrl }) => {
  const { contestId } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCard, setExpandedCard] = useState(null);
  const [questions, setQuestions] = useState([]);
  const url = BASE_SERVER_URL + HOST_ENDPOINT + CONTESTS + contestId + "/problems/"
  
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await getData(url);
        const data = response.data;
        if (data){
          setQuestions(data);
        }
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };

    fetchProblems();
  }, [contestId]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredQuestions = questions
    .filter(
      (q) =>
        q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (q.statement &&
          q.statement.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      const aMatchIndex = a.title
        .toLowerCase()
        .indexOf(searchTerm.toLowerCase());
      const bMatchIndex = b.title
        .toLowerCase()
        .indexOf(searchTerm.toLowerCase());
      return aMatchIndex - bMatchIndex;
    });

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const handleCreateChallenge = () => {
    const newTab = window.open("/administration/create/challenge", "_blank");
    // Create an event listener to listen for the form submission message
    const handleMessage = (event) => {
      // Ensure it's the message you're expecting
      if (event.data === "formSubmitted") {
        // Close the new tab after form submission
        newTab.close();
        // Navigate back to the current page or some other page
        navigate("/administration/contests/edit/challenges"); // Change '/current-page' to the route you want to go back to
      }
    };
    // Add the event listener
    window.addEventListener("message", handleMessage, false);
  };

  const handleAddChallenge = () => {
    Swal.fire({
      title: 'Add Problems to Contest',
      html: `
        <input id="contest-name" class="swal2-input custom-input" placeholder="Name of Contest" />
        <input id="contest-score" class="swal2-input custom-input" placeholder="Score of Contest" />
        <input id="contest-tag" class="swal2-input custom-input" placeholder="Tag of Contest" />
      `,
      focusConfirm: false,
      showCancelButton: true,
      reverseButtons: true, // This places "OK" to the right of "Cancel"
      preConfirm: () => {
        const name = document.getElementById('contest-name').value;
        const score = document.getElementById('contest-score').value;
        const tag = document.getElementById('contest-tag').value;
  
        // Ensure all fields are filled
        if (!name || !score || !tag) {
          Swal.showValidationMessage('All fields are required!');
          return false;
        }
  
        return { name, score, tag };
      },
      customClass: {
        confirmButton: 'swal2-ok-btn',
        cancelButton: 'swal2-cancel-btn'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const { name, score, tag } = result.value;
  
        // Logic to handle adding the problem to the contest
        console.log(`Problem added with Name: ${name}, Score: ${score}, Tag: ${tag}`);
  
        // Example: Navigate to another page after adding the challenge
        navigate('/administration/contests/edit/challenges');
      }
    });
  };
  

  return (
    <>
      <div className="selected-questions">
        <div className="selected-questions-header">
          <h2 style={{ fontWeight: 600 }}>Contest Challenges</h2>
          <Link
            to=""
            style={{ textDecoration: "none", color: "var(--text-color)" }}
          >
            {contestUrl}www.codehut.com/hackHard
          </Link>
        </div>
        <div className="question-list-container">
          <div className="questions-search-container">
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={handleSearch}
              className="questions-s-b"
            />
            <i className="fas fa-search search-icon"></i>
          </div>
          <div className="questions-add">
            <div className="question-create-txt">
              <p>To create your own problem. Click <a
                onClick={handleCreateChallenge}>
                Here
              </a>
              </p></div>
            <button className="questions-add-btn" onClick={handleAddChallenge}>
              Add Challenge
            </button>
          </div>
          <div className="questions">
            {filteredQuestions.map((q) => (
              <div
                key={q.id}
                className="question-card"
                onClick={() => toggleExpand(q.id)}
              >
                <div className="question-header">
                  <p>
                    <strong>{q.title}</strong>
                  </p>
                </div>
                <div
                  className={`question-body ${
                    expandedCard === q.id ? "expanded" : ""
                  }`}
                >
                  {Object.entries(q).map(
                    ([key, value]) =>
                      key !== "id" &&
                      key !== "title" && (
                        <p key={key}>
                          <strong>
                            {key.charAt(0).toUpperCase() + key.slice(1)}:
                          </strong>
                          <br />
                          {value}
                        </p>
                      )
                  )}
                </div>
                <div className="buttons-container">
                  <button className="questions-edit-btn">Edit</button>
                  <button
                    className="read-more-button"
                    onClick={() => toggleExpand(q.id)}
                  >
                    {expandedCard === q.id ? "Read Less" : "Read More"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectedChallenges;
