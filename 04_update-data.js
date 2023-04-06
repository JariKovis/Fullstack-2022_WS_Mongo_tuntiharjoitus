const res = require("express/lib/response");

/* Tuodaan moduuli ohjelmaan */
const MongoClient = require("mongodb").MongoClient

/* Haetaan ympäristömuuttujat .env tiedostosta */
require("dotenv").config();

/* console.log(process.env); */
var user = process.env.DB_USER
var salis = process.env.DB_PASS

const uri = "mongodb+srv://" + user + ":" + salis + "@cluster0.anqd5.mongodb.net/sample_airbnb?retryWrites=true&w=majority";

const dbname = "mongodbVSCodePlaygroundDB"
const collection_name = "sales"


/* Luodaan uusi yhteysolio käyttäen edellä määriteltyä URI:a sekä tarvittavia parametreja */
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const collection = client.db(dbname).collection(collection_name);

/* Määritellään tietokantaan menevät oliot JSON-oliona.*/

const documentToUpdate = { item: "Jalkapallo" }
const update = { $set: { item: "GolfPallo" } }

const documentsToFind = {};
/* Luodaan yhteys  tietokantaan ja sieltä kokoelmaan */

const main = async () => {

    try {
        await client.connect()
        console.log("Connected...");
        let result = await collection.updateOne(documentToUpdate, update)
        result.modifiedCount === 1
            ? console.log("Updated one document")
            : console.log("No documents updated")
        console.log(result)

    } catch (e) {
        console.error('Error updating document:' + e);
    } finally {
        await client.close();
        console.log("...connection closed...");
    }
}
main();
