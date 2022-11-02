let canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');




let scoreElement = document.querySelector('#score span');
let score = 0;

let winElement = document.querySelector('#endGame')


let restartElement = document.querySelector('#restart')


const gravity = 4.0

class Players {
    constructor({position, velocity}){
        this.position = position
        this.velocity = velocity
        this.height = 100
        this.color = 'black'
        const playerImg = new Image();
        playerImg.addEventListener('load', () => {
            this.playerImg = playerImg;
        })
        playerImg.src = './images/player.png'
    }
        
    


    draw(){
        
        if(this.playerImg){
            ctx.drawImage(this.playerImg, this.position.x, this.position.y, 125, this.height)
        }
        
    }



    update(){
        this.draw()

        this.position.x += this.velocity.x
        
        this.position.y += this.velocity.y

        if(this.position.y + this.height + this.velocity.y - 20 >= canvas.height){
            this.velocity.y = 0
        } else this.velocity.y += gravity
    }

    
}


const Player1 = new Players({
    position: {
    x: 305,
    y: 575
},
velocity: {
    x: 0,
    y: 0
}
})

const myKeyObj = {
    space: {
        pressed: false
    }
}



window.addEventListener('keydown', (event) => {
    switch (event.code){
        case 'Space':
            Player1.velocity.y -= 26.3
            break
    }

})



window.addEventListener('keyup', (event) => {
    switch (event.code){
        case 'Space':
            myKeyObj.space.pressed = false
            break
    }

})
    

   
    
//cube on top of player

    class Cubes {

        constructor(x, y, width, height){
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.color = 'black';
            this.contacted = false
            
          }
  
          draw(){
            ctx.fillStyle = this.color

              ctx.fillRect(this.x, this.y, this.width, this.height)
          }
  
       pickColor(){
            const colors = ['red', 'blue', 'green', 'yellow']
            let randomColor = colors[Math.floor(Math.random() * colors.length)]
            if(randomColor == this.color){
                while(randomColor == this.color){
                    randomColor = colors[Math.floor(Math.random() * colors.length)]
                }
            }
            this.color = randomColor
            
        }

        collitionCheck(obstacle){
            if (
                this.x < obstacle.position.x + 125 &&
                this.x + 125 > obstacle.position.x &&
                this.y < obstacle.position.y + obstacle.height &&
                this.height + this.y > obstacle.position.y
              ) {
                return true                
              } else {
                return false
              }
        }
          }


     let cubePlayer1 = new Cubes(378, 450, 45, 50);

// cube with color

     class Obstacles {
        constructor(x, y, width, height){
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.color = 'yellow'       
            
     }
  
          draw(){
              ctx.fillStyle = this.color
        
              ctx.fillRect(this.x, this.y, this.width, this.height)
          }

        optionColor(){
            const colors = ['red', 'blue', 'green', 'yellow']
            const randomColor = colors[Math.floor(Math.random() * colors.length)]
            
            this.color = randomColor
         
        }
    
     }
    
          let block = new Obstacles(300, 200, 200, 100,);
 
    
    

     

let framecount = 0
let animationFrameId;
      function animate(){
        framecount++
        animationFrameId = window.requestAnimationFrame(animate)
        
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        if (framecount % (60 - score * 7.5) === 0) {
            cubePlayer1.pickColor();
        }

        if(cubePlayer1.collitionCheck(Player1) && cubePlayer1.color == block.color){
            console.log('match')
            block.optionColor()
            score += 1
            scoreElement.innerHTML = `${score}`
        }    

        cubePlayer1.draw(); 
        block.draw();
        Player1.update()

        

        
        
        
        if (score === 5){
            canvas.style.display = 'none'
            winElement.style.display = "block"
            cancelAnimationFrame(animationFrameId)
    }

    }
    
    animate()

    restartElement.addEventListener('click', () => {
        score = 0
        scoreElement.innerHTML = `${score}`
        framecount = 0
        canvas.style.display = 'inline'
            winElement.style.display = "none"
        animate()
    })

   

   