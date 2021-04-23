const { Router } = require('express');
const formControllers = require('../controllers/formController')

const router = Router();

router.get('/form', formControllers.form_get);
router.post('/form', formControllers.form_post);
router.get('/form/:id',formControllers.form_getOne);


module.exports = router;