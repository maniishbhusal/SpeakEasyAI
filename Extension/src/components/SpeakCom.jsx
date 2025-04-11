import React, { useEffect } from "react";

const SpeakCom = () => {
  useEffect(() => {
    const iframe = document.createElement("iframe");
    iframe.setAttribute("hidden", "true");
    iframe.setAttribute("allow", "microphone");
    iframe.src = chrome.runtime.getURL("permission/index.html");
    document.body.appendChild(iframe);
  }, []);

  return <div>SpeakCom Loaded!</div>;
};

export default SpeakCom;
