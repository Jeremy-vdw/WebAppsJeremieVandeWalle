let mongoose = require('mongoose');

let AcademicYearSchema = new mongoose.Schema({
    name: String
});

AcademicYearSchema.pre('remove', function(next){
    this.model('Summary').remove({academicYear: this._id}, next);
})
mongoose.model('AcademicYear', AcademicYearSchema);