import {
  openWindow
} from "./windowManager.js";


const desktop =
  document.getElementById(
    "desktop"
  );


const icons =
  document.querySelectorAll(
    ".desktop-icon[data-window]"
  );


icons.forEach(
  icon => {

    icon.addEventListener(
      "click",
      event => {

        event.stopPropagation();


        icons.forEach(
          otherIcon => {

            otherIcon.classList.remove(
              "selected"
            );
          }
        );


        icon.classList.add(
          "selected"
        );
      }
    );


    icon.addEventListener(
      "dblclick",
      () => {

        const windowId =
          icon.dataset.window;


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
      }
    );
  }
);


desktop.addEventListener(
  "click",
  event => {

    if (
      event.target !== desktop
    ) {
      return;
    }


    icons.forEach(
      icon => {

        icon.classList.remove(
          "selected"
        );
      }
    );
  }
);