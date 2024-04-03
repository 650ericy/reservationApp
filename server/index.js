const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const pool = require('../database/index.js');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

// Endpoint to fetch all restaurants
app.get('/restaurants', async (req, res) => {
  try {
    console.log('Fetching restaurants...');
    const result = await pool.query('SELECT * FROM restaurants');
    console.log('Restaurants fetched:', result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching restaurants:', err.stack);
    res.status(500).send('Server error');
  }
});

app.post('/create-transaction', async (req, res) => {
  const { reservationId, purchasePrice, buyerContactInfo } = req.body;

  try {
    const purchaseDate = new Date().toISOString().slice(0, 10); // Format as YYYY-MM-DD
    const result = await pool.query(
      'INSERT INTO Transactions (ReservationID, PurchaseDate, PurchasePrice, BuyerContactInfo) VALUES ($1, $2, $3, $4) RETURNING *',
      [reservationId, purchaseDate, purchasePrice, buyerContactInfo]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error creating transaction:', error.stack);
    res.status(500).send('Server error');
  }
});

app.post('/sell', upload.single('image'), async (req, res) => {
  try {
    const { restaurant_id, name, date, time, price, number_of_people, contactInfo } = req.body;
    const imagePath = req.file ? req.file.path : ''; // Adjust according to how you handle uploads

    const newReservation = await pool.query(
      'INSERT INTO Reservations (RestaurantID, Name, Date, Time, Price, NumberOfPeople, ContactInfo, isPurchased, ImagePath) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [restaurant_id, name, date, time, price, number_of_people, contactInfo, false, imagePath]
    );

    res.json(newReservation.rows[0]);
  } catch (err) {
    console.error('Error in /sell endpoint:', err.stack);
    res.status(500).send('Server error');
  }
});

app.get('/reservations', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
          r.reservationid,
          r.restaurantid,
          res.name AS restaurant_name,
          r.name,
          r.date,
          r.time,
          r.price,
          r.numberofpeople,
          r.contactinfo,
          r.isPurchased
      FROM
          Reservations r
      JOIN
          Restaurants res ON r.restaurantid = res.restaurantid
      WHERE
          r.isPurchased = FALSE;
  `);
    res.json(result.rows);
  } catch (err) {
    console.error(err.stack);
    res.status(500).send('Server error');
  }
});

app.patch('/update-reservation/:id', async (req, res) => {
  const { id } = req.params;
  const { isPurchased } = req.body;

  try {
    await pool.query('UPDATE Reservations SET isPurchased = $1 WHERE reservationid = $2', [isPurchased, id]);
    res.send('Reservation updated successfully');
  } catch (error) {
    console.error('Error updating reservation:', error.stack);
    res.status(500).send('Server error');
  }
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
