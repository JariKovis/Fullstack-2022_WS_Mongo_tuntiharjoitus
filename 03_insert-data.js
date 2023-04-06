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


/* Luodaan uusi yhteysolio käyttäen edellä määriteltyä URI:a sekä tarvittavia parametreja */
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const collection = client.db(dbname).collection(collection_name);

/* Määritellään tietokantaan menevät oliot JSON-oliona.*/
const samples = [
    {
        item: "Jalkapallo",
        price: 100,
        quantity: 8,
        date: "06 April 2023",
    },
    {
        item: "Sukset",
        price: 10,
        quantity: 6,
        date: "06 April 2023",
    },
]

const documentsToFind = {};
/* Luodaan yhteys  tietokantaan ja sieltä kokoelmaan */

const main = async () => {

    try {
        await client.connect()
        console.log("Connected...");
        let docCount = collection.countDocuments(documentsToFind)
        console.log(`Start - Found ${await docCount} documents`)
        let result = await collection.insertMany(samples)

        console.log(`Inserted ${result.insertedCount} documents`)
        docCount = collection.countDocuments(documentsToFind)
        console.log(`End - Found ${await docCount} documents`)
        console.log(result)

    } catch (e) {
        console.error('Error finding document:' + e);
    } finally {
        await client.close();
        console.log("...connection closed...");
    }
}
main();
