let Dataset = require('../model/datasetInfoClass');
let encryption = require('../microservice-communication-encryption/index');
let getUserIDByDatasetToken = require('../communicateWithOtherServer/getUserIDByDatasetToken');
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
    await datasetInfo.connect().catch(err => {
        response.status(500).send("err");
        log(4, err);
        return null;
    });
    let datasetInformation = await datasetInfo.getDatasetInfoByDatasetName(datasetName);
    if (datasetInformation === null) {
        response.status(500).send("err");
        return null;
    }
    if (datasetInformation.length === 0) {
        response.status(400).send("DataSet Name Invalid");
        return null;
    }
    let userID = await getUserIDByDatasetToken(datasetToken);
    if (userID === null) {
        response.status(400).send("DatasetToken Invalid");
        return null;
    }
    if (userID === "") {
        response.send("0");
        return null;
    }
    if (datasetInformation.public === 0 && datasetInformation.Owner.indexOf(userID) === -1 && datasetInformation.admin.indexOf(userID) === -1) {
        response.send("0");
        return null;
    }
    response.send("1");

}
module.exports = verifyDatasetTokenAndDatasetName;