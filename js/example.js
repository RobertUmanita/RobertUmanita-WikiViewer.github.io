var searchTerm = "";
var isOpen = 0;
var isUp = false;
var finalSearch = "";
var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
var qsDone = false;
searchResults = {
  hits: [{
    title: "",
    snip: ""
  }, {
    title: "",
    snip: ""
  }, {
    title: "",
    snip: ""
  }, {
    title: "",
    snip: ""
  }, {
    title: "",
    snip: ""
  }, {
    title: "",
    snip: ""
  }, {
    title: "",
    snip: ""
  }, {
    title: "",
    snip: ""
  }, ]
}

var getResults = function(st) {
  var request = $.ajax({
    url: "https://en.wikipedia.org/w/api.php",
    data: {
      action: 'query',
      list: 'search',
      srsearch: st,
      srlimit: '8',
      format: 'json'
    },
    method: "GET",
    dataType: "jsonp",
    headers: {
      'wikibot41085': 'password'
    }
  });
  request.done(function(msg) {
    setPage(msg);
  });
};
var disReady = function() {
  for(z=0 ;z<8 ; z+=1) {
    $("#" + z + "h").html(searchResults.hits[z].title + ":");
    $("#" + z + "p").html(searchResults.hits[z].snip + "...");
    $("." + z + "l").attr("href", "https://en.wikipedia.org/wiki/" + searchResults.hits[z].title);
    
  };
};
var dispResults = function() {
    disReady();
    $(".final").css("display", "inline");
  $(".final").css("visibility", "visible");
};

var fixSnip = function() {
  for (x=0 ; x<8; x+= 1) {
    var snip = (searchResults.hits[x].snip).replace(/\(.*?\)/g, "");
    searchResults.hits[x].snip = snip;
  };
}

var setPage = function(data) {
  for (y = 0; y < 8; y += 1) {
    searchResults.hits[y].title = data.query.search[y].title;
    searchResults.hits[y].snip = data.query.search[y].snippet;
  };
  fixSnip();
  $("#qs-one").val(searchResults.hits[0].title);
  $("#qs-two").val(searchResults.hits[1].title);
  $("#qs-three").val(searchResults.hits[2].title);
  $(".0qs").attr("href", "https://en.wikipedia.org/wiki/" + searchResults.hits[0].title);
  $(".1qs").attr("href", "https://en.wikipedia.org/wiki/" + searchResults.hits[1].title);
  $(".2qs").attr("href", "https://en.wikipedia.org/wiki/" + searchResults.hits[2].title)
}

var aniQs = function(openOrClose) {
  if (qsDone === false && openOrClose === "open" && ($(".search").val()).length > 0 && isUp === false) {
    $(".quick-search").toggleClass("qs-none");
    $(".qs-link").removeClass("displayed");
    $(".btn-qs").toggleClass("qs-visible");
    $(".btn-qs").toggleClass("animated fadeInUp").one(animationEnd, function() {
      $(".btn-qs").toggleClass("animated fadeInUp");
    })
    qsDone = true;
  }  else if (qsDone === true && openOrClose === "close") {
    $(".btn-qs").toggleClass("animated fadeOutDown").one(animationEnd, function() {
      $(".btn-qs").toggleClass("animated fadeOutDown");
    });
    $(".btn-qs").toggleClass("qs-visible");
    $(".qs-link").addClass("displayed");
    $(".quick-search").toggleClass("qs-none");
    qsDone = false;
  } else if (qsDone === true && openOrClose === "open" && ($(".search").val()).length === 0) {
    $(".btn-qs").toggleClass("animated fadeOutDown").one(animationEnd, function() {
      $(".btn-qs").toggleClass("animated fadeOutDown");
    });
    $(".btn-qs").toggleClass("qs-visible");
    $(".qs-link").addClass("displayed");
     $(".quick-search").toggleClass("qs-none");
    qsDone = false;
  } else if (qsDone === false && openOrClose === "close" && ($(".search").val()).length > 0 && isUp === false) {
    $(".quick-search").toggleClass("qs-none");
    $(".btn-qs").toggleClass("qs-visible");
    $(".btn-qs").toggleClass("animated fadeInUp").one(animationEnd, function() {
      $(".btn-qs").toggleClass("animated fadeInUp");
      });
    $(".qs-link").removeClass("displayed");
    qsDone = true;
  } 
};

$("#wiki-search").keyup(function(e) {
  if (e.which !== 13) {
    searchTerm = $(this).val();
    getResults(searchTerm);
    aniQs("open");
  }
});

$(".search").keypress(function(e) {
  if (e.which == 13) {
    searchTerm = $("#wiki-search").val();
    getResults(searchTerm);
    checkSearch();
  }
});

var aniSearchUp = function(upOrDown) {
  if (isUp === false && upOrDown === "up") {
  $(".search-random").toggleClass("sr-change-up");
  $(".btn-random").toggleClass("btn-random-ani");
  $(".btn-random").toggleClass("btn-random-up");
  $("#ran").removeClass("displayed");
  $(".btn-qs").toggleClass("qs-gone");
  $(".back-btn").toggleClass("back-btn-up");
    
  } else if (isUp === true && upOrDown === "down"){
  $(".search-random").removeClass("sr-change-up-closed sr-change-up sr-change");
  $(".search").removeClass("search-change");
  $(".btn-random").removeClass("btn-random-ani btn-random-up");
  $(".btn-random").css("visibility","visible");
  $(".btn-qs").removeClass("qs-gone");
  $(".back-btn").removeClass("back-btn-up");
    $("#pre-search").removeClass("pre-search-ani");
  $(".final").css("visibility", "hidden");
  $(".final").css("display", "none");
    $(".qs-link").addClass("displayed");
    isUp = false;
    isOpen = 0;
  }
};

var checkSearch = function() {
  var input = $(".search").val();
  if (input === "") {
    $(".search").toggleClass("animated bounce").one(animationEnd, function() {
      $(".search").toggleClass("animated bounce");
    });
  } else {
    aniSearchUp("up");
    aniQs("close");
    isUp = true;
    $(".btn-qs").toggleClass(".qs-gone");
    dispResults();
  };
}

$("#btn-search").click(function() {
  checkSearch();
});


var animate = function() {
  if (isUp === false) {
      $(".btn-random").toggleClass("btn-random-ani");
      $(".search-random").toggleClass("sr-change");
      $("#ran").toggleClass("displayed");
            } else {
              $(".btn-random").toggleClass("btn-random-up");
              $(".search-random").toggleClass("sr-change-up-closed");
              $("#ran").removeClass("displayed");
            }
  $("#pre-search").toggleClass("pre-search-ani");
  $(".search").toggleClass("search-change");
  
  aniQs("close");
};

$("html").click(function(event) {

  if (isOpen === 0 && (event.target).id === "wiki-search" || (event.target).id === "pre-search") {
    animate();
    isOpen = 1;
  } else if (isOpen === 1 && (event.target).id !== "wiki-search" && (event.target).id !== "btn-search") {
    animate();
    isOpen = 0;
    
  }
})
$(".back-btn").click(function() {
  aniSearchUp("down");
});
