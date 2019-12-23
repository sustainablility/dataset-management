let encryption = require("../microservice-communication-encryption/index");
let DatasetClass = require('../model/datasetInfoClass');

async function newDataset(request, response) {
    if(
        request.body["datasetName"] === undefined ||
        request.body["datasetPublicity"] === undefined ||
        request.body["datasetMetaData"] === undefined ||
        request.body["datasetOwnerList"] === undefined ||
        request.body["datasetAdminList"] === undefined
    ) {
        response.send("Lack of parameter");
        return null;
    }
    let decripted = {
        name: encryption.decrypt(request.body["datasetName"]),
        publicity: encryption.decrypt(request.body["datasetPublicity"]),
        metaData: encryption.decrypt(request.body["datasetMetaData"]),
        ownerList: encryption.decrypt(request.body["datasetOwnerList"]),
        adminList: encryption.decrypt(request.body["datasetAdminList"])
    };

    for (let i in decripted) {
        if (i == null) {
            response.send("decryptionFailed");
            return null;
        }
    }
    let dataset = new DatasetClass();
    await dataset.connect().catch();
    let newDatasetResult = await dataset.putNewDatasetInfo(
        decripted.name,
        Number(decripted.publicity),
        decripted.metaData,
        JSON.parse(decripted.ownerList),
        JSON.parse(decripted.adminList)
    );

    if (newDatasetResult.result.ok !== 1) {
        response.send("Server error");
        return null;
    }
    response.send("0");
}

module.exports = newDataset;