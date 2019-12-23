let request = require('request-promise');
let config = require('../../config');
let encryption = require('../microservice-communication-encryption/index');
let log = require("../logging");

async function getID(datasetToken) {

    let response = await request({
        uri: config.getUserIDByDataSetTokenUrl,
        qs: {
            token: encryption.encrypt(datasetToken)
        }
    }).catch(err => {
        log(3, err);
    });
    if (response === undefined) {
        return null;
    }
    if (response === "") {
        return ""
    }
    let userID = encryption.decrypt(response);
    return userID;
}

module.exports = getID;