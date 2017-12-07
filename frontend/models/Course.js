let mongoose = require('mongoose');

let CourseSchema = new mongoose.Schema({
    courseName: String,
    courseYear: String
});

CourseSchema.pre('remove', function(next){
    this.model('Summary').remove({course: this._id}, next);
})

mongoose.model('Course', CourseSchema);