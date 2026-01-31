const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema , reviewSchema} = require("./schema.js");


module.exports.isLoggedIn = (req, res, next)=>{
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must be logged in to create listing!");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req,res,next) =>{
    if(req.session.redirectUrl)
    {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async(req, res, next) =>{
    let {id} = req.params; 
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id))
    {
        req.flash("error","You are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.validateListings = (req, res, next) => {
    const { error } = listingSchema.validate(req.body || {});

    if (error) {
        const msg =  error.details.map((el) => el.message).join(", ");
        throw new ExpressError(400, msg);
    }

    next();
};

module.exports.validateReview = (req, res, next) => {
    console.log("Current Body:", req.body);
  const { error } = reviewSchema.validate(req.body || {});
  if (error) {
    const msg = error.details.map(el => el.message).join(", ");
    throw new ExpressError(400, msg);
  }
  next();
};

module.exports.isReviewAuthor = async(req, res, next) =>{
    let {id,reviewId} = req.params; 
    let review = await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currUser._id))
    {
        req.flash("error","You are not the author of this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

// const Listing = require("./models/listing");
// const Review = require("./models/review");
// const ExpressError = require("./utils/ExpressError.js");
// const { listingSchema, reviewSchema } = require("./schema.js");

// /* ================= AUTH ================= */

// module.exports.isLoggedIn = (req, res, next) => {
//     if (!req.isAuthenticated()) {
//         req.session.returnTo = req.originalUrl;
//         req.flash("error", "You must be logged in!");
//         return res.redirect("/login"); // ✅ STOP execution
//     }
//     return next();
// };

// module.exports.saveRedirectUrl = (req, res, next) => {
//     if (req.session.returnTo) {
//         res.locals.redirectUrl = req.session.returnTo;
//         delete req.session.returnTo; // ✅ prevent reuse
//     }
//     return next();
// };

// /* ================= OWNERSHIP ================= */

// module.exports.isOwner = async (req, res, next) => {
//     const { id } = req.params;
//     const listing = await Listing.findById(id);

//     if (!listing) {
//         return next(new ExpressError(404, "Listing not found"));
//     }

//     if (!listing.owner._id.equals(res.locals.currUser._id)) {
//         req.flash("error", "You are not the owner of this listing");
//         return res.redirect(`/listings/${id}`);
//     }

//     return next();
// };

// module.exports.isReviewAuthor = async (req, res, next) => {
//     const { id, reviewId } = req.params;
//     const review = await Review.findById(reviewId);

//     if (!review) {
//         return next(new ExpressError(404, "Review not found"));
//     }

//     if (!review.author._id.equals(res.locals.currUser._id)) {
//         req.flash("error", "You are not the author of this review");
//         return res.redirect(`/listings/${id}`);
//     }

//     return next();
// };

// /* ================= VALIDATION ================= */

// module.exports.validateListings = (req, res, next) => {
//     const { error } = listingSchema.validate(req.body || {});
//     if (error) {
//         const msg = error.details.map(el => el.message).join(", ");
//         return next(new ExpressError(400, msg));
//     }
//     return next();
// };

// module.exports.validateReview = (req, res, next) => {
//     const { error } = reviewSchema.validate(req.body || {});
//     if (error) {
//         const msg = error.details.map(el => el.message).join(", ");
//         return next(new ExpressError(400, msg));
//     }
//     return next();
// };
