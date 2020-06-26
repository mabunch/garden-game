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

    // this is important for if they press start after a game just ended to reset the filters.
    for (let i=0; i<4; i++){
        elem1 = '.pot-' + i + ".leaves";
        elem2 = '.box.pot.pot-' + i;
        $(elem1).removeClass('success');
        $(elem2).removeClass('success');
        $(elem2).removeClass('dead');
    }
    needsWater(findPot());
});

// find a random plant out of the 4 that needs water. Makes sure to select a plant that is 
// not already dead and has not already achieved the max level. 
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

// evaluates the stages of all of the pots to determine if the game is over. 
function checkGameOver(){
    let num_max = 0;
    let num_died = 0;
    let num_growing = 0;
    for (let i=0; i<4; i++){
        if (growth[i] === max_level){
            num_max++;
        }
        else if (growth[i] === -1){
            num_died++;
        }
        else{
            num_growing++;
        }
    }
    if ((num_max + num_died) === 4){
        promptGameOver(num_max);
    }
}

// when the game is over, this functions alerts the user. 
function promptGameOver(num_plants){
    if (num_plants === 4){
        console.log("Wow! You did great. You are definitely ready for your own, real life house plants!");
    }
    else if (num_plants === 3){
        console.log("You are almost ready for your own plants. Sometimes you don't pay the closest attention, but you are trying your best!");
    }
    else if (num_plants === 2){
        console.log("You should pay a bit closer attention to your plants!");
    }
    else {
        console.log("You are probably NOT ready for your own house plants. ");
    }
    gameOver = true;
}

// adds effect when a plant needs water. 
function needsWater(plantIndex){
    console.log("pot " + plantIndex + " needs water!");
    elem = '.box.pot.pot-' + plantIndex;
    $(elem).addClass('wiggle');
    waterNeed[plantIndex] = true;
}

// determines if a plant as successfully achieved the max-level. if so, it will
// get brighter and there is a sound effect. 
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

// the game heavily revolves around responding to the user's clicks. 
$('.pot').click(function() {

    checkGameOver();
    console.log('clicked a pot');
    // did it need water? if so, grow upon click.  
    let idSplit = $(this).attr('id').split('.'); 
    let potIndex = idSplit[idSplit.length-1];
    elem = '.box.pot.pot-' + potIndex;
    console.log("pot clicked: " + potIndex);
    // console.log("needs water? " + waterNeed[potIndex]);

    // they have clicked the correct plant that needed water
    if (waterNeed[potIndex] && !gameOver){
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
    else if (!gameOver) { // clicked the wrong pot.
        let leaf = $(this).find('.leaves');
        if (growth[potIndex] != max_level){
            $(elem).addClass('dead');
            growth[potIndex] = -1;
        }
        waterNeed[potIndex] = false;
        $(elem).removeClass('wiggle');
    }
});


