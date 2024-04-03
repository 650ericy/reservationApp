import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import pool from '../database/index';

dotenv.config();

const upload = multer({ dest: 'uploads/' });

const app = express();
const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));


app.get('/restaurants', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM restaurants');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching restaurants:', err);
    res.status(500).send('Server error');
  }
});

app.post('/create-transaction', async (req: Request, res: Response) => {
  const { reservationId, purchasePrice, buyerContactInfo } = req.body as {
    reservationId: number;
    purchasePrice: number;
    buyerContactInfo: string;
  };

  try {
    const purchaseDate = new Date().toISOString().slice(0, 10);
    const queryText = 'INSERT INTO Transactions (ReservationID, PurchaseDate, PurchasePrice, BuyerContactInfo) VALUES ($1, $2, $3, $4) RETURNING *';
    const queryValues: any[] = [reservationId, purchaseDate, purchasePrice, buyerContactInfo];
    const result = await pool.query(queryText, queryValues);

    res.json(result.rows[0]);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error creating transaction:', error.stack);
    } else {
      console.error('Unknown error in /create-transaction endpoint:', error);
    }
    res.status(500).send('Server error');
  }
});

app.post('/sell', upload.single('image'), async (req: Request, res: Response) => {
  const {
    restaurant_id,
    name,
    date,
    time,
    price,
    number_of_people,
    contactInfo
  } = req.body as {
    restaurant_id: string;
    name: string;
    date: string;
    time: string;
    price: string;
    number_of_people: string;
    contactInfo: string;
  };
  const imagePath = req.file ? req.file.path : '';

  try {
    const queryText = 'INSERT INTO Reservations (RestaurantID, Name, Date, Time, Price, NumberOfPeople, ContactInfo, isPurchased, ImagePath) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';

    const queryValues: any[] = [
      parseInt(restaurant_id, 10),
      name,
      date,
      time,
      parseFloat(price),
      parseInt(number_of_people, 10),
      contactInfo,
      false,
      imagePath
    ];

    const newReservation = await pool.query(queryText, queryValues);

    res.json(newReservation.rows[0]);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Error in /sell endpoint:', err.stack);
    } else {
      console.error('Unknown error in /sell endpoint:', err);
    }
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
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.stack);
    } else {
      console.error('Unknown error', err);
    }
    res.status(500).send('Server error');
  }
});

app.patch('/update-reservation/:id', async (req, res) => {
  const { id } = req.params;
  const { isPurchased } = req.body;

  try {
    await pool.query('UPDATE Reservations SET isPurchased = $1 WHERE reservationid = $2', [isPurchased, id]);
    res.send('Reservation updated successfully');
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error updating reservation:', error.stack);
    } else {
      console.error('Unknown error', error);
    }
    res.status(500).send('Server error');
  }
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});