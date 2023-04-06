


var express = require("express");
var app = express();

/* otetaan EJS käyttöön */
app.set("view engine", "ejs");

/* Tällä pakotetaan sivupohja tuottamaan sisennettyä, kaunista HTML:ää. Tuotantokäytössä asetus voi olla false jolloin sivujen koko pienenee hieman */
app.locals.pretty = true;

/* Haetaan ympäristömuuttujat .env tiedostosta */
require("dotenv").config();

// Tuodaan moduuli ohjelmaan
const MongoClient = require("mongodb").MongoClient;

// Määritellään salasana ja yhteysosoite tietokantaan (tämän saa MongoDB Atlas-palvelusta)
var user = process.env.DB_USER
var salis = process.env.DB_PASS
const uri = "mongodb+srv://" + user + ":" + salis + "@cluster0.anqd5.mongodb.net/test?retryWrites=true&w=majority";

/* Luodaan uusi yhteysolio käyttäen edellä määriteltyä URI:a sekä tarvittavia parametreja */
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

/* Määritellään tietokantaan tehtävä kyselu JSON-oliona. Tämä kysely hakee kaikkia elokuvia
joiden nimessä esiintyy sana "Jedi" */
var query = {
    title: new RegExp("Potter")
};

// Luodaan yhteys  tietokantaan nimeltä "sample_mflix" ja sieltä kokoelmaan "movies"
client.connect(err => {
    const collection = client.db("sample_mflix").collection("movies");
    if (err) throw err;

    // Luodaan reitit ja niiden toiminnallisuudet
    app.get("/", function (req, res) {
        res.send("Hello World!");
    });

    app.get("/leffat", (req, res) => {
        collection.find(query).toArray(function (err, results) {
            console.log(results);
            res.render("./pages/leffat", { taulu: results });
        });
    });


    /*     Web-palvelimen luonti Expressin avulla */
    app.listen(3001, function () {
        console.log("Kuunnellaan porttia....3001");
    });

});
/* 
function parse(data) {
    var html = "<table border='1'>";
    for (var i = 0; i < data.length; i++) {
        html += `<tr>
                   <td>${data[i].title}</td>
                   <td>${data[i].year}</td>
                   <td><img src='${data[i].poster}' height='30%'></td>
               </tr>`;
    }
    html += "</table>";
    return html;
}
 */