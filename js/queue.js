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

  localStorage[queueLength] = ytID;
  $("#queues").append("<li><i class='fa fa-youtube'></i> <div class='queue-text'>" + queueLength + ytID + "/" +  ytTitle + "</div></li>");
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

  localStorage[queueLength] = scID;
  $("#queues").append("<li><i class='fa fa-soundcloud'></i> <div class='queue-text'>" + queueLength + scID + "/" +  scTitle + "</div></li>");
}

function getID(idAndTitle) {
  var split = idAndTitle.indexOf("/|");
  var id = idAndTitle.substring(0,split);
  return id;
}

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
  localStorage.clear();
}




