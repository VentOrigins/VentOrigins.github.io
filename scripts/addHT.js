/*  =============================================================================
    When opening up the HashTags and submitting them

    Copyright © Vent Origins 
    By Adrian Mandee and Randy Truong
    ========================================================================== */

var g_buttonID ="";
var previousButton ="";
/*  =============================================================================
    When the add hash tag button is clicked, do this function

    @param     buttonID   The button's ID corresponding to the row clicked
    @return    none
    ========================================================================== */
function addHT(buttonID) {
  //Takes the id of the button clicked
  g_buttonID = buttonID;
  var num = buttonID.id.substring(10,buttonID.id.length);
  $("#add-button"+ num).attr("disabled", "disabled");
  animateSubmitButton(num);
  //Sets the row in line 
  document.getElementById("slide-input" + num).style.display = "inline-block";
  setTimeout(
    function() {
      $("#add-button"+ num).attr("disabled", "");
    }, 400
  );
  
  
};

/*  =============================================================================
    When submitting a hashtag, adds it to the hashmap and append

    @param     submitID   The button's ID corresponding to the row clicked
    @return    none
    ========================================================================== */
function submitHT(submitID) {
  //Takes the id of the button clicked
  var num = submitID.id.substring(9,submitID.id.length);
  var HTvalue = "";

  var lengthOfMapHT = 0;
  event.preventDefault();
  
  //Removes nonalphanumerical from ht
  HTvalue = $("#input-ht"+num).val().replace(/[\W_]+/g,"");

  //Checks the hashTag

  lengthOfMapHT = $("#hash-tag-id"+num).find(':button').length+1;
  var trackName = $("#trackName" + num).text();
  var href = $("#link"+ num).attr('href');
  console.log("trackName:" + trackName);
  console.log("HREF:" + href);
  checkTrackHT(trackName, HTvalue, href);
  findPlaylistID(href, HTvalue);
  //If it already exist, do not append it
  if(lengthOfMapHT == -1) {
    console.log("Hashtag " +  HTvalue + " already exists for this track.");
  }
  //If hashTag is a new hashTag, appends the hashTag
  else {
    console.log("Hashtag " +  HTvalue + " is added to the database");
    $("#hash-tag-id"+num).append("<button class='class-ht-button' id='ht-button" + num + 'r' + lengthOfMapHT + "' onclick='showTracks(this)'>" + "#" + HTvalue + "</button>");      
  }     

  //animates the input-bar to close
  $("#slide-input" + num + " .input-add-HT").val("");
  animateSubmitButton(num);
}

/*  =============================================================================
    Animates the entire class-input-bar, which includes the input bar and 
    submitHT button. Opens them up when the + sign is clicked. Also closes it
    when the - sign is clicked when opened. Finally, the bar closes after
    a hashtag is inputted from the addHT button

    @param     num      The num is the row that input bar was clicked.
    @return    none
    ========================================================================== */
function animateSubmitButton(num)
{
  if(previousButton != "") {
    if (document.getElementById("add-button" + previousButton).innerHTML == "<h1>-</h1>") {
      $("#slide-input" + previousButton + " .input-add-HT").animate({width: 'toggle'},200);
      $("#slide-input" + previousButton + " .button-add-HT").animate({opacity: 'toggle'},200);
      document.getElementById("add-button" + previousButton).innerHTML = "<h1>+</h1>";
    }
    else if(previousButton == num){
      $("#slide-input" + previousButton + " .input-add-HT").animate({width: 'toggle'},200);
      $("#slide-input" + previousButton + " .button-add-HT").animate({opacity: 'toggle'}, 200);
      document.getElementById("add-button" + previousButton).innerHTML = "<h1>-</h1>";
    }
  }
  //Slide the input bar and button to the right of the row clicked
  if(previousButton != num) {
    $("#slide-input" + num + " .input-add-HT").animate({width: 'toggle'}, 200);
    $("#slide-input" + num + " .button-add-HT").animate({opacity: 'toggle'}, 200);
    
    //Toggles the + and - of the add hashtag button
    if (document.getElementById(g_buttonID.id).innerHTML == "<h1>-</h1>") {
      document.getElementById(g_buttonID.id).innerHTML = "<h1>+</h1>";
    }
    else {
      document.getElementById(g_buttonID.id).innerHTML = "<h1>-</h1>";
    }
  }
  previousButton = num;
  
}

