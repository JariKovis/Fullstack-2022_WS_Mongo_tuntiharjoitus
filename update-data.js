const { MongoClient } = require("mongodb");

require("dotenv").config();

/* haetaan .env tiedostosta käyttis ja salasana */
var user = process.env.DB_USER
var salis = process.env.DB_PASS

const url = "mongodb+srv://" + user + ":" + salis + "@cluster0.anqd5.mongodb.net/sample_mflix?retryWrites=true&w=majority";

const client = new MongoClient(url);

/* The database to be used */
const dbName = "test";

async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);

        /*        Use the collection "people" */
        const col = db.collection("people");

        /*         Construct a document                                                           */
        let personDocument = {
            "name": { "first": "Jari", "last": "Kovis" },
            "birth": new Date(1900, 1, 1), // June 23, 1912                                                                                                                                 
            "death": new Date(2100, 5, 7),  // June 7, 1954                                                                                                                                  
            "contribs": ["Laurea FullStack2022", "Turing test", "Turingery"],
            "views": 12
        }

        /*      Insert a single document, wait for promise so we can read it back */
        const p = await col.insertOne(personDocument);
        /*      Find one document */
        const myDoc = await col.findOne();
        console.log(myDoc);

    } catch (err) {
        console.log(err.stack);
    }

    finally {
        await client.close();
    }
}

run().catch(console.dir);