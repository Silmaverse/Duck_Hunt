let ducks;
let duckCount =1;
let duckImages =["images/duck-left.gif" ,"images/duck-right.gif"];
let duckWidth = 96;
let duckHeight =93;
let duckVelocityX =5;
let duckVelocityY =5;
let gameWidth =window.screen.width;
let gameHeight = window.screen.height*3/4 ;

let score=0;

// music add

let scoresound =new Audio("music/dog-score.mp3");
let duck_flap_sound =new Audio("music/duck-flap.mp3");
let duch_quak_sound = new Audio("music/duck-quack.mp3");
let duck_shot_sound = new Audio("music/duck-shot.mp3");

window.onload =function(){
    addDucks();
    setInterval(moveDucks ,1000/50);
}
document.addEventListener("click",()=>{

    duch_quak_sound.play();
    duck_flap_sound.play();
})

function addDucks(){
  
  
    ducks=[];
    duckCount =Math.floor(Math.random()*2)+1;
    for(let i =0 ; i<duckCount ;i++){
        let duckImageName =duckImages[Math.floor(Math.random()*2)];

        // create image tag
        let duckImage =document.createElement('img');
        duckImage.src = duckImageName;
        duckImage.width =duckWidth;
        duckImage.height =duckHeight;
        duckImage.draggable =false;
        duckImage.style.position ="absolute";
        duckImage.onclick =function(){
            duck_shot_sound
            duck_shot_sound.play();
            score +=1;
            document.getElementById("score").innerHTML = `Score : ${score}`;
            document.body.removeChild(this);
            let remainigducks =[]
            for(let i=0; i<ducks.length ;i++){
                if(ducks[i].image != this){
                    remainigducks.push(ducks[i]);
                }
            }

            ducks =remainigducks;
            if(ducks.length ==0){
                addDog();
                
            }

        }

        document.body.append(duckImage);


        let duck ={
            image : duckImage ,
            x: randomPosition(gameWidth-duckWidth) ,
            y: randomPosition(gameHeight -duckHeight),
            velocityX:duckVelocityX,
            velocityY :duckVelocityY,
        }

        duck.image.style.left =String(duck.x) +"px";
        duck.image.style.top =String(duck.y) +"px";

        if(duck.image.src.includes(duckImages[0])){
            duck.velocityX = -duckVelocityX;
        }

        ducks.push(duck);
        
    }

}

function moveDucks(){
    for(let i =0 ;i<ducks.length;i++){

        let  duck =ducks[i];
        duck.x +=duck.velocityX;

        if(duck.x <0 || duck.x +duckWidth > gameWidth){

            duck.x -=duck.velocityX;

            duck.velocityX*=-1;

            if(duck.velocityX <0){
                duck.image.src=duckImages[0] ; //left
            } else{
                 duck.image.src=duckImages[1] ; //right
            }
        }

         duck.y +=duck.velocityY;

        if(duck.y <0 || duck.y + duckHeight >gameHeight){

            duck.y -=duck.velocityY;

            duck.velocityY*=-1 ;
        }



        duck.image.style.left =String(duck.x) + "px";
        duck.image.style.top =String(duck.y) + "px";
    }

}


function addDog(){
    let dogImage =document.createElement("img");

    if(duckCount == 1){
        dogImage.src ="images/dog-duck1.png";
        dogImage.width =172;
    }
    else{
        dogImage.src ="images/dog-duck2.png";
        dogImage.width=224;
        
    }
    
    dogImage.height =152;
    dogImage.draggable = false;
    
    dogImage.style.position ="fixed";
    dogImage.style.left ="50%";
    dogImage.style.transform ="translate(-50%)"
    dogImage.style.bottom ="0px";
    document.body.appendChild(dogImage);

    scoresound.play();

    setTimeout(()=>{
        document.body.removeChild(dogImage);
         addDucks();
    },1000)
    

}

function randomPosition(limit){

    return Math.floor(Math.random()*limit)
}