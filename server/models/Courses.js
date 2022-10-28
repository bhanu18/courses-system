import mongoose from 'mongoose';

const courseSchema = mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type:String
    },
    image: {
        type: String
    },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    price: {
        type: String
    },
    time:{
        type: String,
    },
    Categories: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories'
    },
    createAt: {
        type: String,
        default: Date.now()
    }
})

const courseModel = mongoose.model('courseModel', courseSchema);

export default courseModel;