const dbConfig = require('../../config/db');
const arangojs = require('arangojs');
const DB = new arangojs.Database({
  url: dbConfig.url,
});

// Database selection
DB.useDatabase(dbConfig.database);

// Speficy the database user
DB.useBasicAuth(dbConfig.username, dbConfig.password);

const Cours = DB.collection('COURS');

exports.create = function (cours) {
  if (!cours.id || !cours.titreCours || !cours.nbTopic || !cours.nbPosts)
    return;

  return Cours.save(cours);
};

exports.findAll = function () {
  return Cours.all();
};

exports.findByKey = function (key) {
  if (!key) return;

  return Cours.firstExample({ _key: key });
};
