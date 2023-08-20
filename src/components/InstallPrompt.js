import React, { useEffect, useState } from "react";
import styles from "./InstallPrompt.module.css";

const InstallPrompt = () => {
  const [installPromptEvent, setInstallPromptEvent] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setInstallPromptEvent(event);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (installPromptEvent) {
      installPromptEvent.prompt();
      installPromptEvent.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        }
        setInstallPromptEvent(null);
      });
    }
  };

  return (
    <div className={styles.install}>
      {installPromptEvent && (
        <button onClick={handleInstallClick}>Install App</button>
      )}
    </div>
  );
};

export default InstallPrompt;
