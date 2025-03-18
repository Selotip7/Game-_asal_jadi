const canvas=document.querySelector('canvas');
const c=canvas.getContext('2d');
const gravity=0.7;
const temp=document.querySelector("#yahu");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

c.fillRect(0,0,canvas.width,canvas.height)
// const audio = new Audio("eazy e.wav");

// canvas.addEventListener("click", () => {
//   audio.play();
// });
class Sprite{
    constructor({position,velocity,color,offset}){
        this.position=position;
        this.velocity=velocity;
        this.width=50;
        this.height=150;

        this.attackBox={
          position:{
            x:this.position.x,
            y:this.position.y
          },
          offset,
          width:100,
          height:50,
        }
        this.color=color
        this.isAttacking;
    }
    
    

    draws(){
        c.fillStyle=this.color;
        c.fillRect(this.position.x,this.position.y,this.width,this.height)
        if(this.isAttacking){

          c.fillStyle = 'green';
          c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
        }
 
      }

    

    update(){
        // window.alert("ini pertama"+this.position.y)
        this.draws();
        this.attackBox.position.x=this.position.x-this.attackBox.offset.x;
        this.attackBox.position.y=this.position.y
        this.position.x+=this.velocity.x;
        // console.log("ulang");
        this.position.y+=this.velocity.y;
        
        if(this.position.y + this.height+this.velocity.y >=  canvas.height){
            this.velocity.y=0;
            
         }
        
        else{

            this.velocity.y+=gravity;
        }
    }

    attack(){
      this.isAttacking=true;
      
      setTimeout(()=>{
        this.isAttacking=false;
      },100)

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
  offset: {
    x: 0,
    y: 0,
  }
});

const enemy = new Sprite({
  position: {
    x: 400,
    y: 100
  },
  velocity: {
    x: 0,
    y: 0
  },
  color:'blue',
   offset: {
    x: 50,
    y: 0,
  }
});

// player.draws();
// enemy.draws();

let lastKey;

const keys ={
  a:{
    pressed :false
  },
  d :{
    pressed:false
  },
  ArrowRight:{
    pressed:false
  },
  ArrowLeft:{
    pressed:false
  }
}


function rectangleCollusion({rectangle1,rectangle2}){
  return (
    
       rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
      rectangle1.attackBox.position.x + rectangle1.width <= rectangle2.position.x + rectangle2.attackBox.width &&
      rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
      rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
   
  )
}


function animation(){
    window.requestAnimationFrame(animation)
    // console.log(player.position)
    // console.log(
    //   player.position.x +"=="+ player.width +
    //     "---" +
    //     (enemy.attackBox.position.x +
    //     enemy.width) +
    //     "------" +
    //     (enemy.attackBox.position.x + enemy.attackBox.width)
    // );
    c.fillStyle='black'
    c.fillRect(0,0,canvas.width,canvas.height);
    enemy.update();
    player.update();
    player.velocity.x=0;
     enemy.velocity.x = 0;
  //   console.log("------------");
  // console.log(keys.a.pressed);
  // console.log(keys.d.pressed)
  // console.log("Last Key"+lastKey)
  // console.log("------------");




  if(keys.d.pressed && lastKey=='d'){
          player.velocity.x=5;
          // console.log("ini D"+player.velocity.x);
        }


    else if(keys.a.pressed && lastKey=='a'){
      player.velocity.x=-5;
      // console.log(player.velocity.x);
    } 



      if (keys.ArrowRight.pressed && lastKey == "ArrowRight") {
       enemy.velocity.x = 5;
        // console.log("ini D"+player.velocity.x);
      } else if (keys.ArrowLeft.pressed && lastKey == "ArrowLeft") {
       enemy.velocity.x = -5;
        // console.log(player.velocity.x);
      } 



  // console.log("player"+player.attackBox.position.y);
  // console.log("enemy" + enemy.attackBox.position.y+" "+enemy.height);
  if (
    rectangleCollusion({
      rectangle1: enemy,
      rectangle2: player
    }) &&  enemy.isAttacking
  ) {
   enemy.isAttacking = false;
    console.log("you reach the enemy");
    // window.alert("you reach the enemy");
  }
    if (
      rectangleCollusion({
        rectangle1:player,
        rectangle2:enemy
      })&&player.isAttacking
    ) {
      player.isAttacking=false;
      console.log("you reach the enemy");
      // window.alert("you reach the enemy");
    }



          
        }
        
        animation();

window.addEventListener('keydown',(event)=>{
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
    // enemy.isAttacking = true;
    break;

  case "ArrowUp":
    // keys.d.pressed = false;
    temp.innerHTML = "atas work";
    temp.style.color = "red";
    enemy.velocity.y = -20;

    break;

  case "ArrowRight":
    
  keys.ArrowRight.pressed=true;
  lastKey="ArrowRight";

    break;

    case "ArrowLeft":
        keys.ArrowLeft.pressed=true;
  lastKey="ArrowLeft";
  break;
}
})

  

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
      temp.innerHTML = "atas work";
      break;
    case "s":
      player.velocity.y = 0;
      break;

    case "ArrowUp":
      // keys.d.pressed = false;
      enemy.velocity.y = 0;

      break;

    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      lastKey = "ArrowLeft";

      break;

    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      lastKey = "ArrowRight";
      break;
  }
});

console.log(player);