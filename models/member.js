const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema({
  "id": String,
  "api_uri": String,
  "first_name": String,
  "middle_name": String,
  "last_name": String,
  "party": String,
  "leadership_role": String,
  "twitter_account": String,
  "facebook_account": String,
  "govtrack_id": String,
  "cspan_id": String,
  "votesmart_id": String,
  "icpsr_id": String,
  "crp_id": String,
  "google_entity_id": String,
  "url": String,
  "rss_url": String,
  "domain": String,
  "in_office": String,
  "dw_nominate": String,
  "ideal_point": String,
  "seniority": String,
  "next_election": String,
  "total_votes": Number,
  "missed_votes": Number,
  "total_present": Number,
  "ocd_id": String,
  "office": String,
  "phone": String,
  "state": String,
  "senate_class": String,
  "state_rank": String,
  "lis_id": String,
  "missed_votes_pct": Number,
  "votes_with_party_pct": Number
})

memberSchema.statics.bulkUpdate = function(data, cb) {
  this.bulkUpdateHelper(parseInt(data.num_results) - 1, data.members, [], (members) => {
    cb(members);
  });
};

memberSchema.statics.bulkUpdateHelper = function(total, members, accumulatedMembers, cb) {
  this.findByObjectAndUpdate(members[total], (member) => {
    accumulatedMembers.push(member);
    if (total--) {
      this.bulkUpdateHelper(total, members, accumulatedMembers, cb);
    } else {
      cb(accumulatedMembers);
    }
  });
}

memberSchema.statics.findByObjectAndUpdate = function(memberObj, cb) {
  this.findOneAndUpdate({ 'id': memberObj.id }, memberObj, { upsert: true }, (err, member) => {
    cb(member);
  });
}

memberSchema.statics.getMembers = function(cb) {
  this.find({}, {}, {
    sort: {
      last_name: -1
    }
  }, (err, members) => {
    cb(err, members);
  });
};

const Member = mongoose.model('member', memberSchema);

module.exports = Member;