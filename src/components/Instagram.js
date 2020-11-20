import React from "react";
import InstagramEmbed from "react-instagram-embed";
function Instagram() {
  return (
    <div>
      <InstagramEmbed
        url="https://www.instagram.com/p/B1QA7rTgkUr/?igshid=17xfjiu29cfsp"
        // clientAccessToken="123|456"
        maxWidth={320}
        hideCaption={false}
        containerTagName="div"
        protocol=""
        injectScript
        onLoading={() => {}}
        onSuccess={() => {}}
        onAfterRender={() => {}}
        onFailure={() => {}}
      />
    </div>
  );
}

export default Instagram;
