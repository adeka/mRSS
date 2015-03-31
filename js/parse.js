/**
 * Nikita Filatov
 */

var results = [];
var feeds = [];

google.load("feeds", "1");

/*
 function article() {

 }
 */

function cb(data) {
    //console.log(data);
}

$(document).on('click', "#worldnews", function () {
    $(".column").empty();
    var feed = "http://www.reddit.com/r/worldnews/.rss";
    repop(feed);
});
$(document).on('click', "#technology", function () {
    $(".column").empty();
    var feed = "http://www.reddit.com/r/technology/.rss";
    repop(feed);
});
$(document).on('click', "#science", function () {
    $(".column").empty();
    var feed = "http://www.reddit.com/r/science/.rss";
    repop(feed);
});
$(document).on('click', "#pics", function () {
    $(".column").empty();
    var feed = "http://www.reddit.com/r/pics/.rss";
    repop(feed);
});
$(document).on('click', "#writing", function () {
    $(".column").empty();
    var feed = "http://www.reddit.com/r/writing/.rss";
    repop(feed);
});

$(document).on('click', "#close", function () {
        $("#panel").empty();
        $("#panel").css("display", "none");
        $(".column").css("display", "block");
        $("#close").css("color" , "#444");
        $(".loading").css("display", "none");


});

$(document).on('click', "#pickFeeds", function () {
    $("#feeds").css("display", "initial");
    $("#pickFeeds").css("color", "#444");
    $("#showFeeds").css("color", "#FFF");

});
$(document).on('click', "#showFeeds", function () {
  $("#feeds").css("display", "none");
  $("#showFeeds").css("color", "#444");
  $("#pickFeeds").css("color", "#FFF");


});

$(document).on('click', ".entry", function () {
    //console.log($(this).data('open'));

    //if ($(this).data('open') == false) {
      $(".loading").css("display", "initial");

        // console.log("ASdF");
        // $(".story").css("height", "0px");
        // $(".story").css("padding", "0px");
        var link = $(this).data('link');
        $(this).data('open', true);

        //console.log(link);
        //$(this).closest('.article').children('.story').height("80px");
        //$(this).closest('.article').children('.story').css("padding", "10px");
        //var loading = $('');
        //$(this).closest('.article').children('.story').append(loading);
        var id = this;

        $.ajax({
            url: "http://filatov.x10host.com/extract.php?",
            data: {url: link},
            type: "GET",
            dataType: 'jsonp',
            success: function (data) {
                showStory(id, data);
            }
        });

});

function showTags(id, data) {

    var tags = [];
    for(var i = 0; i < data.length; i++){
        if(data[i][2] >= 3 && data[i][1] >= 1){
            tags.push(data[i][0]);
        }
    }
    var tagContainer = $("<div></div>")
        .addClass("tagContainer");

    //console.log($("#articleText").height());
    for (var i = 0; i < tags.length; i++) {

        var tag = $("<div>" + tags[i] + " " + "</div>")
            .addClass("tag");
        tagContainer.append(tag);

    }
    $(id).closest('.article').children('.top').append(tagContainer);
}

function showStory(id, data) {
    var textString = ($(data.content).text() + "").substring(0,4200);
    $.ajax({
        //url: "http://termextract.fivefilters.org/extract.php?",
        url: "http://filatov.x10host.com/GetTerms.php?",
        data: {
            text: textString,
            max: 5,
            lowercase: 1,
            terms_only: 1,
            output: 'json'},
        type: "GET",
        dataType: 'jsonp',
        success: function (data) {
            //showTags(id, data);
        }
    });
    $(id).closest('.article').children('.story').children('.loading').remove();
    $("#panel").append("<h3>"+data.title+"</h3>");
    $("#panel").css("display", "block");
    $("#panel").append(data.content);
    $("#close").css("color" , "#FFF");
    $(".column").css("display", "none");
    $(".loading").css("display", "none");

    $(id).closest('.article').children('.story').height("100%");
}

function repop(feed){
  feeds = [];
  feeds.push(feed);
  for (var i = 0; i < feeds.length; i++) {
      var feed = new google.feeds.Feed(feeds[i]);
      feed.setNumEntries(100);
      feed.includeHistoricalEntries();
      feed.load(function (res) {
          if (!res.error) {
            results = [];
              results.push(res);
          }
      });
  }

  setTimeout(function () {
      for (var i = 0; i < results.length; i++) {
          var column = ".column";
          var entries = results[i].feed.entries;

          for (var j = 0; j < entries.length; j++) {
              var entry = entries[j];

              var article = $("<div></div>")
                  .addClass("article");

              var entryDivTop = $("<div data-open='false' data-link=" + entry.link + "></div>")
                  .addClass("entry top gradientTop");

              entryDivTop.append("<h3 class='textShadow'>" + entry.title + "</h3>")

              var storyDiv = $("<div></div>")
                  .addClass("story");

              var date = new Date(entry.publishedDate);
              var entryDivBottom = $("<div data-link=" + entry.link + "></div>")
                  .addClass("entry bottom gradientBottom");

              entryDivBottom.append("<i class='fa fa-calendar'></i> <b>" + date.toDateString()+"</b>");

              /*
              entryDivBottom.append('<span class="fa-stack fa-lg">' +
              '<i class="fa fa-calendar-o fa-stack-2x"></i>' +
              '<i class="fa fa-stack-1x">'+ 1 +'</i></span>');
              */
              // entryDiv.data( "link", entry.link );
              article.append(entryDivTop);
              article.append(storyDiv);
              article.append(entryDivBottom);
              $(column).append(article);
          }
      }
  }, 1000);
}

function initialize() {

    var googleTopNews = "https://news.google.com/?output=rss";
    var reutersTopNews = "http://feeds.reuters.com/reuters/topNews";
    var nyTopNews = "http://rss.nytimes.com/services/xml/rss/nyt/InternationalHome.xml";
    var scienceDailyTopNews = "http://www.sciencedaily.com/newsfeed.xml";
    var abcTopNews = "http://feeds.abcnews.com/abcnews/topstories";
    var bbcTopNews = "http://feeds.bbci.co.uk/news/rss.xml?edition=int";
    var nprTopNews = "http://www.npr.org/rss/rss.php?id=1004";
    var cnnTopNews = "http://rss.cnn.com/rss/cnn_topstories.rss";
    var reddit = "http://www.reddit.com/r/worldnews/.rss";
    //feeds.push(reutersTopNews);
    //feeds.push(nyTopNews);
    // feeds.push(reddit);
    // feeds.push(scienceDailyTopNews);
    //feeds.push(abcTopNews);
    //feeds.push(bbcTopNews);
    //feeds.push(nprTopNews);
    //feeds.push(cnnTopNews);
    repop(reddit);

}

google.setOnLoadCallback(initialize);
