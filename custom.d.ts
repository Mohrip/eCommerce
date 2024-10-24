import { User } from './src/USERS/users/users.entity'; 

declare module 'express' {
  interface Request {
    user?: User; 
  }
}