import express from 'express';
import { addCourses, getCourses } from '../controller/courses.js';

const router = express.Router();

router.get('/', getCourses);

router.post('/add', addCourses);


export default router;