import {
  openWindow
} from "./windowManager.js";


const startButton =
  document.getElementById(
    "start-button"
  );

const startMenu =
  document.getElementById(
    "start-menu"
  );


const menuWindowItems =
  document.querySelectorAll(
    "#start-menu [data-window]"
  );


function closeStartMenu() {

  startMenu.classList.remove(
    "open"
  );


  startButton.classList.remove(
    "active"
  );
}


startButton.addEventListener(
  "click",
  event => {

    event.stopPropagation();


    startMenu.classList.toggle(
      "open"
    );


    startButton.classList.toggle(
      "active"
    );
  }
);


menuWindowItems.forEach(
  item => {

    item.addEventListener(
      "click",
      event => {

        event.stopPropagation();


        const windowId =
          item.dataset.window;


        const targetWindow =
          document.getElementById(
            windowId
          );


        if (!targetWindow) {
          return;
        }


        openWindow(
          targetWindow
        );


        closeStartMenu();
      }
    );
  }
);


document.addEventListener(
  "click",
  event => {

    if (
      startMenu.contains(
        event.target
      ) ||
      startButton.contains(
        event.target
      )
    ) {
      return;
    }


    closeStartMenu();
  }
);
const shutdownButton =
  document.getElementById(
    "shutdown-menu-item"
  );

const shutdownScreen =
  document.getElementById(
    "shutdown-screen"
  );

const restartButton =
  document.getElementById(
    "restart-button"
  );


shutdownButton.addEventListener(
  "click",
  event => {

    event.stopPropagation();


    closeStartMenu();


    shutdownScreen.style.display =
      "flex";
  }
);


restartButton.addEventListener(
  "click",
  () => {

    window.location.reload();
  }
);