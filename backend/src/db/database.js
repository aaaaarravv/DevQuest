const Datastore = require('nedb-promises');
const path = require('path');
const fs = require('fs');

const DB_DIR = path.join(__dirname, '../../data');
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

function store(name) {
  return Datastore.create({
    filename: path.join(DB_DIR, `${name}.db`),
    autoload: true,
  });
}

const db = {
  users:    store('users'),
  projects: store('projects'),
  tasks:    store('tasks'),
  notes:    store('notes'),
};

module.exports = db;
