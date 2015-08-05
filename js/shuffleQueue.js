 /*  =============================================================================
    

    @param      
    @return     none
    ========================================================================== */
function shuffleQueue() {
  //Check if array at end if it is then shuffle new queue
  console.log('Shuffle_position: ' + shuffle_position)
  if( (shuffle_array.length) >= shuffle_position) {
    if(loop == true) {
      shuffleAllQueue();
    }
    else {
      closeAllVideo();
      shuffleAllQueue();
      $("#ppQueue").empty();
      $("#ppQueue").append("<button onclick='playQueue(0)'><i class='fa fa-play'></i></button>");
      return;
    }
  }
  var newPosition;

  do {
    console.log('SHUFFLE_POSITION: ' + shuffle_position);
    newPosition = shuffle_array[shuffle_position];
    console.log('NEWPOSITION: ' + newPosition);

    //Error checking
    if( (shuffle_array.length) >= shuffle_position && loop == true && checkShuffleQueueNotNull()) {
      shuffleAllQueue();
      newPosition = shuffle_array[shuffle_position];
    }
    else if((shuffle_array.length) >= shuffle_position) {
      console.log("SHUFFLE ENDED LOOP SHOULD BE FALSE");
      shuffleAllQueue();
      closeAllVideo();
      $("#ppQueue").empty();
      $("#ppQueue").append("<button onclick='playQueue(0)'><i class='fa fa-play'></i></button>");
      return;
    }
      

    ++shuffle_position;
  }
  while (localStorage.getItem(newPosition.toString()) == null);
  playQueue(newPosition);
}


 /*  =============================================================================
    

    @param      
    @return     none
    ========================================================================== */
function prevShuffleQueue() {
  //Check if array at end if it is then shuffle new queue
  console.log('Shuffle_position: ' + shuffle_position)
  if(shuffle_position < 0) {
    if(loop == true) {
      shuffleAllQueue();
    }
    else {
      closeAllVideo();
      shuffleAllQueue();
      $("#ppQueue").empty();
      $("#ppQueue").append("<button onclick='playQueue(0)'><i class='fa fa-play'></i></button>");
      return;
    }
  }
  var newPosition;

  do {
    console.log('SHUFFLE_POSITION: ' + shuffle_position);
    newPosition = shuffle_array[shuffle_position];
    console.log('NEWPOSITION: ' + newPosition);

    //Error checking
    if(shuffle_position < 0 && loop == true && checkShuffleQueueNotNull()) {
      shuffleAllQueue();
      shuffle_position = shuffle_array.length - 1;
      newPosition = shuffle_array[shuffle_position];
    }
    else if(shuffle_position < 0) {
      console.log("SHUFFLE ENDED LOOP SHOULD BE FALSE");
      shuffleAllQueue();
      closeAllVideo();
      $("#ppQueue").empty();
      $("#ppQueue").append("<button onclick='playQueue(0)'><i class='fa fa-play'></i></button>");
      return;
    }
      

    --shuffle_position;
  }
  while (localStorage.getItem(newPosition.toString()) == null);
  playQueue(newPosition);
}


function checkShuffleQueueNotNull() {
  for(var i = 0; i < shuffle_array.length; i++) {
    if(localStorage.getItem(shuffle_array[i].toString()) != null)
      return true;
  }
  return false;
}

function shuffleAllQueue() {

  shuffle_array = [];
  shuffle_position = 0;
  var qLength = parseInt(localStorage.getItem('length'));
  for(var i=0; i<qLength; i++) {
    var newPosition = Math.floor((Math.random() * qLength));
    while(shuffle_array.indexOf(newPosition) >= 0) {
      newPosition = Math.floor((Math.random() * qLength));
    }
    shuffle_array.push(newPosition);
  }
  for (var i = 0; i < shuffle_array.length; ++i) {
    console.log('i' + shuffle_array[i]);
  }

}
/*  =============================================================================
    

    @param      
    @return     none
    ========================================================================== */
function toggleShuffle() {
  if(shuffle == true) {
    $('#shuffleButton').css('background-color','#FFFFFF');
    shuffle = false;
  }
  else {
    shuffle_array = [];
    shuffle_position = 0;
    shuffleAllQueue();
    $('#shuffleButton').css('background-color','#71B500');
    if (localStorage.getItem("currPosition") != null) {
      shuffle_array = [parseInt(localStorage.getItem('currPosition'))]
    }
    shuffle = true;
  }

}
