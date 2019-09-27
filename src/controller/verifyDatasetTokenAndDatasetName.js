let Dataset = require('../model/datasetInfoClass');
let encryption = require('../microservice-communication-encryption/index');
let log = require('../logging');

async function verifyDatasetTokenAndDatasetName(request, response) {
    if (request.query.token === undefined || request.query.name === undefined) {
        response.status(400).send("No parameters");
        return null;
    }
    if (request.query.token.length > 50 || request.query.name.length > 50) {
        response.status(400).send("Parameters are too long");
        return null;
    }
    console.log(request.query.token);
    console.log(request.query.name);

    let datasetToken = encryption.decrypt(request.query.token);
    if (datasetToken === null) {
        response.status(400).send("Decription failed");
        return null;
    }
    let datasetName = encryption.decrypt(request.query.name);
    if (datasetName === null) {
        response.status(400).send("Decription failed");
        return null;
    }
    let datasetInfo = new Dataset();
    datasetInfo.connect().catch(err => {
        response.status(500).send("err");
        log(4, err);
    });
    let datasetInformation = await datasetInfo.getDatasetInfoByDatasetName(datasetName);
    if (datasetInformation === null) {
        response.status(500).send("err");
        return null;
    }







}
module.exports = verifyDatasetTokenAndDatasetName;