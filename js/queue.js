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
  var split = getIndexOfSplit(buttonClicked);
  var ytID = ytIDandTitle.substring(0,split);
  var ytTitle = ytIDandTitle.substring(split+2,ytIDandTitle.length);

  localStorage[queueLength] = ytID;
  $("#queues").append("<li><i class='fa fa-youtube'></i> <div class='queue-text'>" + queueLength + ytID + "/" +  scTitle + "</div></li>");
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
  var split = getIndexOfSplit(buttonClicked);
  var scID = scIDandTitle.substring(0,split);
  var scTitle = scIDandTitle.substring(split+2,scIDandTitle.length);

  localStorage[queueLength] = scID;
  $("#queues").append("<li><i class='fa fa-soundcloud'></i> <div class='queue-text'>" + queueLength + scID + "/" +  scTitle + "</div></li>");
}

function getIndexOfSplit(buttonClicked) {
  var idAndTitle = $(buttonClicked).attr('id');
  var split = idAndTitle.indexOf("/|");
  return split;
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




