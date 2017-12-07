let mongoose = require('mongoose');

let CommentSchema = new mongoose.Schema({
    text: String,
    date: Date,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

CommentSchema.pre('remove', function(next){
    this.model('Summary').remove({comments: this._id}, next);
})
mongoose.model('Comment', CommentSchema);