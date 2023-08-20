import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";

window.addEventListener("load", () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("service-worker.js")
      .then((registration) => {
        console.log(navigator);
        console.log(registration);
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  }
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
