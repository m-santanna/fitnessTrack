const express = require('express');
const app = express();
const PORT = 8080;

app.listen(PORT, () => {
    console.log(`app running at ${PORT}`);
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });