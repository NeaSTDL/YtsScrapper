(function(){
	var dom = {
				homeSearch: $('#btn-search'),
				homeLogo: $('.body-header a'),
				textSearch: $('#txt-search'),
				tabHome: $("#home_nav"),
				tabResult: $('#yts_nav'),
				contentHome: $("#home"),
				contentResult: $('#yts'),
			},
			status = {
				fetching: false
			};

	$(document).ready(function(){
		doEventBinding();
	});

	function doEventBinding(){
		dom.homeSearch.on('click', onHomeSearchClick);
		dom.homeLogo.on("click", onHomeLogoClick);
		dom.textSearch.on('keypress', onTextSearchKeypress);
	}

	function onTextSearchKeypress( event ) {
  		if ( event.which == 13 ) {
     		event.preventDefault();
			makeAllRequests();     		
  		}
  	}

	function onHomeLogoClick(){
  		dom.tabHome.tab('show');
	}

	function makeAllRequests(){
		if(status.fetching == false){
			//makeGoogleRequest();
			makeYTSRequest();
		}
	}

	function onHomeSearchClick(event){
		makeAllRequests();
	}

	function makeGoogleRequest(){
		var qstring = "?query=" + encodeURIComponent( dom.textSearch.val() ); 

		$.ajax({
			url: 'http://localhost:8080/site/google/' + qstring,
			type: 'GET',
		 	success: onMakeGoogleRequestSuccess,
		 	error: onMakeGoogleRequestError
		});
	}

	function onMakeGoogleRequestSuccess(data, status, jqxhr){
		console.log("Google Success");
	}

	function onMakeGoogleRequestError(jqxhr, status, error){
		console.log("Google Error");
	}

	function makeYTSRequest(){
		var qstring = "?query=" + encodeURIComponent( dom.textSearch.val() ); 

		$.ajax({
			url: 'http://localhost:8080/site/yts/' + qstring,
			type: 'GET',
		 	success: onMakeYTSRequestSuccess,
		 	error: onMakeYTSRequestError
		});
	}

	function onMakeYTSRequestSuccess(data, status, jqxhr){
		console.log("YTS Success");
		$(".yts-content .results-list").html(data);
		dom.tabResult.tab('show');
	}

	function onMakeYTSRequestError(jqxhr, status, error){
		console.log("YTS Error");
	}
})();
