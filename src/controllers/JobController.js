const Job = require('../models/Job');
const JobUtils = require('../utils/JobUtils');
const Profile = require('../models/Profile');

module.exports = {
  create(request, response) {
    response.render('job');
  },
  save(request, response) {
    const jobs = Job.get();

    const lastId = jobs[jobs.length - 1]?.id || 0;
  
    jobs.push({
      id: lastId + 1,
      name: request.body.name,
      'daily-hours': request.body['daily-hours'],
      'total-hours': request.body['total-hours'],
      created_at: Date.now(),
    });

    return response.redirect('/');
  },
  show(request, response) {
    const { id } = request.params;

    const jobs = Job.get();
    const profile = Profile.get();

    const job = jobs.find(job => Number(job.id) === Number(id));

    if(!job) {
      return response.status(404).json({
        message: 'Job not found'
      })
    }

    job.budget = JobUtils.calculateBudget(job, profile['value-hour']);
    
    response.render('job-edit', { job });
  },
  update(request, response) {
    const { id } = request.params;

    const jobs = Job.get();

    const job = jobs.find(job => Number(job.id) === Number(id));

    if(!job) {
      return response.status(404).json({
        message: 'Job not found'
      })
    }

    const updatedJob = {
      ...job,
      ...request.body,
      name: request.body.name,
      'total-hours': request.body['total-hours'],
      'dayly-hours': request.body['daily-hours'],
    }

    const newJob = jobs.map(job => {
      if(Number(job.id) === Number(id)) {
        job = updatedJob;
      }

      return job;
    });

    Job.update(newJob);

    return response.redirect(`/job/edit/${id}`);
  },
  delete(request, response) {
    const { id } = request.params;

    Job.delete(id);

    return response.redirect('/');
  }
}