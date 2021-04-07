const Profile = require('../models/Profile');

module.exports = {
  async create(request, response) {
    const profile = await Profile.get();

    response.render('profile', { profile });
  },
  async update(request, response) {
    const data = request.body;

    const weeksPerYear = 52;
    const weeksPerMonth = (weeksPerYear - data['vacation-per-year']) / 12;
    const weekTotalHours = data['hours-per-day'] * data['days-per-week'];
    const montlyTotalHours = weekTotalHours * weeksPerMonth;

    const valueHour = data['monthly-budget'] / montlyTotalHours;

    const profile = await Profile.get();

    await Profile.update({
      ...profile,
      ...request.body,
      'value-hour': valueHour,
    });

    return response.redirect('profile');
  }
}