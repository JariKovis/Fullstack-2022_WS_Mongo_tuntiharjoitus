const res = require("express/lib/response");

/* Tuodaan moduuli ohjelmaan */
const MongoClient = require("mongodb").MongoClient;

/* Haetaan ympäristömuuttujat .env tiedostosta */
require("dotenv").config();

var user = process.env.DB_USER
var salis = process.env.DB_PASS

const uri = "mongodb+srv://" + user + ":" + salis + "@cluster0.anqd5.mongodb.net/test?retryWrites=true&w=majority";

/* Luodaan uusi yhteysolio käyttäen edellä määriteltyä URI:a sekä tarvittavia parametreja */
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

/* Määritellään tietokantaan tehtävä kysely JSON-oliona. Tässä voi käyttää apuna esim. MondoDB Compass -työkalua. Tämä kysely hakee kaikkia elokuvia
joiden nimessä esiintyy sana "USA" */
var query = {
    "title": /USA/
};

/* Luodaan yhteys  tietokantaan nimeltä "sample_mflix" ja sieltä kokoelmaan "movies" */
client.connect(err => {
    const collection = client.db("sample_mflix").collection("movies");
    if (err) throw err;
    /*  Suoritetaan kysely collection-olion avulla */
    collection
        .find(query)          /* query muuttuja sisältää kyselyn */
        .limit(5)             /* rajoitetaan tulosjoukko 5:een */
        .toArray(function (err, result) {
            /* Palautetaan tulokset JS-taulukkona... */
            /* ...ja tulostetaan taulukko konsoliin */
            if (err) throw err;
            for (const element of result) {
                console.log(element.title)
            }

            client.close();                /* Suljetaan yhteys */
        });
});


