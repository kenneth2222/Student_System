const router = require('express').Router();
const {createStudent, getStudents, updateStudent, deleteStudent} = require('../controller/controllers');


router.post('/student', createStudent);
router.get('/students', getStudents);
router.put('/student/:id', updateStudent);
router.delete('/student/:id', deleteStudent);


module.exports = router;