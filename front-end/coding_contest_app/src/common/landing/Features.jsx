import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Features.css";
import { Link } from "react-router-dom";

const Features = () => {
  const features = [
    {
      title: "Hosting Made Simple",
      description:
        "Our powerful hosting tools simplify the organization of your coding contests",
      link: "Elevate Your Event",
      img: "https://img.freepik.com/free-vector/online-games-concept_23-2148527136.jpg?t=st=1733075989~exp=1733079589~hmac=692352ecc2b161d2d55608a6277a3ffab74187b430c2c10d72b8678e46d5ed5a&w=1060", // Replace with actual image
      icon: "🖥️", // Add actual icons as needed
    },
    {
      title: "Participant Management",
      description:
        "Robust participant management system ensures a seamless experience for coders.",
      link: "Elevate Your Community",
      img: "https://img.freepik.com/free-vector/remote-business-management-concept-with-businessman-holding-tablet-showing-analytics-graphs-connected_1284-44658.jpg?t=st=1733075570~exp=1733079170~hmac=0c1c3ffe5cc0d518beab74626e766c9e8224df2f26e047dbc7032f913fa768c4&w=740", // Replace with actual image
      icon: "👥", // Add actual icons as needed
    },
    {
      title: "Unparalleled Insights",
      description:
        "Our real-time analytics suite provides in-depth visibility into your coding contest",
      link: "Elevate Your Impact",
      img: "https://img.freepik.com/free-vector/business-people-showing-document-client_1262-19209.jpg?t=st=1733075308~exp=1733078908~hmac=9cd084c45114bc872a0c77b23f3c65190fe145e3e5f3fad814c47e412be6b602&w=900", // Replace with actual image
      icon: "📊", // Add actual icons as needed
    },
  ];

  return (
    <div className="container py-5">
      {/* Header Section */}
      <div className="text-center mb-5">
        <p className="text-uppercase text-muted">Elevate Your Coding Journey</p>
        <h1 className="display-5 fw-bold">Coding Made Seamless</h1>
        <p className="text-muted lead">
          Streamline Your Coding Contest Experience: Our intuitive platform
          provides a seamless hosting environment.
        </p>
      </div>

      {/* Features Section */}
      <div className="row features">
        {features.map((feature, index) => (
          <div key={index} className="col-lg-3 col-md-2 col-xs-2 text-center">
            <div className="card p-4 border-0 shadow-sm custom-card">
              <img
                src={feature.img}
                style={{borderRadius: "5px", width:"300px", height: "200px"}}
                alt={feature.title}
                className="img-fluid mb-3"
              />
              {/* <div className="icon mb-3 text-left">{feature.icon}</div> */}
              <h4 className="fw-bold" style={{paddingTop: "10px", textAlign:"start"}}>{feature.title}</h4>
              <p className="text-muted" style={{paddingTop: "5px", textAlign:"start"}}>{feature.description}</p>
              <Link to="/" className="fw-bold" style={{textAlign:"start", textDecoration: "none"}}>
                {feature.link}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
