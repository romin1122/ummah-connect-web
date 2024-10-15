import mysql from 'mysql';

export const db = mysql.createConnection({
  host: 'localhost',
  user: 'lama',
  password: 'romin1122',
  database: 'lama',
});
