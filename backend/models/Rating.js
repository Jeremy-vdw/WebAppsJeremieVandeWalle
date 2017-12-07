let mongoose = require('mongoose');

let RatingSchema = new mongoose.Schema({
    number: Number,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

RatingSchema.pre('remove', function(next){
    this.model('Summary').remove({ratings: this._id}, next);
})
mongoose.model('Rating', RatingSchema);