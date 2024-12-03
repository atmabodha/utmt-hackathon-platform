import React from "react";
import HeroSection from "./HeroSection";
import BrandingPage from "./Branding";
import CodingContests from "./CodingContest";
import Features from "./Features";

export default function LandingPage() {

    return(
        <div>
            <HeroSection />
            <BrandingPage />
            <CodingContests />
            <Features />
        </div>
    )
}