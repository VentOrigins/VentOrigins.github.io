/*  =============================================================================
    
    Copyright © Vent Origins 
    By Adrian Mandee and Randy Truong
    ========================================================================== */

/*  =============================================================================
    Checks all of the shuffle queue and ensures everything is going as planned.

    @param      none
    @return     none
    ========================================================================== */
function shuffleQueue() {
  // Check if array at end if it is then shuffle new queue
  if((shuffle_array.length) <= shuffle_position) {
    // If at the end of the shuffle queue and the loop is on, reshuffles the queue with a shuffled list and plays it
    if(loop == true) {
      shuffleAllQueue();
    }
    // If at the end of the shuffle queue, ends the player
    else {
      closeAllVideo();
      shuffleAllQueue();
      $("#ppQueue").empty();
      $("#ppQueue").append("<button onclick='playQueue(0)'><i class='fa fa-play'></i></button>");
      return;
    }
  }
  
  // Continues the next song in suffle queue
  var newPosition;
  do {
    newPosition = shuffle_array[shuffle_position];

    //Error checking, reshuffles the queue
    if( (shuffle_array.length) <= shuffle_position && loop == true && checkShuffleQueueNotNull()) {
      shuffleAllQueue();
      newPosition = shuffle_array[shuffle_position];
    }
    // If at the end of the shuffle queue, ends the player
    else if((shuffle_array.length) <= shuffle_position) {
      shuffleAllQueue();
      closeAllVideo();
      $("#ppQueue").empty();
      $("#ppQueue").append("<button onclick='playQueue(0)'><i class='fa fa-play'></i></button>");
      return;
    }
    ++shuffle_position;
  }
  while (localStorage.getItem(newPosition.toString()) == null);

  // Plays the next song with the shuffled position
  playQueue(newPosition);
}

/*  =============================================================================
    Same as the shuffle queue, but gets called when the previous button is clicked

    @param      none
    @return     none
    ========================================================================== */
function prevShuffleQueue() {
  //Check if array at end if it is then shuffle new queue
  if(shuffle_position < 0) {
    if(loop == true) {
      shuffleAllQueue();
      shuffle_position = shuffle_array.length - 1;
    }
    // If at the end of the shuffle queue, ends the player
    else {
      closeAllVideo();
      shuffleAllQueue();
      $("#ppQueue").empty();
      $("#ppQueue").append("<button onclick='playQueue(0)'><i class='fa fa-play'></i></button>");
      return;
    }
  }

  // Continues the next song in suffle queue
  var newPosition;
  do {
    newPosition = shuffle_array[shuffle_position];

    //Error checking, reshuffles the queue
    if(shuffle_position < 0 && loop == true && checkShuffleQueueNotNull()) {
      shuffleAllQueue();
      shuffle_position = shuffle_array.length - 1;
      newPosition = shuffle_array[shuffle_position];
    }
    // If at the end of the shuffle queue, ends the player
    else if(shuffle_position < 0) {
      shuffleAllQueue();
      closeAllVideo();
      $("#ppQueue").empty();
      $("#ppQueue").append("<button onclick='playQueue(0)'><i class='fa fa-play'></i></button>");
      return;
    }
    --shuffle_position;
  }
  while (localStorage.getItem(newPosition.toString()) == null);

  // Plays the next song with the shuffled position
  playQueue(newPosition);
}

/*  =============================================================================
    Checks to see if all elements in the shuffled queue is not null, true if none are null,
    false if there is a null

    @param      none
    @return     bool    If shuffled queue has any nulls
    ========================================================================== */
function checkShuffleQueueNotNull() {
  for(var i = 0; i < shuffle_array.length; i++) {
    if(localStorage.getItem(shuffle_array[i].toString()) != null)
      return true;
  }
  return false;
}

/*  =============================================================================
    Shuffles the shuffle queue

    @param      none
    @return     none
    ========================================================================== */
function shuffleAllQueue() {
  // Resets the variables
  shuffle_array = [];
  shuffle_position = 0;
  var qLength = parseInt(localStorage.getItem('length'));
  // Appends every position within the sguffle queue randomly
  for (var i = 0; i < qLength; i++) {
    var newPosition = Math.floor((Math.random() * qLength));
    while(shuffle_array.indexOf(newPosition) >= 0) {
      newPosition = Math.floor((Math.random() * qLength));
    }
    shuffle_array.push(newPosition);
  }
}

/*  =============================================================================
    When the shuffle button is clicked on, toggles shuffle, initializing all of the shuffling variables.
    If shuffle turns off, sets the shuffle to false

    @param      none
    @return     none
    ========================================================================== */
function toggleShuffle() {
  // Turns off shuffle
  if(shuffle == true) {
    $('#shuffleButton').css('background-color','#FFFFFF');
    shuffle = false;
  }
  // Initializes the shuffle queue and position
  else {
    shuffleAllQueue();
    $('#shuffleButton').css('background-color','#71B500');
    // Sets the position of the current song to play for the shuffle
    if (localStorage.getItem("currPosition") != null) {
      shuffle_array = [parseInt(localStorage.getItem('currPosition'))]
    }
    shuffle = true;
  }

}
