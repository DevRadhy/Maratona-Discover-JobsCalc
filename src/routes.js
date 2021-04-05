const { Router } = require('express');

const ProfileController = require('./controllers/ProfileController');
const JobController = require('./controllers/JobController');
const DashboardController = require('./controllers/DashboardController');

const router = Router();

router.get('/', DashboardController.index);

router.get('/job', JobController.create);
router.post('/job', JobController.save);

router.get('/job/edit/:id', JobController.show);
router.post('/job/edit/:id', JobController.update);
router.post('/job/delete/:id', JobController.delete);

router.get('/profile', ProfileController.create);
router.post('/profile', ProfileController.update);


module.exports = router;