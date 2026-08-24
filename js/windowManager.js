const windows =
  document.querySelectorAll(
    ".window"
  );

const taskbarApps =
  document.getElementById(
    "taskbar-apps"
  );


let highestZIndex =
  100;


export function openWindow(
  windowElement
) {

  windowElement.classList.add(
    "open"
  );


  windowElement.style.display =
    "flex";


  bringToFront(
    windowElement
  );


  createTaskbarButton(
    windowElement
  );
}


export function closeWindow(
  windowElement
) {

  windowElement.classList.remove(
    "open"
  );


  windowElement.style.display =
    "none";


  const button =
    getTaskbarButton(
      windowElement
    );


  if (button) {
    button.remove();
  }
}


export function minimizeWindow(
  windowElement
) {

  windowElement.style.display =
    "none";


  const button =
    getTaskbarButton(
      windowElement
    );


  button?.classList.remove(
    "active"
  );
}


export function maximizeWindow(
  windowElement
) {

  windowElement.classList.toggle(
    "maximized"
  );


  bringToFront(
    windowElement
  );
}


export function bringToFront(
  windowElement
) {

  highestZIndex++;


  windowElement.style.zIndex =
    highestZIndex;


  document
    .querySelectorAll(
      ".taskbar-app"
    )
    .forEach(button => {

      button.classList.remove(
        "active"
      );
    });


  const button =
    getTaskbarButton(
      windowElement
    );


  button?.classList.add(
    "active"
  );
}


function getTaskbarButton(
  windowElement
) {

  return document.querySelector(
    `.taskbar-app[data-window="${windowElement.id}"]`
  );
}


function createTaskbarButton(
  windowElement
) {

  let button =
    getTaskbarButton(
      windowElement
    );


  if (button) {

    button.classList.add(
      "active"
    );

    return;
  }


  const title =
    windowElement
      .querySelector(
        ".window-title"
      )
      .textContent
      .trim();


  button =
    document.createElement(
      "button"
    );


  button.className =
    "taskbar-app active";


  button.dataset.window =
    windowElement.id;


  button.textContent =
    title;


  button.addEventListener(
    "click",
    () => {

      const hidden =
        windowElement.style.display ===
        "none";


      if (hidden) {

        windowElement.style.display =
          "flex";


        bringToFront(
          windowElement
        );

        return;
      }


      if (
        button.classList.contains(
          "active"
        )
      ) {

        minimizeWindow(
          windowElement
        );

      } else {

        bringToFront(
          windowElement
        );
      }
    }
  );


  taskbarApps.appendChild(
    button
  );
}


function enableDragging(
  windowElement
) {

  const titlebar =
    windowElement.querySelector(
      ".window-titlebar"
    );


  let dragging =
    false;


  let offsetX =
    0;


  let offsetY =
    0;


  titlebar.addEventListener(
    "mousedown",
    event => {

      if (
        event.target.closest(
          ".window-controls"
        )
      ) {
        return;
      }


      if (
        windowElement.classList.contains(
          "maximized"
        )
      ) {
        return;
      }


      dragging =
        true;


      const rect =
        windowElement
          .getBoundingClientRect();


      offsetX =
        event.clientX -
        rect.left;


      offsetY =
        event.clientY -
        rect.top;


      bringToFront(
        windowElement
      );


      event.preventDefault();
    }
  );


  document.addEventListener(
    "mousemove",
    event => {

      if (!dragging) {
        return;
      }


      let left =
        event.clientX -
        offsetX;


      let top =
        event.clientY -
        offsetY;


      const maxLeft =
        window.innerWidth -
        80;


      const maxTop =
        window.innerHeight -
        80;


      left =
        Math.max(
          -windowElement.offsetWidth + 80,
          Math.min(
            left,
            maxLeft
          )
        );


      top =
        Math.max(
          0,
          Math.min(
            top,
            maxTop
          )
        );


      windowElement.style.left =
        `${left}px`;


      windowElement.style.top =
        `${top}px`;
    }
  );


  document.addEventListener(
    "mouseup",
    () => {

      dragging =
        false;
    }
  );
}


windows.forEach(
  windowElement => {

    const closeButton =
      windowElement.querySelector(
        ".close-button"
      );


    const minimizeButton =
      windowElement.querySelector(
        ".minimize-button"
      );


    const maximizeButton =
      windowElement.querySelector(
        ".maximize-button"
      );


    closeButton.addEventListener(
      "click",
      () => {

        closeWindow(
          windowElement
        );
      }
    );


    minimizeButton.addEventListener(
      "click",
      () => {

        minimizeWindow(
          windowElement
        );
      }
    );


    maximizeButton.addEventListener(
      "click",
      () => {

        maximizeWindow(
          windowElement
        );
      }
    );


    windowElement.addEventListener(
      "mousedown",
      () => {

        bringToFront(
          windowElement
        );
      }
    );


    enableDragging(
      windowElement
    );
  }
);