// change backgroud
var character = document.querySelectorAll(".character li img");
var background = document.querySelectorAll(".background li img");
var difficulty = document.querySelectorAll("#item-dif");
var sourceImgBird = "./img/bird5.png";
var sourceImgBackground = "./img/background.png";
var valueDifficulty = 2;
addAtive(character);
addAtive(background);
addAtive(difficulty);
function addAtive(array) {
    array.forEach(function(item) {
        item.onclick = function() {
            array.forEach(function(itemRemove) {
                itemRemove.classList.remove("active");
            })
            this.classList.add("active");
            changeBird();
            changeBackground();
            changeDifficulty();
        }
    })
}
/// change character 
changeBird();
function changeBird() {
    for(var i = 0; i < [...character].length; i++) {
        if([...character][i].classList.contains("active")) {
            sourceImgBird = character[i].src;
            playGame();
        }
    }
}
// change background
changeBackground();
function changeBackground() {
    for(var i = 0; i < [...background].length; i++) {
        if([...background][i].classList.contains("active")) {
            sourceImgBackground = background[i].src;
            playGame();
        }
    }
}
// change difficultly
changeDifficulty();
function changeDifficulty() {
    for(var i = 0; i < [...difficulty].length; i++) {
        if([...difficulty][i].checked) {
            valueDifficulty = difficulty[i].value;
            playGame();
        }
    }
}
//  play game when have a call 
function playGame() {
    let imageShow = document.querySelector("#space-app");
    let score = document.querySelector(".score");
    var context = imageShow.getContext("2d");
    var imgBird = new Image();  
    var imgTubeUp = new Image();
    var imgTubeBelow = new Image();
    var mainImg = new Image();
    var gameOverImg = new Image();
    imgTubeUp.src = "./img/up.png";
    imgTubeBelow.src = "./img/below.png";
    gameOverImg.src = "./img/gameOver.png";
    imgBird.src = sourceImgBird;
    mainImg.src = sourceImgBackground;
    var getScore = 0;
    var spaceBetweenTube = 140;
    var spaceToBelow;
    var bird = {
        x: imageShow.width/3,
        y: (imageShow.height)/2
    }
    var listTubes = [];
    listTubes[0] = {
        x: imageShow.width,
        y: 0
    }
    context.drawImage(imgBird,bird.x,bird.y, 50, 50);
function runGame() {
    if( getScore == 5) {
        mainImg.src = "./img/backgroud3.jpg";
    }
    if( getScore == 10) {
        mainImg.src = "./img/background.png";
    }
    document.querySelector(".re-play").innerHTML = "";
    context.drawImage(mainImg,0,0, 1650, 500);
    context.drawImage(imgBird,bird.x,bird.y, 50, 50);
    for(var i = 0; i < listTubes.length; i++) {
        spaceToBelow = imgTubeUp.height + spaceBetweenTube;
        context.drawImage(imgTubeUp, listTubes[i].x,Math.round(listTubes[i].y));
        context.drawImage(imgTubeBelow, listTubes[i].x ,Math.round(listTubes[i].y) + spaceToBelow);
        listTubes[i].x -= valueDifficulty;
        var valueAdd = valueDifficulty == 6 ? 7: 1;
        if(listTubes[i].x + valueAdd == Math.floor((imageShow.width)/1.2)) {
            listTubes.push({
                x: imageShow.width, 
                y: Math.round(Math.random()*imgTubeUp.height) - imgTubeUp.height
            })
        }
        if(listTubes[i].x  == bird.x) {getScore++};
        if(listTubes[i].x < -20) {
            listTubes.splice(0,1);
        }
        if((Math.floor(bird.y)+imgBird.height>=imageShow.height) || Math.floor(bird.y) <= 0 || 
        bird.x+imgBird.width>= listTubes[i].x && bird.x <= listTubes[i].x +imgTubeUp.width
        && (bird.y<=listTubes[i].y+imgTubeUp.height||
        bird.y +imgBird.height>= listTubes[i].y + spaceToBelow))   
            {
                if(gameOver() == 0) {
                    return;
                }
            }     
    }
    score.innerHTML ="Your score: "+ getScore;
    bird.y += 3;
    requestAnimationFrame(runGame);
}
    runGame();
    document.addEventListener("keydown", ()=>{
        bird.y -= 50;
    });
    function gameOver() {
        document.querySelector(".re-play").innerHTML = "Please click enter to replay";
        context.drawImage(gameOverImg,imageShow.width/2 - 150, 50, 300,450);
        return 0;
    }
}

playGame();
document.addEventListener("keydown", (e)=>{
   if(e.keyCode === 13) {
       playGame();
   }
});

// setting btn

var btnSetting = document.querySelector(".settings-img");
var menuSetting = document.querySelector(".list-settings")
btnSetting.addEventListener("click", function() {
    this.classList.toggle("active");
    menuSetting.classList.toggle("active");
})



