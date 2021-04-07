const Database = require('../database/config');

module.exports = {
  async get() {
    const db = await Database();

    const data = await db.get(`SELECT * FROM  profile`);

    await db.close();

    return {
      name: data.name,
      avatar: data.avatar,
      "monthly-budget": data.monthly_budget,
      "days-per-week": data.days_per_week,
      "hours-per-day": data.hours_per_day,
      "vacation-per-year": data.vacation_per_year,
      "value-hour": data.value_hour,
    }
  },
  
  async update(data) {
    const db = await Database();

  db.run(`UPDATE profile SET
      name = "${data.name}",
      avatar = "${data.avatar}",
      monthly_budget = ${data['monthly-budget']},
      days_per_week = ${data['days-per-week']},
      hours_per_day = ${data['hours-per-day']},
      vacation_per_year = ${data['vacation-per-year']},
      value_hour = ${data['value-hour']}
    `);

    await db.close();
  }
};