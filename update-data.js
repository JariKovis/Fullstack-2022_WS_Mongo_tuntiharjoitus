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
            "name": { "first": "Iivo", "last": "Niskanen" },
            "birth": new Date(1999, 11, 11), // June 23, 1912                                                                                                                                 
            "death": new Date(2100, 1, 7),  // June 7, 1954                                                                                                                                  
            "contribs": ["Peltonen", "15 km vapaalla", "Pekingin Olymipialaiset"],
            "views": 1200
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