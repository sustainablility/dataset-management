let Dataset = require('../model/datasetInfoClass');

async function checkDatasetNameExistence(request, response) {
    if (request.query.datasetName === undefined) {
        response.status(400).send("Lack of parameters");
        return null;
    }
    let datasetName = request.query.datasetName;

    let dataset = new Dataset();
    if (! await dataset.connect()) {
        response.send("Database Error");
        return null;
    }
    let resultDataset = await dataset.getDatasetInfoByDatasetName(datasetName);
    dataset.done();
    if (resultDataset.length > 0) {
        response.send("1");
        return null;
    }
    response.send("0");

}
module.exports = checkDatasetNameExistence;