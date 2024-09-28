import React from "react";
import { Link } from "react-router-dom";
import "./ContestEditFooter.css";

function ContestEditFooter({
  isChallengeEdit,
  previewLink,
  handleChooseFromLibrary,
  saveChanges,
}) {
  return (
    <div className="contest-edit-footer">
      <div className="contest-edit-left-buttons">
        <Link className="contest-edit-footer-button" to={previewLink}>
          Preview Contest
        </Link>
        <button
          className="contest-edit-footer-button"
          onClick={handleChooseFromLibrary}
          style={{display: isChallengeEdit ? "block" : "none"}}
        >
          Choose From Repository
        </button>
      </div>
      <button className="contest-edit-footer-button" onClick={saveChanges}>
        Save Changes
      </button>
    </div>
  );
}

export default ContestEditFooter;
