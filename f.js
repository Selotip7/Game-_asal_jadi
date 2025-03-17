
const canvas = document.getElementById("menuCanvas");
const ctx = canvas.getContext("2d");

// Objek audio diinisialisasi di awal
const audio = new Audio("w.mp3");
const gravity = 0.7;
//  audio.volume = 1;
// Objek gambar untuk background menu
const img = new Image();
img.src = "ss.jpg"; // Ganti dengan path gambar yang sesuai

// Objek gambar untuk tampilan saat "Exit" ditekan
const exitImg = new Image();
exitImg.src = "ddd.webp"; // Ganti dengan gambar yang ingin muncul saat Exit
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
// Data menu
const menuItems = [
  { text: "Play", x: centerX, y: centerY, width: 100, height: 40 },
  { text: "Settings", x: centerX, y: centerY-50, width: 100, height: 40 },
  { text: "Exit", x: centerX, y: centerY+50,width: 100, height: 40 },
];

// Fungsi menggambar background
function drawBackground() {
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

// Fungsi menggambar menu utama
function drawMenu() {
  drawBackground();

  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Main Menu", 140, 50);

  menuItems.forEach((item) => {
    ctx.fillStyle = "blue";
    ctx.fillRect(item.x, item.y, item.width, item.height);

    ctx.fillStyle = "white";
    ctx.fillText(item.text, item.x + 20, item.y + 25);
  });
}

// Pastikan gambar dimuat sebelum menggambar menu
img.onload = function () {
  drawMenu();
};

// Event klik untuk menangkap interaksi pengguna
canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  menuItems.forEach((item) => {
    if (
      mouseX >= item.x &&
      mouseX <= item.x + item.width &&
      mouseY >= item.y &&
      mouseY <= item.y + item.height
    ) {
      handleMenuClick(item.text);
    }
  });
});
let g=false;

// Fungsi menangani klik menu
function handleMenuClick(option) {
  if (option === "Play") {
    playMusic();
  } else if (option === "Settings") {
    stopMusic();
  } else if (option === "Exit") {
    ctx.drawImage(exitImg, 0, 0, canvas.width, canvas.height);
    
    audio.play();
    if(g==false){
      setTimeout(() => {
        // console.log("rr");
        showExitScreen();
          g=true;
        }, 1000);
        // return;
    }
  }
}

// Fungsi memainkan musik
function playMusic() {
  audio.play().catch((error) => console.log("Audio play error:", error));
}

// Fungsi menghentikan musik
function stopMusic() {
  audio.pause();
  audio.currentTime = 0;
}

// Fungsi untuk menampilkan gambar saat "Exit" ditekan




function showExitScreen() {


 ctx.fillRect(0, 0, canvas.width, canvas.height);
//  const audio = new Audio("eazy e.wav");

 // canvas.addEventListener("click", () => {
 //   audio.play();
 // });
 class Sprite {
   constructor({ position, velocity, color }) {
     this.position = position;
     this.velocity = velocity;
     this.width = 50;
     this.height = 150;
     this.attackBox = {
       position: this.position,
       width: 100,
       height: 50,
     };
     this.color = color;
     this.isAttacking;
   }

   draws() {
     ctx.fillStyle = this.color;
     ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
     if (this.isAttacking) {
       ctx.fillStyle = "green";
       ctx.fillRect(
         this.attackBox.position.x,
         this.attackBox.position.y,
         this.attackBox.width,
         this.attackBox.height
       );
     }
   }

   update() {
     // window.alert("ini pertama"+this.position.y)
     this.draws();

     this.position.x += this.velocity.x;
     // console.log("ulang");
     this.position.y += this.velocity.y;

     if (this.position.y + this.height + this.velocity.y >= canvas.height) {
       this.velocity.y = 0;
     } else {
       this.velocity.y += gravity;
     }
   }

   attack() {
     this.isAttacking = true;

     setTimeout(() => {
       this.isAttacking = false;
     }, 100);
   }
 }

 const player = new Sprite({
   position: {
     x: 0,
     y: 0,
   },
   velocity: {
     x: 0,
     y: 0,
   },
   color: "red",
 });

 const enemy = new Sprite({
   position: {
     x: 400,
     y: 100,
   },
   velocity: {
     x: 0,
     y: 0,
   },
   color: "blue",
 });

 // player.draws();
 // enemy.draws();

 let lastKey;

 const keys = {
   a: {
     pressed: false,
   },
   d: {
     pressed: false,
   },
 };
 function animation() {
   window.requestAnimationFrame(animation);
   // console.log(player.position)
   ctx.fillStyle = "black";
   ctx.fillRect(0, 0, canvas.width, canvas.height);
   enemy.update();
   player.update();
   player.velocity.x = 0;
   //   console.log("------------");
   // console.log(keys.a.pressed);
   // console.log(keys.d.pressed)
   // console.log("Last Key"+lastKey)
   // console.log("------------");

   if (keys.d.pressed && lastKey == "d") {
     player.velocity.x = 5;
     // console.log("ini D"+player.velocity.x);
   } else if (keys.a.pressed && lastKey == "a") {
     player.velocity.x = -5;
     // console.log(player.velocity.x);
   }
   // console.log("player"+player.attackBox.position.y);
   // console.log("enemy" + enemy.attackBox.position.y+" "+enemy.height);
   if (
     player.attackBox.position.x + player.attackBox.width >= enemy.position.x &&
     player.position.x + player.width <= enemy.position.x + enemy.width &&
     player.attackBox.position.y + player.attackBox.height >=
       enemy.position.y &&
     player.attackBox.position.y <= enemy.position.y + enemy.height &&
     player.isAttacking
   ) {
     player.isAttacking = false;
     console.log("you reach the enemy");
     // window.alert("you reach the enemy");
   }
 }

 animation();

 window.addEventListener("keydown", (event) => {
   console.log(event);

   switch (event.key) {
     case "d":
       keys.d.pressed = true;
       lastKey = "d";
       // console.log(keys.d.pressed);
       break;
     case "a":
       keys.a.pressed = true;
       lastKey = "a";
       break;
     case "w":
       player.velocity.y = -20;
       break;

     case " ":
       player.attack();
       break;

     case "ArrowDown":
       enemy.attack();
       break;

     case "ArrowUp":
       // keys.d.pressed = false;
      //  temp.innerHTML = "atas work";
       temp.style.color = "red";
       enemy.velocity.y = -20;

       break;
   }
 });

 window.addEventListener("keyup", (event) => {
   // console.log(event);

   switch (event.key) {
     case "d":
       keys.d.pressed = false;

       lastKey = "a";
       break;
     case "a":
       keys.a.pressed = false;

       lastKey = "d";
       break;
     case "w":
       player.velocity.y = 0;
      //  temp.innerHTML = "atas work";
       break;
     case "s":
       player.velocity.y = 0;
       break;

     case "ArrowUp":
       // keys.d.pressed = false;
       enemy.velocity.y = 0;

       break;
   }
 });

 console.log(player);
}

// Pastikan gambar exit dimuat sebelum digunakan
exitImg.onload = function () {
  console.log("Exit image loaded");
};

