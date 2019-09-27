let config = require('../../config');
let log = require("../logging");
async function getDatasetInfoByDatasetName(datasetName) {
    let result = this.db.collection(config.database.table).find({datasetName:datasetName}).toArray().catch(err => {
        log(3,err);
    });
    if (result === undefined){
        return null;
    }else {
        return result;
    }
}

module.exports = getDatasetInfoByDatasetName;