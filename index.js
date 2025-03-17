const canvas=document.querySelector('canvas');
const c=canvas.getContext('2d');
const gravity=0.7;
const temp=document.querySelector("#yahu");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

c.fillRect(0,0,canvas.width,canvas.height)
const audio = new Audio("eazy e.wav");

// canvas.addEventListener("click", () => {
//   audio.play();
// });
class Sprite{
    constructor({position,velocity,color}){
        this.position=position;
        this.velocity=velocity;
        this.width=50;
        this.height=150;
        this.attackBox={
          position:this.position,
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
  color: "red"
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
  color:'blue'
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
  }
}
function animation(){
    window.requestAnimationFrame(animation)
    // console.log(player.position)
    c.fillStyle='black'
    c.fillRect(0,0,canvas.width,canvas.height);
    enemy.update();
    player.update();
    player.velocity.x=0;
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
  // console.log("player"+player.attackBox.position.y);
// console.log("enemy" + enemy.attackBox.position.y+" "+enemy.height);
    if (
      player.attackBox.position.x + player.attackBox.width >=
        enemy.position.x &&
      player.position.x + player.width <= enemy.position.x + enemy.width &&
      player.attackBox.position.y + player.attackBox.height >=
        enemy.position.y &&
      player.attackBox.position.y <= enemy.position.y + enemy.height&&
      player.isAttacking
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
    break;

  case "ArrowUp":
    // keys.d.pressed = false;
    temp.innerHTML = "atas work";
    temp.style.color = "red";
    enemy.velocity.y = -20;

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
    
  }
});

console.log(player);