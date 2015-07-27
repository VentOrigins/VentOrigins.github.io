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
    return 0;
  }
  else {
    return localStorage.getItem("length");
  }
}

function incrementLocalStorageSize(currentSize) {
  var newSize = currentSize++;
  localStorage.setItem("length", newSize);
  console.log("newSize" + newSize);
}




