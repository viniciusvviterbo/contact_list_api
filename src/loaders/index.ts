import { Application } from 'express';
import expressLoader from './express';

export default ({ expressApp }: { expressApp: Application }): void => {
  expressLoader({ app: expressApp });
};

