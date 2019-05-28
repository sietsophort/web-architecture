import express from 'express';
// import { verifySession } from '../middlewares';
import auth from '../controllers/auth';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});
router.post('/login', auth.authenticate);

export default router;
