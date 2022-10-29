import express from 'express';
import { addCategory, addCourses, getCourses, filter, deleteCourse } from '../controller/courses.js';
import { ensureAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.get('/', ensureAuthenticated, getCourses);

router.post('/add', ensureAuthenticated, addCourses);

router.post('/category/add', ensureAuthenticated, addCategory);

router.get('/get', ensureAuthenticated, filter);

router.get('/delete', ensureAuthenticated, deleteCourse);



export default router;