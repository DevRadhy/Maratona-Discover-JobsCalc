const Database = require('./config');

const initDb = {
  async init() {
    const db = await Database();
  
    await db.exec(`CREATE TABLE profile (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR,
      avatar TEXT,
      monthly_budget INTEGER,
      days_per_week INTEGER,
      hours_per_day INTEGER,
      vacation_per_year INTEGER,
      value_hour INTEGER
    )`);
  
    await db.exec(`CREATE TABLE jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR,
      daily_hours INTEGER,
      total_hours INTEGER,
      created_at DATETIME
    )`);
  
    await db.run(`INSERT INTO profile (
      name,
      avatar,
      monthly_budget,
      days_per_week,
      hours_per_day,
      vacation_per_year,
      value_hour
    ) VALUES (
        "Lucas",
        "https://github.com/DevRadhy.png",
        3000,
        5,
        5,
        4,
        75
    )`);
  
    await db.run(`INSERT INTO jobs (
      name,
      daily_hours,
      total_hours,
      created_at
    ) VALUES (
        "Pizzaria Guloso",
        2,
        10,
        1617768563967
    )`);
  
    await db.run(`INSERT INTO jobs (
      name,
      daily_hours,
      total_hours,
      created_at
    ) VALUES (
        "OneTwoProject",
        3,
        47,
        1617768563967
    )`);
  
    await db.close();
  }
}

initDb.init();