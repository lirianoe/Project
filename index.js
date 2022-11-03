let canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');




let scoreElement = document.querySelector('#score span');
let score = 0;

let winElement = document.querySelector('#endGame')
let restartElement = document.querySelector('#restart')

//let backgroundAudio = new Audio('./audio/backgroundSound.mp3')
let dingSound = new Audio('./audio/dingSound.mp3')
let winSound = new Audio('./audio/winSound.mp3')

let startBttn = document.querySelector('#startButton')
let instructionBttn = document.querySelector('#instructionButton')
let instructText = document.querySelector('#instructionText')
let goBackBttn = document.querySelector('#goBackButton')

const gravity = 5.0

class Players {
    constructor({position, velocity}){
        this.position = position
        this.velocity = velocity
        this.height = 140
        this.color = 'black'
        const playerImg = new Image();
        playerImg.addEventListener('load', () => {
            this.playerImg = playerImg;
        })
        playerImg.src = './images/player.png'
    }
        
    


    draw(){
        
        if(this.playerImg){
            ctx.drawImage(this.playerImg, this.position.x, this.position.y, 140, this.height)
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
    x: 375,
    y: 545
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
            Player1.velocity.y -= 29
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
                this.x < obstacle.position.x + 75 &&
                this.x + 125 > (obstacle.position.x + 50) + 50 &&
                this.y < obstacle.position.y + obstacle.height &&
                this.height + this.y > obstacle.position.y
              ) {
                return true                
              } else {
                return false
              }
        }
          }


     let cubePlayer1 = new Cubes(378, 400, 45, 50);

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
    
          let block = new Obstacles(300, 175, 200, 100,);
 
    
    

     

let framecount = 0
let animationFrameId;
      function animate(){
        framecount++
        animationFrameId = window.requestAnimationFrame(animate)
        
        ctx.clearRect(0, 0, canvas.width, canvas.height)

       

        if (framecount % (60 - score * 8) === 0) {
            cubePlayer1.pickColor();
        }

        if(cubePlayer1.collitionCheck(Player1) && cubePlayer1.color == block.color){
            console.log('match')
            block.optionColor()
            score += 1
            scoreElement.innerHTML = `${score}`
            dingSound.play()
        }    

        cubePlayer1.draw(); 
        block.draw();
        Player1.update()

        

        
        
        
        if (score === 5){
            canvas.style.display = 'none'
            winElement.style.display = "block"
            cancelAnimationFrame(animationFrameId)
            winSound.play()
            
    }

    }



    startBttn.addEventListener('click', () => {
        animate()
        startBttn.style.display = "none"
        instructionBttn.style.display = "none"
    })

    instructionBttn.addEventListener('click', () => {
        instructText.style.display = "inline"
        startBttn.style.display = "none"
        instructionBttn.style.display = "none"
        goBackBttn.style.display = "inline"


    })
   

   goBackBttn.addEventListener('click', () => {
    startBttn.style.display = 'inline'
    instructionBttn.style.display = "inline"
    goBackBttn.style.display = "none"
    instructText.style.display = "none"
   })

    restartElement.addEventListener('click', () => {
        score = 0
        scoreElement.innerHTML = `${score}`
        framecount = 0
        canvas.style.display = 'inline'
            winElement.style.display = "none"
        animate()
    })

  
   
   