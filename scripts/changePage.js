/*  =============================================================================
    When navigating through the different pages

    Copyright © Vent Origins 
    By Adrian Mandee and Randy Truong
    ========================================================================== */

/*  =============================================================================
    NOTE:

		-Offset is used to start off where the page will show the tracks.
    -50 is the limit of the limit
    ========================================================================== */

/*  =============================================================================
		GLOBAL VARIABLES

		clickedPageURL		The entire page URL
		firstPartURL			-URL containing offset
		secondPartURL			-URL containing limit
		offsetNum					-Used to select the first track on that given page
		currentPage 			-Number of the current page
		========================================================================== */
var clickedPageURL = "";
var firstPartURL = "";
var secondPartURL = "";
var offsetNum = 0;
var currentPage = "";

/*  =============================================================================
		Change the page accordingly

    @param     none
    @return    none
    ========================================================================== */
function changePage(){
	//Get the URL of the api in consideration to the offset and limit
	firstPartURL = currJSON.tracks.next.substring(0, (currJSON.tracks.next.indexOf("&offset") + 8));
	offsetNum = (currentPage-1) * 20;
	secondPartURL = currJSON.tracks.next.substring(currJSON.tracks.next.indexOf("&limit="), currJSON.tracks.next.length);
	clickedPageURL = firstPartURL + offsetNum + secondPartURL;

	//Update the page number
	$(".page-number-button").val(currentPage);
	//Query the new json
	search_page(clickedPageURL);
}

/*  =============================================================================
		Change to next page

    @param     none
    @return    none
    ========================================================================== */
function nextPage() {
	currentPage = currentPage + 1;
	changePage();
}

/*  =============================================================================
		Change to previous page

    @param     none
    @return    none
    ========================================================================== */
function previousPage() {
	//If page is #1 then don't change
	if(currentPage == 1) {
		return;
	}
	currentPage = currentPage - 1;
	changePage();
}


