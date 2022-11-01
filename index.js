let canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');



//ctx.fillRect(0, 0, canvas.width, canvas.height);
let scoreElement = document.querySelector('.score span');
let score = 0;

const gravity = 2.0

class Players {
    constructor({position, velocity}){
        this.position = position
        this.velocity = velocity
        this.height = 50
        this.color = 'black'
    }

    draw(){
        ctx.fillStyle = this.color
        ctx.fillRect(this.position.x, this.position.y, 50, this.height)

    }
    update(){
        this.draw()

        this.position.x += this.velocity.x
        
        this.position.y += this.velocity.y

        if(this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0
        } else this.velocity.y += gravity
    }

    
}


const Player1 = new Players({
    position: {
    x: 400,
    y: 600
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
            Player1.velocity.y -= 19.3
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
            const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'aqua', 'fuchsia', 'lime', 'navy']
            const randomColor = colors[Math.floor(Math.random() * colors.length)]
            
            this.color = randomColor
            
        }

        collitionCheck(obstacle){
            if (
                this.x < obstacle.position.x + 50 &&
                this.x + 50 > obstacle.position.x &&
                this.y < obstacle.position.y + obstacle.height &&
                this.height + this.y > obstacle.position.y
              ) {
                return true                
              } else {
                // No collision
                return false
              }
        }
          }


     let cubePlayer1 = new Cubes(403, 450, 45, 50);
     
     let colorForCube = ''
  


// cube with color

     class Obstacles {
        constructor(x, y, width, height){
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.color = 'orange'
           
            
            
     }
  
          draw(){
              ctx.fillStyle = this.color
        
              ctx.fillRect(this.x, this.y, this.width, this.height)
          }

        optionColor(){
            const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'aqua', 'fuchsia', 'lime', 'navy']
            const randomColor = colors[Math.floor(Math.random() * colors.length)]
            
            this.color = randomColor
            
            // let differentColors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'aqua', 'fuchsia', 'lime', 'navy']
            // for (let i = 0; i < differentColors; i++){
            //     this.color = differentColors[i + 1] 
            // }
         
        }
    
     }
    
        

     
     let block = new Obstacles(325, 200, 200, 100,);
 
    //block.draw();
    

     

let framecount = 0
      function animate(){
        framecount+++
        window.requestAnimationFrame(animate)
        
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        if (framecount % 60 === 0) {
            cubePlayer1.pickColor();
        }

        if(cubePlayer1.collitionCheck(Player1) && cubePlayer1.color == block.color){
            console.log('match')
            block.optionColor()
            score += 1
            scoreElement.innerText = `${score}`
        }

        //  if (){
        //     block.optionColor()
        // }
        
        

        cubePlayer1.draw();
        
        

       
        block.draw();
        Player1.update()

    }
    
    animate()


   