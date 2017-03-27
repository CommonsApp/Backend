const mongoose = require('mongoose');
const Members = require('../models/member');
const ApiData = require('../models/apiData');
const api = require('../utils/api');

module.exports.controller = (app) => {
  app.get('/v1/members', (req, res) => {
    
    ApiData.shouldUpdate('members', () => {
      api.getMembers((err, data) => {
        Members.bulkUpdate(data[0], (resData) => {
          res.send(resData);
        });
      });
    }, () => {
      Members.getMembers((err, members) => {
        res.send(members);
      })
    });

  });
}