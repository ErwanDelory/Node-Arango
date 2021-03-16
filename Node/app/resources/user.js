const UserService = require('../services/user');
const dbConfig = require('../../config/db');
const { arangojs, aql } = require('arangojs');

const db = new arangojs.Database({
  url: dbConfig.url,
});
db.useDatabase(dbConfig.database);
db.useBasicAuth(dbConfig.username, dbConfig.password);

const USER = db.collection('USER');

function insertUser(req, res) {
  var user = {
    username: req.body.username,
    password: req.body.password,
    nom: req.body.nom,
    prenom: req.body.prenom,
  };

  UserService.create(user)
    .then(function (doc) {
      console.log('Saved documents ' + doc._key);

      return res.status(200).json({
        status: 'insert ok !',
      });
    })
    .catch(function (error) {
      console.error('Error saving document', error);
      return res.status(500).json(error);
    });
}

async function deleteUser(req, res) {
  try {
    const result = await db.query(
      aql`
      REMOVE { _key:${req.params.id} } 
      IN ${USER}   
  `
    );
    const value = await result.all();

    return res
      .status(200)
      .json({ message: "L'utilisateur a été supprimé !", data: value });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ message: "Erreur, l'utilisateur n'existe pas !" });
  }
}

async function editUser(req, res) {
  try {
    const result = await db.query(
      aql`
      REPLACE { _key:${req.params.id} }
      WITH {
        username: ${req.body.username},
        password: ${req.body.password},
        nom: ${req.body.nom},
        prenom: ${req.body.prenom}
      }
      IN ${USER}
  `
    );
    const value = await result.all();

    return res
      .status(200)
      .json({ message: "L'utilisateur a été modifié !", data: value });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ message: "Erreur, l'utilisateur n'existe pas !" });
  }
}

exports.insertUser = insertUser;
exports.deleteUser = deleteUser;
exports.editUser = editUser;
