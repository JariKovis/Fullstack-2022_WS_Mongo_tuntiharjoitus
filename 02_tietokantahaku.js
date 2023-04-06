const res = require("express/lib/response");

/* Tuodaan moduuli ohjelmaan */
const MongoClient = require("mongodb").MongoClient;

/* Haetaan ympäristömuuttujat .env tiedostosta */
require("dotenv").config();

/* console.log(process.env); */
var user = process.env.DB_USER
var salis = process.env.DB_PASS

const uri = "mongodb+srv://" + user + ":" + salis + "@cluster0.anqd5.mongodb.net/?retryWrites=true&w=majority";

const dbname = "mongodbVSCodePlaygroundDB"
const collection_name = "sales"


/* Luodaan uusi yhteysolio käyttäen edellä määriteltyä uri:a sekä tarvittavia parametreja */
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const collection = client.db(dbname).collection(collection_name);

/* Määritellään tietokantaan tehtävä kysely JSON-oliona. Tässä voi käyttää apuna esim. MondoDB Compass -työkalua. Tämä kysely hakee kaikkia asuntoja joiden property-type on "House" */
const documentsToFind = { price: 10 }

/* Luodaan yhteys  tietokantaan ja sieltä kokoelmaan */

const main = async () => {

    try {
        await client.connect()
        console.log("Connected...");
        let result = collection.find(documentsToFind)
        let docCount = collection.countDocuments(documentsToFind)
        await result.forEach((doc) => console.log(doc))
        console.log(`Found ${await docCount} documents`)

    } catch (e) {
        console.error('Error finding document:' + e);
    } finally {
        await client.close();
        console.log("...connection closed...");
    }
}
main();
