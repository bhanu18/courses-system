import express from 'express';
import { addCategory, addCourses, getCourses, filter } from '../controller/courses.js';

const router = express.Router();

router.get('/', getCourses);

router.post('/add', addCourses);

router.post('/category/add', addCategory);

router.get('/get', filter);



export default router;