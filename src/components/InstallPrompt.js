import React, { useEffect, useState } from "react";
import styles from "./InstallPrompt.module.css";

const InstallPrompt = () => {
  const [installPromptEvent, setInstallPromptEvent] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setInstallPromptEvent(event);
      console.log(installPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, [installPromptEvent]);

  const handleInstallClick = () => {
    if (installPromptEvent) {
      installPromptEvent.prompt();
      installPromptEvent.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        }
        console.log(installPromptEvent);
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
