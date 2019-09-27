let app = require('express')();
let config = require('./config');

async function service(){
    app.get("/verifyDatasetTokenAndDatasetName", await require('./src/controller/verifyDatasetTokenAndDatasetName'));
    app.listen(config.listenOnPort);
}

service();
