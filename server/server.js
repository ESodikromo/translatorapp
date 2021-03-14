const express = require('./express.js');

const port = process.env.PORT || 8082;

const app = express.init();

app.listen(port, () => console.log(`Server running on port ${port}`));