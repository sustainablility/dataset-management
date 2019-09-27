let assert = require('chai').assert;
let DataSetInfoClass = require('../src/model/datasetInfoClass');
let testDatasetName = 'testtest';
let testDatasetPublicity = 1;
let testDatasetMetaData = "Testing testing testing. ";
let testDatasetOwner = ["asfsdafdsf", "sdfaseger"];
let testDatasetAdmin = ["egrere","fwgtrthrthr"];

describe('Model Test',function () {
    let datasetInfo;
    it('Database Connection', function (done) {
        (
            async function() {
                datasetInfo = new DataSetInfoClass();
                await datasetInfo.connect().catch(err => {
                    assert.fail(err);
                });
                done();
            }
        )();
    });

    it('Dataset Adding test', function () {
        (
            async function() {
                let addingResult = await datasetInfo.putNewDatasetInfo(testDatasetName, testDatasetPublicity, testDatasetMetaData, testDatasetOwner, testDatasetAdmin);
                assert.strictEqual(addingResult.result.ok,1,"Insert User Error");
            }
        )();
    });

    it('Get dataset information from database', function (done) {
        (
            async function() {
                let testDatasetInfo = await datasetInfo.getDatasetInfoByDatasetName(testDatasetName);
                assert.notStrictEqual(testDatasetInfo, null, "Get dataset info fail");
                done();
            }
        )();
    });

    it('Delete dataset information by dataset name', function (done) {
        (
            async function() {
                let deleteDatasetResult = await datasetInfo.deleteDatasetInfo(testDatasetName);
                assert.strictEqual(deleteDatasetResult.result.ok,1,"Insert User Error");
                done();
            }
        )();
    });

    it('Close database connection', function (done) {
        (
            async function() {
                datasetInfo.done();
                done();
            }
        )();
    });
});