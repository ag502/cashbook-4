import mysql from 'mysql2';
import dbEnv from './config/db-env.js';

const pool = mysql.createPool({
  host: dbEnv.DB_HOST,
  user: dbEnv.DB_USER,
  database: dbEnv.DB_NAME,
  password: dbEnv.DB_PASSWORD,
});

const connection = pool.getConnection(async (conn) => conn);

(async function () {
  await pool.execute(`
INSERT INTO category (id, name, createdAt, updatedAt)
VALUES
	(1, '월급', current_date(), current_date()),
	(2, '용돈', current_date(), current_date()),
	(3, '기타수입', current_date(), current_date()),
	(4, '생활', current_date(), current_date()),
	(5, '식비', current_date(), current_date()),
	(6, '교통', current_date(), current_date()),
	(7, '쇼핑/뷰티', current_date(), current_date()),
	(8, '의료/건강', current_date(), current_date()),
	(9, '문화/여가', current_date(), current_date()),
	(10, '미분류', current_date(), current_date());
  `);
})();
