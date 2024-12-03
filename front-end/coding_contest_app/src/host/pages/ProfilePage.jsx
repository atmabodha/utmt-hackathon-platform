import React from "react";
import Header from "../components/header/Header";
import ProfilePageComponent from "../components/profile/ProfilePageComponent";
const ProfilePage = () => {
  return (
    <>
      <Header headerType={"host"} />
      <ProfilePageComponent />
    </>
  );
};

export default ProfilePage;
