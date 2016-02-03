/*  =============================================================================
    
    Copyright © Vent Origins 
    By Adrian Mandee and Randy Truong
    ========================================================================== */

/*  =============================================================================
    The cool thing about each video/soundcloud is that they each have their own
    unique ID's, with the first half being the ID of the media, and the 2nd part
    being the actual title of the media. Both parts are separated by a '/|' and 
    finally, they are locally stored using the localStorage functions. The Soundcloud
    ID contains the actual URL, while youtube just have random texts for their ID.

    For the actual queue, each row's ID contains the index of the song in retrospect
    to the localStorage. So a localStorage would have indeces as their keys, ie: 0, 1, 2, and so on.
    To remove a song, the user clicks the X, which would be the index of the song int he localStorage.
    So the user might remove a song in index 2, which would leave 0, 1, 3, and so on into the queue.
    Old indeces currently would not be replaced.
    ========================================================================== */

/*  =============================================================================
    When the button is clicked from the youtube row on the overlay, calls this function

    @param      id of the button clicked, which is the id for the local storage
    @return     none
    ========================================================================== */
function addYoutubeToQueue(buttonClicked) {
  //Returns the size of the queue list and increments the size by 1
  var queueLength = getLocalStorageSize();  
  incrementLocalStorageSize(queueLength);

  var ytIDandTitle = $(buttonClicked).attr('id');
  var ytID = getID(ytIDandTitle);
  var ytTitle = getTitle(ytIDandTitle);

  if(shuffle == true) {
    shuffle_array.push(parseInt(queueLength));
  }
  // Creates a key which is the index of the video in the queue
  localStorage[queueLength] = ytIDandTitle;
  // Adds the video to the queue
  $("#queues").append("<li id='li" + queueLength + "'> <div class='remove-queue-button'> <button onclick=removeQueue(this.id) id='" + queueLength + "'> x </button> </div> <i class='fa fa-youtube'></i> <div class='queue-text'> <button onclick='queueClick(this.id)' id='" + ytID + "/|" + queueLength + "'>" + ytTitle + "</button> </div> </li>");
}

/*  =============================================================================
    When the button is clicked from the soundcloud row on the overlay, calls this function

    @param      id of the button clicked, which is the id for the local storage
    @return     none
    ========================================================================== */
function addSoundCloudToQueue(buttonClicked) {
  //Returns the size of the queue list and increments the size by 1
  var queueLength = getLocalStorageSize();  
  incrementLocalStorageSize(queueLength);

  var scIDandTitle = $(buttonClicked).attr('id');
  var scID = getID(scIDandTitle);
  var scTitle = getTitle(scIDandTitle);
  
  if(shuffle == true) {
    shuffle_array.push(parseInt(queueLength));
  }
  // Creates a key which is the index of the song in the queue
  localStorage[queueLength] = scIDandTitle;
  // Adds the song to the queue
  $("#queues").append("<li id='li" + queueLength + "'> <div class='remove-queue-button'> <button onclick=removeQueue(this.id) id='" + queueLength + "'> x </button> </div> <i class='fa fa-soundcloud'></i> <div class='queue-text'> <button onclick='queueClick(this.id)' id='" + scID + "/|" + queueLength + "'>" + scTitle + "</button> </div></li>");
}

/*  =============================================================================
    Parses the idAndTitle to return the ID

    @param      the idAndTitle with the middle being the '/|' characters
    @return     ID
    ========================================================================== */
function getID(idAndTitle) {
  var split = idAndTitle.indexOf("/|");
  var id = idAndTitle.substring(0,split);
  return id;
}

/*  =============================================================================
    Parses the idAndTitle to return the title

    @param      the idAndTitle with the middle being the '/|' characters
    @return     Title
    ========================================================================== */
function getTitle(idAndTitle) {
  var split = idAndTitle.indexOf("/|");
  var title = idAndTitle.substring(split+2,idAndTitle.length);
  return title;
}

/*  =============================================================================
    Returns the length of the songs in the list

    @param      none
    @return     length of the songs in the list
    ========================================================================== */
function getLocalStorageSize() {
  if (localStorage.getItem("length") === null) {
    return "0";
  }
  else {
    return localStorage.getItem("length");
  }
}
/*  =============================================================================
    Increments the storage size by 1

    @param      
    @return     none
    ========================================================================== */
function incrementLocalStorageSize(currentSize) {
  var intCurrentSize = parseInt(currentSize);
  var newSize = (intCurrentSize + 1).toString();
  localStorage.setItem("length", newSize);
}

/*  =============================================================================
    Clears the local storage and resets to default no songs in queue list state

    @param      none
    @return     none
    ========================================================================== */
function localStorageClear() {
  $('#queues').empty();
  localStorage.clear();
  closeAllVideo();
  pauseQueue();
  insertSplashSearchBar();
}

/*  =============================================================================
    From: ventDJ.js
    Append songs at the start of website if there are any songs
    
    @param      none
    @return     none
    ========================================================================== */
function appendSongsIntoQueue() {
  // IF the queue list is empty, don't do any appending
  if (localStorage.getItem("length") === null) {
    return;
  }

  // Incrememnts through every song to queue in the list
  for (var i = 0; i < parseInt(localStorage.getItem("length")); ++i) {
    // Acquires each index and checks the key values in the local storage. The key values corresponding to each index returns the idAndTitle of the youtube/soundcloud.
    var strI = i.toString();

    // If the song is null, don't add it
    if (localStorage.getItem(strI) ===  null) {
      // Empty
    }
    // If the song exists
    else {
      var id = getID(localStorage.getItem(strI));
      var title = getTitle(localStorage.getItem(strI));

      // If the ID is a youtube ID, appends the Youtube video into the queue
      // Reason why we check index for 'soundcloud' is because the soundcloud ID's have the actual soundcloud URL, while for youtube it just contains random text as their ID's
      if (id.indexOf('soundcloud') == -1) {
        $("#queues").append("<li id='li" + strI + "'> <div class='remove-queue-button'> <button onclick=removeQueue(this.id) id='" + strI + "'> x </button> </div> <i class='fa fa-youtube'></i> <div class='queue-text'> <button onclick='queueClick(this.id)' id='" + id + "/|" + strI + "'>" + title + "</button> </div></li>");
      }
      // If the ID is a soundcloud ID, appends the Soundcloud music into the queue
      else if (id.indexOf('soundcloud') > -1) {
        $("#queues").append("<li id='li" + strI + "'> <div class='remove-queue-button'> <button onclick=removeQueue(this.id) id='" + strI + "'> x </button> </div> <i class='fa fa-soundcloud'></i> <div class='queue-text'> <button onclick='queueClick(this.id)' id='" + id + "/|" + strI + "'>" + title + "</button> </div></li>");
      }
      else {
        // ERROR, never should get here
      }
    }
  }
}

/*  =============================================================================
    Removes the song in the queue list with the id (which is the position) of the song

    @param      Index of the song
    @return     none
    ========================================================================== */
function removeQueue(position) {
  var pos = position.toString();
  $("#li"+pos).remove();
  localStorage.removeItem(pos);
  if($.trim($("#queues").text()).length == 0) {
    localStorageClear();
    return;
  }

  // Plays the next song if the song currently playing is removed from the queue
  if(localStorage.getItem('currPosition') == pos) {
    nextQueue();
  }
}






