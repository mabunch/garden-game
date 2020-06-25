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

function getLeafImagePath(level) {
    return `images/plantA/s${level}a.png`;
}

let testLevel = 1;
let deg = 10;

// If you can't get this working, go back to switching out
// the src property of the image by doing something like:
// $(this).find('.leaves').attr('src', imagePath)
$('.pot').click(function() {
    console.log('clicky');
    testLevel++;
    let leaf = $(this).find('.leaves');
    let topPos = parseInt($(leaf).css('top'), 10);
    console.log('topPos', topPos);
    $(leaf).css('top', (topPos - 20) + 'px');
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
    growth[plantIndex]++;
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
