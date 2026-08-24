import {
  openWindow,
  closeWindow
} from "../windowManager.js";


/* ========================================
   FIND
======================================== */

const findInput =
  document.getElementById(
    "find-input"
  );

const findButton =
  document.getElementById(
    "find-button"
  );

const findResult =
  document.getElementById(
    "find-result"
  );


const searchableFiles = [
  "Welcome.txt",
  "KoreaTrip.txt",
  "Pictures",
  "Downloads"
];


findButton?.addEventListener(
  "click",
  () => {

    const query =
      findInput.value
        .trim()
        .toLowerCase();


    if (!query) {

      findResult.textContent =
        "Please enter a file name.";

      return;
    }


    const result =
      searchableFiles.find(
        item =>
          item
            .toLowerCase()
            .includes(query)
      );


    if (result) {

      findResult.textContent =
        `Found: C:\\My Documents\\${result}`;

    } else {

      findResult.textContent =
        "No matching files found.";
    }
  }
);


/* ========================================
   RUN
======================================== */

const runInput =
  document.getElementById(
    "run-input"
  );

const runButton =
  document.getElementById(
    "run-ok-button"
  );

const runCancelButton =
  document.getElementById(
    "run-cancel-button"
  );

const runWindow =
  document.getElementById(
    "run-window"
  );


const commands = {

  notepad:
    "notepad-window",

  calc:
    "calculator-window",

  calculator:
    "calculator-window",

  internet:
    "internet-window",

  korea:
    "korea-online-window",

  documents:
    "documents-window",

  settings:
    "settings-window"
};


function runCommand() {

  const command =
    runInput.value
      .trim()
      .toLowerCase();


  const windowId =
    commands[command];


  if (!windowId) {

    alert(
      `"${command}" could not be found.`
    );

    return;
  }


  const targetWindow =
    document.getElementById(
      windowId
    );


  openWindow(
    targetWindow
  );


  closeWindow(
    runWindow
  );


  runInput.value =
    "";
}


runButton?.addEventListener(
  "click",
  runCommand
);


runInput?.addEventListener(
  "keydown",
  event => {

    if (
      event.key ===
      "Enter"
    ) {

      runCommand();
    }
  }
);


runCancelButton?.addEventListener(
  "click",
  () => {

    closeWindow(
      runWindow
    );
  }
);


/* ========================================
   CALCULATOR
======================================== */

const calculatorDisplay =
  document.getElementById(
    "calculator-display"
  );


const calculatorButtons =
  document.querySelectorAll(
    "[data-calc]"
  );


let expression =
  "";


calculatorButtons.forEach(
  button => {

    button.addEventListener(
      "click",
      () => {

        const value =
          button.dataset.calc;


        if (
          value ===
          "="
        ) {

          try {

            expression =
              Function(
                `"use strict"; return (${expression})`
              )()
              .toString();


            calculatorDisplay.value =
              expression;

          } catch {

            calculatorDisplay.value =
              "Error";


            expression =
              "";
          }

          return;
        }


        expression +=
          value;


        calculatorDisplay.value =
          expression;
      }
    );
  }
);


document
  .getElementById(
    "calculator-clear"
  )
  ?.addEventListener(
    "click",
    () => {

      expression =
        "";


      calculatorDisplay.value =
        "0";
    }
  );
/* ========================================
   RECYCLE BIN
======================================== */

const emptyBinButton =
  document.getElementById(
    "empty-bin-button"
  );

const recycleFiles =
  document.getElementById(
    "recycle-files"
  );

const recycleStatus =
  document.getElementById(
    "recycle-status"
  );


emptyBinButton?.addEventListener(
  "click",
  () => {

    const confirmed =
      confirm(
        "Are you sure you want to permanently delete these items?"
      );


    if (!confirmed) {
      return;
    }


    recycleFiles.innerHTML =
      "";


    recycleStatus.textContent =
      "Recycle Bin is empty.";


    emptyBinButton.disabled =
      true;
  }
);
