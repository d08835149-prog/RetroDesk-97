const desktop =
  document.getElementById(
    "desktop"
  );


const wallpapers = [
  "assets/wallpapers/seoul1.jpg",
  "assets/wallpapers/seoul2.jpg",
  "assets/wallpapers/seoul3.jpg",
  "assets/wallpapers/seoul4.jpg",
  "assets/wallpapers/seoul5.jpg",
  "assets/wallpapers/seoul6.jpg"
];


let currentWallpaper =
  0;


function changeWallpaper() {

  currentWallpaper++;


  if (
    currentWallpaper >=
    wallpapers.length
  ) {

    currentWallpaper =
      0;
  }


  desktop.style.backgroundImage =
    `url("${wallpapers[currentWallpaper]}")`;
}


setInterval(
  changeWallpaper,
  30000
);