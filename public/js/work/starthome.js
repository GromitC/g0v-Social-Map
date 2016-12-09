starthome=function(){
	$('#map').height($('#map').width()*0.47);
	$('#mapPanel').height($('#map').width()*0.5);
	$('#twitterPanel').height($('#map').width()*0.5);
	$('#twitterTable').height($('#map').width()*0.5);

	createMap('map');

	//console.log($('#mySidenavbtn').width())
	$('span#mySidenavbtn').click(function(){
		//console.log($('#mySidenavbtn').width())
		if ($('#mySidenavbtn').width()===0)
			$("#mySidenavbtn").width(250);
		else{
			$("#mySidenavbtn").width(0);
		}
	})
	$('a#mySidenavclosebtn').click(function(){
		$("#mySidenavbtn").width(0);
	})
    
    

}
