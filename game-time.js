let level;
let growth;
let gameOver;
let waterNeed;
let max_level = 5;
let currentPot = null;
let gameJustPlayed = false;

$('.start-button').on('click', function() {
    // reset everything.
    console.log("clicked start");
    level = 1;
    growth = [0,0,0,0];
    gameOver = false;
    waterNeed = [false, false, false, false];
    $('.leaves').css('top', -85 + 'px');

    for (let i=0; i<4; i++){
        elem1 = '.pot-' + i + ".leaves";
        elem2 = '.box.pot.pot-' + i;
        $(elem1).removeClass('success');
        $(elem2).removeClass('success');
        $(elem2).removeClass('dead');
    }

    needsWater(findPot());
});

// find a random plant out of the 4 that needs water
function findPot(){
    let foundFree = false;
    let check;
    while (!foundFree){
        // checkGameOver();
        check = Math.floor(Math.random() * 4); // random index 0-3
        if (growth[check] < max_level && growth[check] > -1){
            foundFree = true;
        }
    }
    return check;
}

// if all of the plants have reached the "max-level" then you win!
function checkGameOver(){

    // game won.
    if (growth[0] === max_level && growth[1] === max_level && growth[2] === max_level &&
        growth[3] === max_level){
            gameOver = true;
            console.log("successfully won game!");
        } 

}

function needsWater(plantIndex){
    console.log("pot " + plantIndex + " needs water!");
    elem = '.box.pot.pot-' + plantIndex;
    $(elem).addClass('wiggle');
    waterNeed[plantIndex] = true;
}

function checkForSuccess(index){
    if (growth[index] === max_level){
        console.log(index + " IS DONE GROWING!");
        elem1 = '.pot-' + index + ".leaves";
        elem2 = '.box.pot.pot-' + index;
        $(elem1).addClass('success');
        $(elem2).addClass('success');
        var successAudio = new Audio('sound effects/plantgrown.mp3');
        successAudio.play();
        checkGameOver();
    }
}

function getLeafImagePath(level) {
    return `images/plantA/s${level}a.png`;
}

// If you can't get this working, go back to switching out
// the src property of the image by doing something like:
// $(this).find('.leaves').attr('src', imagePath)
// let testLevel = 1;
$('.pot').click(function() {

    console.log('clicked a pot');
    // did it need water? if so, grow upon click.  
    let idSplit = $(this).attr('id').split('.'); 
    let potIndex = idSplit[idSplit.length-1];
    elem = '.box.pot.pot-' + potIndex;
    console.log("pot clicked: " + potIndex);
    // console.log("needs water? " + waterNeed[potIndex]);

    // they have clicked the correct plant that needed water
    if (waterNeed[potIndex]){
        // grow plant
        var waterAudio = new Audio('sound effects/water.mp3');
        waterAudio.play();

        let leaf = $(this).find('.leaves');
        let topPos = parseInt($(leaf).css('top'), 10);
        console.log('topPos', topPos);
        $(leaf).css('top', (topPos - 20) + 'px');

        // they are satisfied now and their stage has increased.
        waterNeed[potIndex] = false;
        growth[potIndex]++;
        $(elem).removeClass('wiggle');

        // check if this plant has been fully grown, if so then ta-da!
        checkForSuccess(potIndex);
        // find next pot to be watered.
        if (!gameOver){
            setTimeout(function() { needsWater(findPot()) }, 1500);
        }
    }
    else { // clicked the wrong pot.
        let leaf = $(this).find('.leaves');
        $(elem).addClass('dead');
        growth[potIndex] = -1;
        waterNeed[potIndex] = false;
        $(elem).removeClass('wiggle');
    }
});


