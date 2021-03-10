const UserService = require('../services/user');

/* POST an user */
function insertUser(req, res) {
  var user = {
    username: req.body.username,
    password: req.body.password,
    nom: req.body.nom,
    prenom: req.body.prenom,
  };

  // Explicit save
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

exports.insertUser = insertUser;
