const clock =
  document.getElementById("clock");


function updateClock() {

  const now =
    new Date();


  let hours =
    now.getHours();


  const minutes =
    now
      .getMinutes()
      .toString()
      .padStart(2, "0");


  const period =
    hours >= 12
      ? "PM"
      : "AM";


  hours %= 12;

  hours ||= 12;


  clock.textContent =
    `${hours}:${minutes} ${period}`;
}


updateClock();


setInterval(
  updateClock,
  1000
);