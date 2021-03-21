const CoursService = require('../services/cours');
const dbConfig = require('../../config/db');
const { arangojs, aql } = require('arangojs');

const db = new arangojs.Database({
  url: dbConfig.url,
});
db.useDatabase(dbConfig.database);
db.useBasicAuth(dbConfig.username, dbConfig.password);

const COURS = db.collection('COURS');

function createCours(req, res) {
  const cours = {
    id: req.body.id,
    titreCours: req.body.titreCours,
    nbTopic: req.body.nbTopic,
    nbPosts: req.body.nbPosts,
    lastPost: Date(),
  };

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

async function getCoursById(req, res) {
  if (!req.params.id) {
    return res.status(500).json({ message: "L'id n'existe pas !" });
  }
  try {
    const result = await db.query(
      aql`
      FOR cours IN ${COURS}
      FILTER cours.id == ${req.params.id}
      RETURN cours
  
  `
    );
    const value = await result.all();

    return res.status(200).json({ message: 'Ok', data: value });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: 'error' });
  }
}

async function getAllCours(req, res) {
  try {
    const result = await db.query(
      aql`
      FOR cours IN ${COURS}
      RETURN cours
  
  `
    );
    const value = await result.all();

    return res.status(200).json({ message: 'Ok', data: value });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: 'error' });
  }
}

async function getAllCoursAlpha(req, res) {
  try {
    const result = await db.query(
      aql`
    FOR cours IN ${COURS}
    SORT cours.titreCours
    RETURN cours.titreCours
  `
    );
    const value = await result.all();

    return res.status(200).json({ message: 'Ok', data: value });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: 'error' });
  }
  /*const result = await db.query(
    aql`
  FOR cours IN ${COURS}
  SORT cours.titreCours
  RETURN cours
`
  );
  const value = await result.all();
  console.log(value);
  return res.status(200).json({ message: 'Ok', data: value });*/
}

async function getCoursByPromo(req, res) {
  if (!req.body.promo) {
    return res.status(500).json({ message: 'Erreur sur le nom de la promo !' });
  }
  try {
    const result = await db.query(
      aql`
      FOR cours IN ${COURS}
      FILTER cours.promo == ${req.body.promo}
      RETURN cours.titreCours     
  `
    );
    const value = await result.all();

    return res.status(200).json({ message: 'Ok', data: value });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: 'error' });
  }
}

async function getCoursByPromoAlpha(req, res) {
  if (!req.body.promo) {
    return res.status(500).json({ message: 'Erreur sur le nom de la promo !' });
  }
  try {
    const result = await db.query(
      aql`
      FOR cours IN ${COURS}
      FILTER cours.promo == ${req.body.promo}
      SORT cours.titreCours
      LIMIT 3
      RETURN cours.titreCours 
  `
    );
    const value = await result.all();

    return res.status(200).json({ message: 'Ok', data: value });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: 'error' });
  }
}

exports.createCours = createCours;
exports.getCoursById = getCoursById;
exports.getAllCours = getAllCours;
exports.getAllCoursAlpha = getAllCoursAlpha;
exports.getCoursByPromo = getCoursByPromo;
exports.getCoursByPromoAlpha = getCoursByPromoAlpha;
