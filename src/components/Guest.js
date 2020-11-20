import { Button } from "@material-ui/core";
import React, { useState } from "react";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import GitHubIcon from "@material-ui/icons/GitHub";

function Guest() {
  const [openL, setOpenL] = useState(false);
  const [openS, setOpenS] = useState(false);
  return (
    <div className="guest">
      <LoginModal openL={openL} setOpenL={setOpenL} />
      <SignUpModal openS={openS} setOpenS={setOpenS} />
      <div className="guest__header">
        <h2>Instagram Clone 😍</h2>
      </div>
      <div className="guest__body">
        <div className="guest_desc">
          <p>I made This clone only for Fun 😊</p>
          <p>Make Your Dummy account And test It 🚀</p>
        </div>
        <p className="guest__note">Not Post Any Personal Photo</p>
        <div className="guset__content">
          <Button onClick={() => setOpenL(true)} className="guest_btn">
            Login
          </Button>
          <Button onClick={() => setOpenS(true)} className="guest_btn">
            SignUp
          </Button>
        </div>
      </div>
      <div className="guset__footer">
        <p>
          Developed By <i>Sahil Shah</i>
        </p>
        <p>
          <a
            href="https://github.com/shahsahil713/instagram-clone"
            target="_blank"
            className="github__link"
          >
            <GitHubIcon style={{ color: "black" }} className="github" />
          </a>
        </p>
      </div>
    </div>
  );
}

export default Guest;
