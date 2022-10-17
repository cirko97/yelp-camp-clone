const express = require('express');
const router = express.Router({mergeParams: true});
const {validateReview, isLoggedIn, isReviewAuthor} = require('../middleware');
const Campground = require('../models/campground');
const Review = require('../models/review');
const reviews = require('../controllers/reviews');
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/ExpressError');


router.post('/', isLoggedIn, validateReview, wrapAsync(reviews.createReview));
    
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, wrapAsync(reviews.deleteReview));

module.exports = router;