let app = require('express')();
let config = require('./config');
let cors = require('cors');
let bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '1mb'}));
app.use(cors());
async function service() {
    app.post("/newDatasetRecord", )
    app.get("/verifyDatasetTokenAndDatasetName", await require('./src/controller/verifyDatasetTokenAndDatasetName'));
    app.listen(config.listenOnPort);
}

service();
