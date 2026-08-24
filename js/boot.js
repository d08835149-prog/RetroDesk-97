const progressFill =
  document.getElementById("progress-fill");

const bootStatus =
  document.getElementById("boot-status");

const bootScreen =
  document.getElementById("boot-screen");

const desktop =
  document.getElementById("desktop");


const bootMessages = [
  "Starting RetroDesk...",
  "Checking system memory...",
  "Loading Korean language support...",
  "Initializing desktop services...",
  "Connecting system devices...",
  "Preparing Korea Online services...",
  "Almost ready..."
];


let progress = 0;


const bootInterval =
  setInterval(() => {

    progress +=
      Math.floor(Math.random() * 8) + 3;


    if (progress > 100) {
      progress = 100;
    }


    progressFill.style.width =
      `${progress}%`;


    const index =
      Math.min(
        Math.floor(progress / 15),
        bootMessages.length - 1
      );


    bootStatus.textContent =
      bootMessages[index];


    if (progress >= 100) {

      clearInterval(
        bootInterval
      );


      bootStatus.textContent =
        "Welcome to RetroDesk 97";


      setTimeout(() => {

        bootScreen.style.display =
          "none";

        desktop.style.display =
          "block";

      }, 900);
    }

  }, 180);