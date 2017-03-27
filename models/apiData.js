const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const apiDataSchema = new Schema({
  collectionName: String,
  lastUpdated: Date
})

apiDataSchema.statics.shouldUpdate = function(collectionName, isTrue, isFalse) {
  this.findOne({
    'collectionName': collectionName
  }, {}, {
    sort: {
      'created_at': -1
    }
  }, (err, apiData) => {
    if (!apiData || Date.now() - apiData.lastUpdated > 86400000) {
      isTrue();
    } else {
      isFalse();
    }
  });
}

const ApiData = mongoose.model('apiData', apiDataSchema);

module.exports = ApiData;