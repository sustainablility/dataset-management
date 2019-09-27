let config = require('../../config');
let log = require("../logging");
async function putNewDatasetInfo(datasetName, publicity, metaData, OwnerList, adminList) {
    let insertObject = {
        datasetName: datasetName,
        public: publicity,
        metaData: metaData,
        Owner: OwnerList,
        admin: adminList
    };
    let insertResult = await this.db.collection(config.database.table).insertOne(insertObject).catch(err => {
        log(3,err);
    });
    return insertResult;
}
module.exports = putNewDatasetInfo;