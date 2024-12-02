import React from "react";

const ContestSection = () => {
  return (
    <div className="contest-section">
      <h5>Contest Participated</h5>
      <table>
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
  );
};

export default ContestSection;
