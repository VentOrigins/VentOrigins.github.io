/*  =============================================================================
    
    Copyright © Vent Origins 
    By Adrian Mandee and Randy Truong
    ========================================================================== */

/*  =============================================================================
    

    @param      
    @return     none
    ========================================================================== */

/*  =============================================================================
    

    @param      
    @return     none
    ========================================================================== */
function addYoutubeToQueue(buttonClicked) {
  //Returns the size of the queue list and increments the size by 1
  var queueLength = getLocalStorageSize();  
  incrementLocalStorageSize(queueLength);

  var ytIDandTitle = $(buttonClicked).attr('id');
  var ytID = getID(ytIDandTitle);
  var ytTitle = getTitle(ytIDandTitle);

  localStorage[queueLength] = ytIDandTitle;
  $("#queues").append("<li id=li" + queueLength + "><button onclick=removeQueue(this.id) id='" + queueLength + "'> x </button><i class='fa fa-youtube'></i> <div class='queue-text'> <button onclick='queueClick(this.id)' id='" + ytID + "/|" + queueLength + "'>" + ytTitle + "</button> </div></li>");
}

/*  =============================================================================
    

    @param      
    @return     none
    ========================================================================== */
function addSoundCloudToQueue(buttonClicked) {
  //Returns the size of the queue list and increments the size by 1
  var queueLength = getLocalStorageSize();  
  incrementLocalStorageSize(queueLength);

  var scIDandTitle = $(buttonClicked).attr('id');
  var scID = getID(scIDandTitle);
  var scTitle = getTitle(scIDandTitle);

  localStorage[queueLength] = scIDandTitle;
  $("#queues").append("<li id=li" + queueLength + "><button onclick=removeQueue(this.id) id='" + queueLength + "'> x </button><i class='fa fa-soundcloud'></i> <div class='queue-text'> <button onclick='queueClick(this.id)' id='" + scID + "/|" + queueLength + "'>" + scTitle + "</button> </div></li>");
}



/*  =============================================================================
    

    @param      
    @return     none
    ========================================================================== */
function getID(idAndTitle) {
  var split = idAndTitle.indexOf("/|");
  var id = idAndTitle.substring(0,split);
  return id;
}

/*  =============================================================================
    

    @param      
    @return     none
    ========================================================================== */
function getTitle(idAndTitle) {
  var split = idAndTitle.indexOf("/|");
  var title = idAndTitle.substring(split+2,idAndTitle.length);
  return title;

}
/*  =============================================================================
    

    @param      
    @return     none
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
    

    @param      
    @return     none
    ========================================================================== */
function incrementLocalStorageSize(currentSize) {
  var intCurrentSize = parseInt(currentSize);
  var newSize = (intCurrentSize + 1).toString();
  localStorage.setItem("length", newSize);
}

/*  =============================================================================
    

    @param      
    @return     none
    ========================================================================== */
function localStorageClear() {
  $('#queues').empty();
  localStorage.clear();
}

/*  =============================================================================
    From: ventDJ.js
    Append songs at the start of website if there are any songs
    @param      
    @return     none
    ========================================================================== */
function appendSongsIntoQueue() {
  // IF the queue list is empty, don't do any appending
  if (localStorage.getItem("length") === null) {
    return;
  }

  // Incrememnts through every song to queue in the list
  for (var i = 0; i < parseInt(localStorage.getItem("length")); ++i) {
    var strI = i.toString();
    if (localStorage.getItem(strI) ===  null) {
      //If null don't add it
    }
    else {
      var id = getID(localStorage.getItem(strI));
      var title = getTitle(localStorage.getItem(strI));

      if (id.indexOf('soundcloud') == -1) {
        $("#queues").append("<li id=li" + strI + "><button onclick=removeQueue(this.id) id='" + strI + "'> x </button><i class='fa fa-youtube'></i> <div class='queue-text'> <button onclick='queueClick(this.id)' id='" + id + "/|" + strI + "'>" + title + "</button> </div></li>");
      }
      else if (id.indexOf('soundcloud') > -1) {
        $("#queues").append("<li id=li" + strI + "><button onclick=removeQueue(this.id) id='" + strI + "'> x </button><i class='fa fa-soundcloud'></i> <div class='queue-text'> <button onclick='queueClick(this.id)' id='" + id + "/|" + strI + "'>" + title + "</button> </div></li>");
      }
      else {
        // ERROR, never should get here
      }
    }
  }
}




