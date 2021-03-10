const CoursService = require('../services/cours');

/* POST an article */
function createCours(req, res) {
  const cours = {
    id: req.body.id,
    titreCours: req.body.titreCours,
    nbTopic: req.body.nbTopic,
    nbPosts: req.body.nbPosts,
    lastPost: Date(),
  };

  // Explicit save
  CoursService.create(cours)
    .then(function (doc) {
      console.log('Saved documents ' + doc._key);

      return res.status(200).json(doc);
    })
    .catch(function (error) {
      console.error('Error saving document', error);
      return res.status(500).json(error);
    });
}

function getCoursById(req, res) {
  var id = req.params.id;

  CoursService.findByKey(id)
    .then(function (doc) {
      console.log(`Get a document by key "${req.params.id}".`, doc._key);

      return res.status(200).json(doc);
    })
    .catch(function (error) {
      console.error('Error getting single document', error);
      return res.status(500).json(error);
    });
}

function getAllCours(req, res) {
  CoursService.findAll()
    .then(function (response) {
      console.log(`Load all saved documents.`, response._result);

      return res.status(200).json(response._result);
    })
    .catch(function (error) {
      console.error('Error getting documents', error);
      return res.status(500).json(error);
    });
}

exports.createCours = createCours;
exports.getCoursById = getCoursById;
exports.getAllCours = getAllCours;
