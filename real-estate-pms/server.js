const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import database
const db = require('./database');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Test server route
app.get('/', (req, res) => {
  res.send('Real Estate PMS API is running');
});

// Test database query
app.get('/test-db', (req, res) => {
  db.all('SELECT name FROM properties', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ properties: rows });
  });
});

// ===== Property Routes ===== //

// Add a new property
app.post('/api/properties', (req, res) => {
  const { name, location, type, rent_price, status, bedrooms, bathrooms, square_feet } = req.body;

  const sql = `INSERT INTO properties (name, location, type, rent_price, status, bedrooms, bathrooms, square_feet)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [name, location, type, rent_price, status, bedrooms, bathrooms, square_feet];

  db.run(sql, params, function(err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ message: 'Property added successfully', propertyId: this.lastID });
  });
});

// Get all properties
app.get('/api/properties', (req, res) => {
  db.all('SELECT * FROM properties', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ properties: rows });
  });
});

// ===== Tenant Routes ===== //

// Add a new tenant
app.post('/api/tenants', (req, res) => {
  const { name, contact, email, start_date, end_date, property_id } = req.body;

  const sql = `INSERT INTO tenants (name, contact, email, start_date, end_date, property_id)
               VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [name, contact, email, start_date, end_date, property_id];

  db.run(sql, params, function(err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ message: 'Tenant added successfully', tenantId: this.lastID });
  });
});

// Get all tenants
app.get('/api/tenants', (req, res) => {
  db.all('SELECT * FROM tenants', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ tenants: rows });
  });
});

// Get tenants by property ID
app.get('/api/properties/:id/tenants', (req, res) => {
  const propertyId = req.params.id;
  db.all('SELECT * FROM tenants WHERE property_id = ?', [propertyId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ tenants: rows });
  });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
