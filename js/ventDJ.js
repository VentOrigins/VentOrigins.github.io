/*  =============================================================================
    
    Copyright © Vent Origins 
    By Adrian Mandee and Randy Truong
    ========================================================================== */

$(document).ready(function() {
  console.log("Document Ready");
  // FIrst check initial window size and adjusts sizes of divs
  checkSize();

  // Removes the current position and current playing
  localStorage.removeItem('currPlaying');
  localStorage.removeItem('currPosition');

  // Adds the songs in localStorage into the queue
  appendSongsIntoQueue();

  // Initialize side nav
  $('.button-collapse').sideNav({
    menuWidth: 300, // Default is 240
    edge: 'left', // Choose the horizontal origin
    closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
  });
});

// Whenever window sizes changes, checks the size to see if in different media sizes
$(window).resize(checkSize);

function checkSize() {
  // Sets the actual height of the queues in the queue-bar
  var divHeight = document.getElementById("queue-bar").offsetHeight - (document.getElementById("queue-logo").offsetHeight + document.getElementById("queue-buttons-all").offsetHeight);
  document.getElementById("queues").style.height = divHeight + 'px';

  // When screen is smaller than 992 pixels, this would move all the divs to the 0 position
  if ($(window).width() < 992) {
    // Moves the divs to the very left when theres no queue-bar
    document.getElementById("nav-bar").style.left = '0px';
    document.getElementById("splash-screen").style.left = '0px';
    document.getElementById("page-footer-id").style.left = '0px';
    document.getElementById("soundCloudPlayer").style.left = '0px';
    document.getElementById("youTubePlayer").style.left = '0px';

    // Adds the queue bar width to the divs
    document.getElementById("nav-bar").style.width = $(window).width() + 'px';
    document.getElementById("splash-screen").style.width = $(window).width() + 'px';
    document.getElementById("page-footer-id").style.width = $(window).width() + 'px';
    document.getElementById("soundCloudPlayer").style.width = $(window).width() + 'px';
    document.getElementById("youTubePlayer").style.width = $(window).width() + 'px';
  }

  // When screen is big, starts the div after the queue-bar
  else {
    // Offsets the divs to show right after the queue-bar
    document.getElementById("nav-bar").style.left = document.getElementById('queue-bar').offsetWidth + 'px';
    document.getElementById("splash-screen").style.left = document.getElementById('queue-bar').offsetWidth + 'px';
    document.getElementById("page-footer-id").style.left = document.getElementById('queue-bar').offsetWidth + 'px';
    document.getElementById("youTubePlayer").style.left = document.getElementById('queue-bar').offsetWidth + 'px';
    document.getElementById("soundCloudPlayer").style.left = document.getElementById('queue-bar').offsetWidth + 'px';
    
    // Sets the width of each div to be the non queue-bar width
    var divWidth = $(window).width() - document.getElementById('queue-bar').offsetWidth;
    document.getElementById("nav-bar").style.width = divWidth + 'px';
    document.getElementById("splash-screen").style.width = divWidth + 'px';
    document.getElementById("page-footer-id").style.width = divWidth + 'px';
    document.getElementById("youTubePlayer").style.width = divWidth + 'px';
    document.getElementById("soundCloudPlayer").style.width = divWidth + 'px';
  }

  // Set the height of the players    
  var splashScreenHeight = $(window).height() - 70;
  document.getElementById("youTubePlayer").style.height = splashScreenHeight + 'px';
  document.getElementById("splash-screen").style.height = splashScreenHeight + 'px';
}



