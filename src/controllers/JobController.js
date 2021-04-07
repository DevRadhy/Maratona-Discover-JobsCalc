const Job = require('../models/Job');
const JobUtils = require('../utils/JobUtils');
const Profile = require('../models/Profile');

module.exports = {
  create(request, response) {
    response.render('job');
  },

  async save(request, response) {
    const jobs = await Job.get();
  
    await Job.create({
      name: request.body.name,
      'daily-hours': request.body['daily-hours'],
      'total-hours': request.body['total-hours'],
      created_at: Date.now(),
    });

    return response.redirect('/');
  },

  async show(request, response) {
    const { id } = request.params;

    const jobs = await Job.get();
    const profile = await Profile.get();

    const job = jobs.find(job => Number(job.id) === Number(id));

    if(!job) {
      return response.status(404).json({
        message: 'Job not found'
      })
    }

    job.budget = JobUtils.calculateBudget(job, profile['value-hour']);
    
    response.render('job-edit', { job });
  },

  async update(request, response) {
    const { id } = request.params;

    const updatedJob = {
      name: request.body.name,
      'total-hours': request.body['total-hours'],
      'daily-hours': request.body['daily-hours'],
    }

    await Job.update(updatedJob, id);

    return response.redirect(`/job/edit/${id}`);
  },

  async delete(request, response) {
    const { id } = request.params;

    await Job.delete(id);

    return response.redirect('/');
  }
}