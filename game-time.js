let level;
let growth;
let gameOver;
let waterNeed;

$('.start-button').on('click', function() {
    level = 1;
    growth = [0,0,0,0];
    gameOver = false;
    waterNeed = [false, false, false, false];

    while (!gameOver){
        simulateGame();
        break;
    }
});

function simulateGame(){
    let index = level-1; // the index we are primarily concerned with growing. 
    // keep going until the plant has grown to stage 4. 
    while (growth[index] < 4){
        grow(index);
    }
}

function grow(plantIndex){
    elem = ".pot-" + plantIndex + ".leaves.level-" + level;
    growth[plantIndex]++; // plant stage increases
    console.log(elem);
    $(elem).show();
}

function needsWater(plantIndex){
    elem = '.pot' + plantIndex + ".leaves";
    $(elem).addClass(".dying");
    waterNeed[plantIndex] = true;
}

function receiveWater(plantIndex){
    elem = '.pot' + plantIndex + ".leaves";
    $(elem).removeClass(".dying");
}