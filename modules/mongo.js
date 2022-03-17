exports.getData = function getResult(callback) {

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
    joiden nimessä esiintyy sana "Star Wars" */
    var query = {
        title: new RegExp("Star Wars")
    };

    /*     Luodaan yhteys  tietokantaan nimeltä "sample_mflix" ja sieltä kokoelmaan "movies" */
    client.connect(err => {
        const collection = client.db("sample_mflix").collection("movies");
        if (err) throw err;

        collection
            .find(query)
            .sort({ year: -1 })
            .toArray(function (err, result) {
                if (err) throw err;
                console.log(result);
                client.close();
                /* Kutsutaan parametrina reitistä saatua funktiota, joka käsittelee vastauksen */
                callback(err, result);
            });
    });
}