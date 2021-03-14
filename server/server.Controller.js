// Imports the Google Cloud client library
const {Translate} = require('@google-cloud/translate').v2;
// Creates a client
const Session = require('./SessionSchema.js');
const projectId = require('./config.js').projectId;
const keyFilename = require('./config.js').keyFilename;
const translate = new Translate({projectId, keyFilename});
/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */

const target = 'nl';

async function translateText(text,lang) {
  // Translates the text into the target language. "text" can be a string for
  // translating a single piece of text, or an array of strings for translating
  // multiple texts.
  let [translations] = await translate.translate(text, lang);
  translations = Array.isArray(translations) ? translations : [translations];
  console.log('Translations:');
  translations.forEach((translation, i) => {
    console.log(`${text[i]} => (${target}) ${translation}`);
  });
  return translations[0];
}

exports.translate = async (req,res)=> {
  var g = await translateText(req.query.text,req.query.lang);
  res.status(200).send(g);
};

exports.translationReport = (req,res)=> {
  console.log(req.body);
  console.log(req.body.time);
  var timer = (req.query.time == -1) ? Date.now() : req.body.time;
  const translation = new Session({time: timer,input: req.body.input,output: req.body.output, lang: req.body.lang, accepted: req.body.accepted });
  translation.save();
  res.status(200).send(Date.now().toString());
};