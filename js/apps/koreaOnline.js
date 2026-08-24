const connectButton =
  document.getElementById(
    "connect-button"
  );


const connectionStatus =
  document.getElementById(
    "connection-status"
  );


const loginScreen =
  document.getElementById(
    "korea-login-screen"
  );


const mainScreen =
  document.getElementById(
    "korea-main-screen"
  );


connectButton?.addEventListener(
  "click",
  () => {

    connectButton.disabled =
      true;


    connectionStatus.textContent =
      "Initializing modem...";


    setTimeout(
      () => {

        connectionStatus.textContent =
          "Dialing 01410...";

      },
      900
    );


    setTimeout(
      () => {

        connectionStatus.textContent =
          "Verifying connection...";

      },
      1800
    );


    setTimeout(
      () => {

        connectionStatus.textContent =
          "Connected at 33.6 Kbps";

      },
      2700
    );


    setTimeout(
      () => {

        loginScreen.hidden =
          true;


        mainScreen.hidden =
          false;

      },
      3500
    );
  }
);