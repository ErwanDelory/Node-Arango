const dbConfig = require('../../config/db');
const arangojs = require('arangojs');
const DB = new arangojs.Database({
  url: dbConfig.url,
});

DB.useDatabase(dbConfig.database);
DB.useBasicAuth(dbConfig.username, dbConfig.password);

var User = DB.collection('USER');

exports.create = function (user) {
  if (!user.username || !user.password || !user.nom || !user.prenom) return;

  return User.save(user);
};
