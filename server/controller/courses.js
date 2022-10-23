import courseModel from '../models/Courses.js';
import Categories from '../models/Categories.js';

export const getCourses = async (req, res) => {
    try {
        const course = await courseModel.find().populate('User').lean();

        res.status(200).json(course);
    } catch (error) {
        console.log(error);

        res.status(500);
    }
}

export const addCourses = async (req, res) =>{
    try {
        const course = await courseModel.create(req.body);

        res.send({'success': 'true'});
    } catch (error) {
        console.log(error);
        res.status(500).json({'error': error.toString()});
    }
}

export const addCategory = async (req, res) =>{
    try {
        const categories = await Categories.create(req.body);

        res.send({'success': 'true'});
    } catch (error) {
        console.log(error);
        res.status(500).json({'error': error.toString()});
    }
}

export const filter = async (req, res ) => {
    try {
        const course = await courseModel.find({ title: req.query.title }).populate('User').lean();

        res.send(course)
    } catch (error) {
        console.log(error);
        res.status(500).send({'msg': '500'});
    }
}


export const deleteCourse = async () => {
    try {
        const course = await courseModel.deleteOne();
    } catch (error) {
        
    }
}


