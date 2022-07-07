import { Router } from 'express';
import persons from './routes/persons';
import contacts from './routes/contacts';

export default (): Router => {
  const app = Router();
  persons(app);
  contacts(app);
  return app;
};
