const sqlite3 = require('sqlite3').verbose();

// Create or open database file
const db = new sqlite3.Database('./pms.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the PMS database.');
  }
});

// Create Properties table
db.run(`CREATE TABLE IF NOT EXISTS properties (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  location TEXT,
  type TEXT,
  rent_price REAL,
  status TEXT,
  bedrooms INTEGER,
  bathrooms INTEGER,
  square_feet REAL
)`);

// Create Tenants table
db.run(`CREATE TABLE IF NOT EXISTS tenants (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  contact TEXT,
  email TEXT,
  start_date TEXT,
  end_date TEXT,
  property_id INTEGER,
  FOREIGN KEY(property_id) REFERENCES properties(id)
)`);

module.exports = db;
