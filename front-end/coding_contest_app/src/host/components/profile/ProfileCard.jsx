import React from "react";

const ProfileCard = () => {
  return (
    <div className="profile-card">
      <div className="profile-header">
        <div className="avatar-placeholder"></div>
        <div className="edit-icon"></div>
      </div>
      <div className="profile-info">
        <h4>Narayan Jat</h4>
        <p>@narayanjat2964</p>
        <p>Shri Ramswaroop Memorial University with Sitare</p>
        <p>
          <a href="mailto:nj223948@gmail.com">nj223948@gmail.com</a>
        </p>
        <p>9079622236</p>
        <p>India</p>
      </div>
    </div>
  );
};

export default ProfileCard;
