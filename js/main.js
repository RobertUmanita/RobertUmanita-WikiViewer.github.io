$(document).ready(function() {
	

	$('#searchyBox').val('');
	var sfield = "";
	var wikiSearch = function(st) {
		 $.getJSON("https://en.wikipedia.org/w/api.php?action=opensearch&datatype=json&limit=15&search=" + st + "&callback=?", function(data) {
					console.log(data);
					$('#searchy').fadeOut();
					var j = 0;
					for (var i =0; i < data[1].length; i++) {
						if (j == 0){
							$("html").append("<div class='container'><div class='row'>");
							$("html").append("<div class='col-sm-4 cob'><a class='entry' target='_blank' href="+data[3][i]+"><h2 class='text-center'>" + data[1][i] + "</h2><p>" + data[2][i] + "</p></a></div>");							
							j = 4;
						}
						else if (j == 4) {
							$("html").append("<div class='col-sm-4 cob'><a class='entry' target='_blank' href="+data[3][i]+"><h2 class='text-center'>" + data[1][i] + "</h2><p>" + data[2][i] + "</p></a></div>");
							j = 8;
						}
						else {
							$("html").append("<div class='col-sm-4 cob'><a class='entry' target='_blank' href="+data[3][i]+"><h2 class='text-center'>" + data[1][i] + "</h2><p>" + data[2][i] + "</p></a></div>");
							$("html").append("</div></div>");
							j = 0;
						}
					}
				$(".cob").mouseenter(function() {
          $(this).animate({
            bottom: '10px'
          },"slow");
        });
        $(".cob").mouseleave(function() {
          $(this).animate({
            bottom: '0px'
          },"slow");
        });
				}
	)};
	
	

	$("#searchyBox").keypress(function(event) {
    if (event.keyCode == 13) {

      //new search clears the one before
      $('.col-sm-4').remove();
      //--------------------------------

      sfield = document.getElementById("searchyBox").value;
      wikiSearch(sfield);      
      }

	});

	$('#newSearch').click(function() {  //Brings back search panel
		$('#searchy').fadeIn();

	});

	$('#randomSearch').click(function() {  //Random search based off first three letters being random
		$('#searchy').fadeOut();
		$('.col-sm-4').remove();
		var letterA = String.fromCharCode(97 + Math.floor(Math.random() * 26));
		var letterB = String.fromCharCode(97 + Math.floor(Math.random() * 26));
		var letterC = String.fromCharCode(97 + Math.floor(Math.random() * 26));
		sfield = letterA + letterB + letterC;

		wikiSearch(sfield);

	});

	

});

  
/*

  function doIt() { 
    var output = $.getJSON("https://en.wikipedia.org/w/api.php?action=opensearch&datatype=jsonp&limit=10&search=mushroom&callback=?")
    console.log(output);
    var jkd = output[3][1];
    console.log(jkd);
};

*/