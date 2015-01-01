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
$(document).on('click', ".entry", function () {
    // console.log("ASdF");
   // $(".story").css("height", "0px");
   // $(".story").css("padding", "0px");
    var link = $(this).data('link');
    //console.log(link);
    $(this).closest('.article').children('.story').height("80px");
    $(this).closest('.article').children('.story').css("padding" , "10px");
    var loading = $('<img class="loading" src="img/loading4.gif">');
    $(this).closest('.article').children('.story').append(loading);
    var id = this;
    $.get(
        "http://syntheno.netai.net/extract.php?url=[url]",
        {url: link, content: 1},
        function (data) {
            showStory(id, data);
        }, "jsonp"
    );
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

            var entryDivTop = $("<div data-link=" + entry.link + "></div>")
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


