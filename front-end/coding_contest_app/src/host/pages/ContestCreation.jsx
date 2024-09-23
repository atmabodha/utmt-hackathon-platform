import React from "react";
import Header from "../components/header/Header";
import ContestRegistration from "../components/contest creation/ContestRegistration";

const ContestCreation = () => {

    return (
        <div>
            <Header headerType={"host"}/>
            <ContestRegistration pageTitle={"Coding Contest"}/>
        </div>
    )
}

export default ContestCreation;