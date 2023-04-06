/* Tuodaan moduuli ohjelmaan */
const MongoClient = require("mongodb").MongoClient;

/* Haetaan ympäristömuuttujat .env tiedostosta */
require("dotenv").config();

/* console.log(process.env); */
var user = process.env.DB_USER
var salis = process.env.DB_PASS

const uri = "mongodb+srv://" + user + ":" + salis + "@cluster0.anqd5.mongodb.net/?retryWrites=true&w=majority";

/* Luodaan yhteysolio käyttäen edellä määriteltyä uri:a sekä tarvittavia parametreja */

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

/* Luodaan yhteys ja tulostetaan tieto virheestä tai onnistumisesta virhetiedot palaututuvat err muuttujaan, hakujen tulokset r-muuttujaan */

async function connect() {

    try {
        await client.connect();
        console.log("Connected...");

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
        console.log("...connection closed...");
    }
}
connect();

