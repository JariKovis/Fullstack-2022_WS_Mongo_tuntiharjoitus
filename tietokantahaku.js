const res = require("express/lib/response");

/* Tuodaan moduuli ohjelmaan */
const MongoClient = require("mongodb").MongoClient;

/* Haetaan ympäristömuuttujat .env tiedostosta */
require("dotenv").config();

/* console.log(process.env); */
var user = process.env.DB_USER
var salis = process.env.DB_PASS

const uri = "mongodb+srv://" + user + ":" + salis + "@cluster0.anqd5.mongodb.net/sample_airbnb?retryWrites=true&w=majority";


/* Luodaan uusi yhteysolio käyttäen edellä määriteltyä URI:a sekä tarvittavia parametreja */
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

/* Määritellään tietokantaan tehtävä kysely JSON-oliona. Tässä voi käyttää apuna esim. MondoDB Compass -työkalua. Tämä kysely hakee kaikkia asuntoja joiden property-type on "House" */
var query = {
    property_type: "House"
};

/* Luodaan yhteys  tietokantaan nimeltä "sample_airbnb" ja sieltä kokoelmaan "listingsAndReviews" */
client.connect(err => {
    const collection = client.db("sample_airbnb").collection("listingsAndReviews");
    if (err) throw err;
    /*     Suoritetaan kysely collection-olion avulla */
    collection
        .find(query)          /* query muuttuja sisältää kyselyn */
        .limit(5)             /* rajoitetaan tulosjoukko 5:een */
        .toArray(function (err, result) {  /* Palautetaan tulokset JS-taulukkona */
            if (err) throw err;
            for (const element of result) {
                console.log(element.description)
            }
            console.log(result.length);            /* Tulostetaan taulukon koko ruudulle */
            client.close();                /* Suljetaan yhteys */
        });
});


