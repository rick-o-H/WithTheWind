const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const chalk = require('chalk');
const log = console.log;

const app = express();

const port = 8080;

app.use(bodyParser.json()).use(cors());


app.listen(port, () => {
  log(chalk.magenta('With-The-Wind back-end service listening @ ') + chalk.bold.greenBright(`http://localhost:${port}`));
});
