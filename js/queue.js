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
  var queueLength = getLocalStorageSize();  
  incrementLocalStorageSize(queueLength);
  var videoID = $(buttonClicked).attr('id');
  $("#queues").append("<li><i class='fa fa-youtube'></i> <div class='queue-text'>" + videoID + "</div></li>");
  console.log(queueLength);
}

/*  =============================================================================
    

    @param      
    @return     none
    ========================================================================== */
function addSoundCloudToQueue(buttonClicked) {
  var queueLength = getLocalStorageSize();  
  incrementLocalStorageSize(queueLength);
  var videoID = $(buttonClicked).attr('id');
  $("#queues").append("<li><i class='fa fa-soundcloud'></i> <div class='queue-text'>" + videoID + "</div></li>");
  console.log(queueLength);
}


function getLocalStorageSize() {
  if (localStorage.getItem("length") === null) {
    console.log("Is 0");
    return 0;
  }
  else {
    console.log("Not nul");
    return localStorage.getItem("length");
  }
}

function incrementLocalStorageSize(currentSize) {
  var intCurrentSize = parseInt(currentSize);
  var newSize = (intCurrentSize + 1).toString();
  console.log(newSize);
  localStorage.setItem("length", newSize);
}




