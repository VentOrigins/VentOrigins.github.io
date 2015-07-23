/*  =============================================================================
    
    Copyright © Vent Origins 
    By Adrian Mandee and Randy Truong
    ========================================================================== */

$(document).ready(function() {
  console.log("Document Ready");
  // FIrst check initial window size and adjusts sizes of divs
  checkSize();

  // Initialize side nav
  $('.button-collapse').sideNav({
    menuWidth: 400, // Default is 240
    edge: 'left', // Choose the horizontal origin
    closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
  });
});

// Whenever window sizes changes, checks the size to see if in different media sizes
$(window).resize(checkSize);

function checkSize() {
  // When screen is smaller than 992 pixels, this would move all the divs to the 0 position
  if ($(window).width() < 992) {
    // Moves the divs to the very left when theres no queue-bar
    document.getElementById("nav-bar").style.left = '0px';
    document.getElementById("splash-screen").style.left = '0px';
    document.getElementById("page-footer-id").style.left = '0px';

    // Adds the queue bar width to the divs
    document.getElementById("nav-bar").style.width = $(window).width() + 'px';;
    document.getElementById("splash-screen").style.width = $(window).width() + 'px';
    document.getElementById("page-footer-id").style.width = $(window).width() + 'px';
  }

  // When screen is big, starts the div after the queue-bar
  else {
    // Offsets the divs to show right after the queue-bar
    document.getElementById("nav-bar").style.left = document.getElementById('queue-bar').offsetWidth + 'px';
    document.getElementById("splash-screen").style.left = document.getElementById('queue-bar').offsetWidth + 'px';
    document.getElementById("page-footer-id").style.left = document.getElementById('queue-bar').offsetWidth + 'px';

    // Sets the width of each div to be the non queue-bar width
    var divWidth = $(window).width() - document.getElementById('queue-bar').offsetWidth;
    document.getElementById("nav-bar").style.width = divWidth + 'px';
    document.getElementById("splash-screen").style.width = divWidth + 'px';
    document.getElementById("page-footer-id").style.width = divWidth + 'px';
  }
}



