module.exports = {
  remainingDays(job) {
    const remainDays = (job['total-hours'] / job['daily-hours']).toFixed();
  
    const createdDate = new Date(job.created_at);
    const dueDay = createdDate.getDate() + Number(remainDays);
    const dueDateInMs = createdDate.setDate(dueDay);
  
    const timeDiffInMs = dueDateInMs - Date.now();
    const dayInMs = 1000 * 60 * 60 * 24;
  
    const dayDiff = Math.floor(timeDiffInMs / dayInMs);
  
    return dayDiff;
  },
  calculateBudget(job, valueHours) {
    return valueHours * job['total-hours'];
  }
}