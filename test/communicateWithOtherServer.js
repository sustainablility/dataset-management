let testDataSetToken = "71wtfqyvb9hxj3bqkj97b";
let assert = require('chai').assert;

let testDataSetTokenResultId = "github15046218";
let getUserIdByDatasetToken = require('../src/communicateWithOtherServer/getUserIDByDatasetToken');

describe("Communication with other server", function () {
    it('Get user ID by dataset token', function (done) {
        (async function() {
            let resultID = await getUserIdByDatasetToken(testDataSetToken);
            assert.strictEqual(resultID, testDataSetTokenResultId,"Result ID does not match");
            done();
        })();
    });
});