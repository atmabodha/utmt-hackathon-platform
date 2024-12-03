import React from "react";
import "./ProfilePage.css";
import img from "../../../media/profileImage/Narayan.jpg";
import Header from "../header/Header";

const ProfilePageComponent = () => {

  return (
    <div>
      <Header headerType={"participant"}/>
    <div className="profile-container mt-5">
      <div className="profile-header">
        <div className="profile-left">
          <div className="user-avatar">
            {/* Avatar image with fixed size and round shape */}
            <img
              src={img} // Replace this with your image URL
              alt="Avatar"
              className="avatar-image"
            />
          </div>
        </div>
        <div className="profile-right">
          <div className="user-details">
            <h2>Narayan Jat</h2>
            <p>@narayanjat2964</p>
            <p>Shri Ramswaroop Memorial University with Sitare</p>
            <p>Email: nj223948@gmail.com</p>
            <p>Phone: 9079622236</p>
            <p>India</p>
            <button className="edit-btn">Edit</button>
          </div>
        </div>
      </div>

      <div className="profile-sections">
        <div className="about-section section">
          <h3>About</h3>
          <p>I am Narayan Jat</p>
          <button className="edit-btn">Edit About</button>
        </div>

        <div className="skills-section section">
          <h3>Skills</h3>
          <p>Python, Java, Database Management System</p>
          <button className="edit-btn">Edit Skills</button>
        </div>

        <div className="platform-section section">
          <h3>Other Platforms</h3>
          <ul>
            <li>
              <a href="https://linkedin.com/narayan-jat">LinkedIn</a>
            </li>
            <li>
              <a href="https://linkedin.com/narayan-jat">LinkedIn</a>
            </li>
            <li>
              <a href="https://linkedin.com/narayan-jat">LinkedIn</a>
            </li>
          </ul>
        </div>

        <div className="contests-section section">
          <h3>Contest Participated</h3>
          <table className="contest-table">
            <thead>
              <tr>
                <th>Participated</th>
                <th>Registered</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Brad Simmons</td>
                <td>HTML, JS, ReactJS</td>
                <td>
                  <button className="view-offer-btn">View Offer</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="hosted-contests-section section">
          <h3>Hosted Contests</h3>
          <table className="contest-table">
            <tbody>
              <tr>
                <td>Brad Simmons</td>
                <td>HTML, JS, ReactJS</td>
                <td>
                  <button className="view-offer-btn">View Offer</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProfilePageComponent;
