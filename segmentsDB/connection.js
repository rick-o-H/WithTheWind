const { EC2_URI } = require('../config');
const mongoose = require('mongoose');
const chalk = require('chalk');
const log = console.log;

class DB {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose.connect(EC2_URI, { useCreateIndex: true , useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log(chalk.blue('Successfully connected to database!'));
      })
      .catch(err => {
        console.error(chalk.red(err, 'Database connection error'));
      });
  }
}

module.exports = new DB();