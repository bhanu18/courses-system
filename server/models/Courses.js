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
    intructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    },
    price: {
        type: String
    },
    time:{
        type: String,
    },
    Category: {
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