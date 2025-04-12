import React from "react";

function App() {
  return (
    <div style={{ padding: "20px", width: "200px" }}>
      <button
        onClick={() => {
          // Open Google.com in a new tab
          chrome.tabs.create({ url: "https://google.com" });
        }}
      >
        Go to Google
      </button>
    </div>
  );
}

export default App;
