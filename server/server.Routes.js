const controller = require("./server.Controller.js");
express = require('express');
router = express.Router();

router.get('/translate',controller.translate);
router.post('/translation',controller.translationReport);

module.exports = router;
