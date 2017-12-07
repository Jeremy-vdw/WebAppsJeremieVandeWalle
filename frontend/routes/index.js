var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Summary = mongoose.model('Summary');
let Comment = mongoose.model('Comment');
let AcademicYear = mongoose.model('AcademicYear');
let Course = mongoose.model('Course');
let Rating = mongoose.model('Rating');
let jwt = require('express-jwt');

let auth = jwt({secret: process.env.SUMMARY_BACKEND_SECRET, userProperty: 'payload'});

/* summaries API CALLS */
/* get all summaries */
router.get('/api/summaries/', function(req, res, next){
  let query = Summary.find().populate('comments').populate('ratings').populate('academicYear').populate('course').populate('user');
  query.exec(function(err, summaries){
    if(err) {
      return next(err);
    }
    res.json(summaries);
  });
})

/* get all summaries from logged in user */
router.get('/api/summaries/me', auth, function(req, res, next){
  let query = Summary.find({user: req.payload._id}).populate('comments').populate('ratings').populate('academicYear').populate('course').populate('user');
  query.exec(function (err, summaries){
    if(err) return next(err);
    if(!summaries) return next(new Error('no summaries found'));
    res.json(summaries);
  })
})

router.param('summary', function(req, res, next, id) {
  let query = Summary.findById(id).populate({
    path: 'comments',
    // get comments of summaries - populate the user for every comment
    populate: { path: 'user' }
  })
  .populate({ path: 'ratings', populate: { path: 'user' }})
  .populate('academicYear').populate('course').populate('user');
  query.exec(function (err, summary){
    if (err) { return next(err); }
    if (!summary) { return next(new Error('not found ' + id)); }
    req.summary = summary;
    return next();
  });
});   

/* get summary by id */
router.get('/api/summary/:summary', function(req, res) {
  res.json(req.summary);
});

/* delete summary by id */
router.delete('/api/summary/:summary', auth, function(req, res, next) {
  Comment.remove({ _id: {$in: req.summary.comments }}, function(err) {
    if (err) { return next(err); }   
    Rating.remove({ _id: {$in: req.summary.ratings }}, function(err){
      req.summary.remove(function(err){
        if(err) return next(err); 
        res.json(req.summary);
    });
    })
  });
})

/* post a summary */
router.post('/api/summaries/', auth, function(req, res, next){
  let summary = new Summary({name: req.body.name, link: req.body.link, user: req.payload._id, course: req.body.course, academicYear: req.body.academicYear});
  summary.save(function(err, rec){
    if(err) { return next(err); }
    res.json(rec);
  }); 
})

/* post a comment to a summary */
router.post('/api/summary/:summary/comments',  auth, function(req, res, next){
  let comment = new Comment({text: req.body.text, date: req.body.date, user: req.payload._id});
  comment.save(function(err, comm){
    if(err) return next(err);
    req.summary.comments.push(comm);
    req.summary.save(function(err, rec){
      if(err) return next(err);
    })
    res.json(comm)
  })
})

/* post a rating to a summary */
router.post('/api/summary/:summary/ratings', auth, function(req, res, next){
  let rating = new Rating({number: req.body.number, user: req.payload._id});
  rating.save(function(err, rat){
    if(err) return next(err);
    req.summary.ratings.push(rat);
    req.summary.save(function(err, rec){
      if(err) return next(err);
    })
    res.json(rat)
  })
})



/* course API CALLS */
/* post a course */
router.post('/api/courses/', function(req, res, next){
  let course = new Course({courseName: req.body.courseName, courseYear: req.body.courseYear});
  course.save(function(err, rec){
    if(err) { return next(err); }
    res.json(rec);
  });
})
/* get all courses */
router.get('/api/courses/', function(req, res, next){
  Course.find(function(err, courses){
    if(err) {
      return next(err);
    }
    res.json(courses);
  });
})
/* get all courses by courseYear */
router.get('/api/courses/:courseYear', function(req, res, next){
  let query = Course.find({courseYear: req.params.courseYear});
  query.exec(function (err, courses){
    if(err) return next(err);
    if(!courses) return next(new Error('no summaries found'));
    res.json(courses);
  })
})

/* cademicYear API CALLS */
/* post an academicYears */
router.post('/api/academicYears/', function(req, res, next){
  let year = new AcademicYear({name: req.body.name});
  year.save(function(err, rec){
    if(err) { return next(err); }
    res.json(rec);
  });
})
/* get all academicYears */
router.get('/api/academicYears/', function(req, res, next){
  AcademicYear.find(function(err, academicYears){
    if(err) {
      return next(err);
    }
    res.json(academicYears);
  });
})
module.exports = router;
