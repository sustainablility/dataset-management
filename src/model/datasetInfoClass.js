let mongoClient = require('mongodb').MongoClient;
let databaseConfig = require('../../config').database;

class DatasetInfoClass {

    constructor(){
        this.getDatasetInfoByDatasetName = require('./getDatasetInfoByDatasetName');
        this.putNewDatasetInfo = require('./putNewDatasetInfo');
        this.deleteDatasetInfo = require('./deleteDatasetInfoByDatasetName');
    }

    async connect() {
        let dbUrl = "mongodb://" + databaseConfig.host + ":" + databaseConfig.port + '/';
        let dbs = await mongoClient.connect(dbUrl,{ useNewUrlParser: true }).catch(error => {
            log.fatal("Cannot Connect to database",error);
        });
        if (dbs === undefined) {
            return false;
        }
        this.done = () => {
            dbs.close();
        };
        this.db = dbs.db(databaseConfig.db);
        return true;
    }
}

module.exports = DatasetInfoClass;