import React from "react";
import ContestDetails from "../components/contest creation/ContestDetails";
import Header from "../components/header/Header";

const ContestCreation = () => {

    return (
        <div>
            <Header headerType={"host"}/>
            <ContestDetails/>
        </div>
    )
}

export default ContestCreation;