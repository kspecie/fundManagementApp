import 'dotenv/config';
import express, { Request, Response } from 'express';    
import { Pool } from 'pg';
import fundRoutes from './routes/fundRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

//Database Connection
const pool = new Pool({
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '5432'),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
});

// Ensure the pool is connected before starting the server
pool.connect()
        .then(() => console.log('Database connected'))
        .catch(err => console.error('Database connection error:', err));

// // Basic health check to ensure server is running
// app.get('/health', async (req: Request, res: Response) => {
//         try {
//             await pool.query('SELECT NOW()');
//             res.status(200).json({ status: 'ok', database: 'connected' });
//         } catch (error) {
//             console.error('Database connection failed:', error);
//             res.status(503).json({ status: 'error', database: 'disconnected' });
//         }
//     });

app.use('/funds', fundRoutes);


// Start Server
app.listen(PORT, () => {
    console.log(`Server listening on PORT:${PORT}`);
  });