let ducks;
let duckCount =1;
let duckImages =["../images/duck-left.gif" ,"../images/duck-right.gif"];
let duckWidth = 96;
let duckHeight =93;
let duckVelocityX =5;
let duckVelocityY =5;

let gameWidth =window.screen.width;
let gameHeight = window.screen.height*3/4 ;

window.onload =function(){
    addDucks();
    setInterval(moveDucks ,1000/60);
}

function addDucks(){
    ducks=[];
    for(let i =0 ; i<duckCount ;i++){
        let duckImageName =duckImages[Math.floor(Math.random()*2)];

        // create image tag
        let duckImage =document.createElement('img');
        duckImage.src = duckImageName;
        duckImage.width =duckWidth;
        duckImage.height =duckHeight;
        duckImage.draggable =false;
        duckImage.style.position ="absolute";
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
        }
         duck.y +=duck.velocityY;
        if(duck.y <0 || duck.y + duckHeight >gameHeight){

            duck.y -=duck.velocityY;
        }



        duck.image.style.left =String(duck.x) + "px";
        duck.image.style.top =String(duck.y) + "px";
    }
}

function randomPosition(limit){

    return Math.floor(Math.random()*limit)
}