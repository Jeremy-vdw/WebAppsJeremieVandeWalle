let mongoose = require('mongoose');

let SummarySchema = new mongoose.Schema({
    name: String,
    link: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    course: {type: mongoose.Schema.Types.ObjectId, ref: 'Course'},
    academicYear: {type: mongoose.Schema.Types.ObjectId, ref: 'AcademicYear'},
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    ratings: [{type: mongoose.Schema.Types.ObjectId, ref: 'Rating'}]
});

mongoose.model('Summary', SummarySchema);