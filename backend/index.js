import express from 'express';
import sequelize from './config/db.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import tasksRoutes from './routes/tasks.js';

const app = express();
const PORT = 5000;

app.use(cors({
  origin: 'https://task-manager-git-main-shauuuhs-projects.vercel.app/',
  optionsSuccessStatus: 200
}));

app.use(bodyParser.json());

app.use('/tasks', tasksRoutes);

sequelize.sync()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.log('Error connecting the database', err));