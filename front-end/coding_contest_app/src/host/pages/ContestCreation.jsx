import React from "react";
import Header from "../components/header/Header";
import ContestRegistration from "../components/contest creation/ContestRegistration";

const ContestCreation = () => {

    return (
        <div>
            <Header headerType={"host"}/>
            <ContestRegistration pageLink={"www.codehut.com/hackHard"} pageTitle={"Coding Contest"} isRegistration={true}/>
        </div>
    )
}

export default ContestCreation;