var express = require("express");
var app = express();
var axios = require("axios");
var cheerio = require("cheerio");


// app.get("/", function (req, res) {
//     res.send("app worx")
// })

app.use(express.static("./client/build"))


app.get("/scrape", function (req, res) {
    // First, we grab the body of the html with axios
    axios.get("http://quotes.toscrape.com/").then(function (response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);
        var data = [];

        // Now, we grab every h2 within an article tag, and do the following:
        $(".quote").each(function (i, element) {
            // Save an empty result object
            var result = {};

            // Add the text and href of every link, and save them as properties of the result object
            result.title = $(this).children(".text").text();

            result.link = $(this).children("span").children("a").attr("href");
            // console.log(result);


            // Create a new Article using the `result` object built from scraping
            //     db.Article.create(result)
            //         .then(function (dbArticle) {
            //             // View the added result in the console
            //             console.log(dbArticle);
            //         })
            //         .catch(function (err) {
            //             // If an error occurred, send it to the client
            //             // return res.json(err);
            //             console.log(err);

            //         });
            data.push (result)
        });

        // If we were able to successfully scrape and save an Article, send a message to the client
        res.send(data);
    });
});

app.listen(3002);