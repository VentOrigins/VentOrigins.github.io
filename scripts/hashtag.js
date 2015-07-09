/*  =============================================================================
    When clicking hashtags

    Copyright © Vent Origins 
    By Adrian Mandee and Randy Truong
    ========================================================================== */


function showTracks(hashTag) {
	//Get value and remove hashtag to look up in db
	var num = hashTag.id.substring(9,hashTag.id.length);
	var hashTagValue = $("#ht-button"+num).text().substring(1,$("#ht-button"+num).text().length).toLowerCase();
	console.log(hashTagValue);

	hashTagDB.equalTo("hashtags", hashTagValue);
	hashTagDB.equalTo("user", localStorage.userID);
	hashTagDB.find({
	  success: function(results) {
	    alert("Successfully retrieved " + results.length + " scores.");
	    //Check if there is only one of that track
	    if(results.length > 1) {
	    	alert("Error more than one hashtag object of that #");
	    }
	    //Add add track to the ht
	    else {
	    	console.log(results);
				var tracksOfHT = results[0].get("tracks");
				console.log(tracksOfHT);	    	
	    }
	  },
  	error: function(error) {
  		//Error, hashtag should exist but doesnt.
  		alert("Error in show tracks, hash should exist");
 			return;
  	}
	});

}