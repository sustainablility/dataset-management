let config = require('../../config');
let log = require("../logging");
async function deleteDatasetInfoByDatasetName(datasetName) {
    let result = this.db.collection(config.database.table).deleteOne({datasetName:datasetName}).catch(err => {
        log(3,err);
    });
    return result;
}

module.exports = deleteDatasetInfoByDatasetName;