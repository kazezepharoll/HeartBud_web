import express from'express';
const router = express.Router();
import db from '../db.js';

// Route to get all patients
router.get('/patients', (req, res) => {
  const query = 'SELECT * FROM patients';
  db.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching patients' });
    } else {
      res.json(results);
    }
  });
});

// Add more patient-related routes here

export default router;
