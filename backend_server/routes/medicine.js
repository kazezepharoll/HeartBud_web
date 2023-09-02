import express from'express';
const router = express.Router();
import db from '../db.js';

// Route to get all medicines
router.get('/medicines', (req, res) => {
  const query = 'SELECT * FROM medicines';
  db.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching medicines' });
    } else {
      res.json(results);
    }
  });
});

// Add more medicine-related routes here

export default router;
