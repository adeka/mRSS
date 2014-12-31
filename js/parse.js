/**
 * Nikita Filatov
 */

var results = [];
var feeds = [];

google.load("feeds", "1");


//<![CDATA[

var invocation = new XMLHttpRequest();
var url = 'http://aruner.net/resources/access-control-with-get/';
var invocationHistoryText;

function callOtherDomain() {
    if (invocation) {
        invocation.open('GET', url, true);
        invocation.onreadystatechange = handler;
        invocation.send();
    }
    else {
        invocationHistoryText = "No Invocation TookPlace At All";
        var textNode = document.createTextNode(invocationHistoryText);
        var textDiv = document.getElementById("textDiv");
        textDiv.appendChild(textNode);
    }

}
function handler(evtXHR) {
    if (invocation.readyState == 4) {
        if (invocation.status == 200) {
            var response = invocation.responseXML;
            var invocationHistory = response.getElementsByTagName('invocationHistory').item(0).firstChild.data;
            invocationHistoryText = document.createTextNode(invocationHistory);
            // var textDiv = document.getElementById("textDiv");
            // textDiv.appendChild(invocationHistoryText);
            console.log(invocationHistoryText)

        }
        else
            alert("Invocation Errors Occured");
    }
    else
        dump("currently the application is at" + invocation.readyState);
}
//]]>

function article() {

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
        //console.log(entry);
        for (var j = 0; j < entries.length; j++) {
            var entry = entries[j];
            // var cont = "";

            if (j == 0 && i == 0) {
                // Using YQL and JSONP
                /*
                 $.ajax({
                 url: "http://syntheno.netai.net/extract.php?url=[url]",

                 // The name of the callback parameter, as specified by the YQL service
                 jsonp: "callback",

                 // Tell jQuery we're expecting JSONP
                 dataType: "jsonp",

                 // Tell YQL what we want and that we want JSON
                 data: {
                 q: entry.link,
                 format: "json"
                 },

                 // Work with the response
                 success: function (response) {
                 console.log(response); // server response
                 }
                 });
                 */
                /*
                 var jqxhr = $.getJSON("http://syntheno.netai.net/extract.php?url=[url]&callback=", function () {
                 console.log("success");
                 })
                 .done(function () {
                 console.log("second success");
                 })
                 .fail(function () {
                 console.log("error");
                 })
                 .always(function () {
                 console.log("complete");
                 });
                 */

                /*
                 $.get(
                 "http://syntheno.netai.net/extract.php?url=[url]",

                 {url: entry.link, content: 1},
                 function (data) {
                 cont = data.content
                 console.log(cont);

                 }
                 );
                 */
                callOtherDomain();
            }

            var entryDiv = $("<div></div>")
                .addClass("entry gradient shadow")
                .append("<h2 class='textShadow'>" + entry.title + "</h2>")
                .append("<h4>" + entry.publishedDate + "</h4>")
                .append("<h4>" + entry.contentSnippet + "</h4>")
                .append("<h5><a href=" + entry.link + " target='_blank'>Link</h5>");
            //.append(cont);
            $(column).append(entryDiv);


            //console.log(entry.mediaGroup);
        }

        //$( "body" ).append( gallery ).addClass( "snippet" );
        //var pdiv = $( "p" ).add( "div" );
    }
}, 1000);

function poo() {
    console.log("poo");
}
