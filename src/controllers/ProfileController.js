const Profile = require('../models/Profile');

module.exports = {
  create(request, response) {
    response.render('profile', { profile: Profile.get() });
  },
  update(request, response) {
    const data = request.body;

    const weeksPerYear = 52;
    const weeksPerMonth = (weeksPerYear - data['vacation-per-year']) / 12;
    const weekTotalHours = data['hours-per-day'] * data['days-per-week'];
    const montlyTotalHours = weekTotalHours * weeksPerMonth;

    const valueHour = data['monthly-budget'] / montlyTotalHours;

    Profile.update({
      ...Profile.get(),
      ...request.body,
      'value-hour': valueHour,
    });

    return response.redirect('profile');
  }
}