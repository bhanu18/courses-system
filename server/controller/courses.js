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

        res.send({'success': true});
    } catch (error) {
        console.log(error);
        res.status(500).json({'error': error.toString()});
    }
}

export const filter = async (req, res ) => {
    try {

        let searchObj = {};

        if(req.query.title){
            searchObj = {
                title: req.query.title
            }
        }

        if(req.query.price){
            searchObj = {
                price: req.query.price
            }
        }

        const course = await courseModel.find(searchObj).populate('User').lean();

        if(course.length == 0){
            res.status(200).send('No courses');
        }else{
            let response = {
                "success": true,
                "data": course
            }
            //console.log(searchObj);
            res.status(200).send(response);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({'msg': '500'});
    }
}


export const deleteCourse = async (req, res) => {
    try {
        await courseModel.deleteOne({ _id: req.query.id});

        res.json({'msg': "course deleted"})
        
    } catch (error) {
        console.log(error);
        
    }
}


