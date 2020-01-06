let app = require('express')();
let config = require('./config');
let cors = require('cors');
let bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '1mb'}));
app.use(cors());
async function service() {
    app.post("/newDatasetRecord", await require('./src/controller/newDataset'));
    app.get("/verifyDatasetTokenAndDatasetName", await require('./src/controller/verifyDatasetTokenAndDatasetName'));
    app.get("/checkDatasetNameExistence", await require('./src/controller/checkDatasetNameExistence'));
    app.listen(config.listenOnPort);
}

service();
