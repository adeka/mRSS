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
    console.log(data);
}
$(document).on('click', ".entry", function () {
    //console.log($(this).data('open'));

    if ($(this).data('open') == false) {
        // console.log("ASdF");
        // $(".story").css("height", "0px");
        // $(".story").css("padding", "0px");
        var link = $(this).data('link');
        $(this).data('open', true);

        //console.log(link);
        $(this).closest('.article').children('.story').height("80px");
        $(this).closest('.article').children('.story').css("padding", "10px");
        var loading = $('<img class="loading" src="img/loading4.gif">');
        $(this).closest('.article').children('.story').append(loading);
        var id = this;

        $.ajax({
            url: "http://filatov.x10host.com/extract.php?",
            data : {url : link},
            type: "GET",
            dataType: 'jsonp',
            success : function(data){
                showStory(id, data);
            }
        });
        /*
         $.getJSON("http://syntheno.netai.net/extract.php?callback=?",
         {url: link, content: 1},
         function (result) {
         showStory(id, result)
         }).fail(function () {
         console.log("error");
         });

         */

        /*
         $.get(
         //"http://www.codinghs.com/syntheno/textrss/extract.php?url=[url]",
         //"http://www.codinghs.com/syntheno/textrss/extract.php?url=[url]&callback=",
         "http://syntheno.netai.net/extract.php?url=[url]",
         {url: link, content: 1, callback: "callback"},
         function (data) {
         console.log(data);

         //showStory(id, data);
         }, "jsonp"
         )
         .done(function () {
         console.log("done get");
         })
         .fail(function () {
         console.log("fail get");
         });
         */

    }
    else {
        $(this).closest('.article').children('.story').empty();
        $(this).closest('.article').children('.story').height("0px");
        var id = this;
        setTimeout(function () {
            $(id).closest('.article').children('.story').css("padding", "0px");
        }, 900);
        $(this).data('open', false);
    }
});

function showStory(id, data) {

    //console.log($("#articleText").height());
    $(id).closest('.article').children('.story').children('.loading').remove();
    $(id).closest('.article').children('.story').append(data.content);
    $(id).closest('.article').children('.story').height("500px");
    //$(id).closest('.article').children('.story').height($("#articleText").height() + "px");
    // $(id).closest('.article').children('.story').height("1000px");

    //console.log(data);
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

    feeds.push(reutersTopNews);
    feeds.push(nyTopNews);
    // feeds.push(scienceDailyTopNews);
    //feeds.push(abcTopNews);
    feeds.push(bbcTopNews);
    feeds.push(nprTopNews);
    feeds.push(cnnTopNews);

    for (var i = 0; i < feeds.length; i++) {
        var feed = new google.feeds.Feed(feeds[i]);

        feed.setNumEntries(50);
        feed.includeHistoricalEntries();
        feed.load(function (res) {
            if (!res.error) {
                results.push(res);
            }
        });
    }
}

google.setOnLoadCallback(initialize);

setTimeout(function () {
    for (var i = 0; i < results.length; i++) {
        var column = "#column" + (i + 1).toString();
        var entries = results[i].feed.entries;
        for (var j = 0; j < entries.length; j++) {
            var entry = entries[j];

            var article = $("<div></div>")
                .addClass("article");

            var entryDivTop = $("<div data-open='false' data-link=" + entry.link + "></div>")
                .addClass("entry top gradientTop");

            entryDivTop.append("<h2 class='textShadow'>" + entry.title + "</h2>")

            var storyDiv = $("<div></div>")
                .addClass("story");

            var entryDivBottom = $("<div data-link=" + entry.link + "></div>")
                .addClass("entry bottom gradientBottom");
            entryDivBottom.append("<h4>" + entry.publishedDate + "</h4>");

            // entryDiv.data( "link", entry.link );


            article.append(entryDivTop);
            article.append(storyDiv);
            article.append(entryDivBottom);
            /*
             entryDivTop.append("<h2 class='textShadow'>" + entry.title + "</h2>")
             .append("<h4>" + entry.publishedDate + "</h4>")
             .append("<h4>" + entry.contentSnippet + "</h4>");
             // .append("<h5><a href=" + entry.link + " target='_blank'>Link</h5>");
             */
            $(column).append(article);

        }
    }
}, 1000);


