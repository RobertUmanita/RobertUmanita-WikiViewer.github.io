$(document).ready(function() {

  $("#wikiSearch").keypress(function(event) {
    if (event.keyCode == 13) {

      //new search clears the one before
      $('a.entry').remove();
      //--------------------------------

      $.getJSON("https://en.wikipedia.org/w/api.php?action=opensearch&datatype=json&limit=10&search=" + document.getElementById("wikiSearch").value + "&callback=?", function(data) {
        //create divs with search queries in a loop
        for (var i = 0; i < data[1].length; i++)
          $("html").append("<a class='entry' target='_blank' href="+data[3][i]+"><h2>" + data[1][i] + "</h2><p>" + data[2][i] + "</p></a>");
        //-----------------------------------------
        
        //animate div when mousing over it
        $(".entry").mouseenter(function() {
          $(this).animate({
            left: '10px'
          },"slow");
        });
        $(".entry").mouseleave(function() {
          $(this).animate({
            left: '0px'
          },"slow");
        });
        //--------------------------------
        
      });
    }
  });

});