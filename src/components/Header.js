import React from "react";
import { Button } from "@material-ui/core";
import LoginModal from "./LoginModal";
import { useState, useEffect } from "react";
import SignUpModal from "./SignUpModal";
import { auth } from "../config/firbase";
import ImageUpload from "./ImageUpload";
import Posts from "./Posts";
import Guest from "./Guest";

function Header() {
  const [openL, setOpenL] = useState(false);
  const [openS, setOpenS] = useState(false);
  const [user, setUser] = useState(null);
  function logout() {
    auth
      .signOut()
      .then((res) => {
        setUser(null);
      })
      .catch((e) => console.log(e.response.data));
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        console.log(user);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div>
      <LoginModal openL={openL} setOpenL={setOpenL} />
      <SignUpModal openS={openS} setOpenS={setOpenS} />
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        />
        <div>
          {user ? (
            <>
              <Button>{user.displayName}</Button>
              <Button onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
              <Button onClick={() => setOpenL(true)}>Login</Button>
              <Button onClick={() => setOpenS(true)}>SignUp</Button>
            </>
          )}
        </div>
      </div>
      {user !== null ? (
        <>
          <ImageUpload username={user.displayName} /> <Posts user={user} />
        </>
      ) : (
        <Guest />
      )}
    </div>
  );
}

export default Header;
