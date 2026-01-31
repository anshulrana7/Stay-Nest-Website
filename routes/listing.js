const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListings} = require("../middleware.js");
const path = require("node:path");
const listingController = require("../controllers/listings.js");
const multer = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage})//multer store the file in cloudinary storage
// uploads folder k andr file store 
// krwa rhe h temporary baad mai to cloud p krni h

router
    .route("/")
    .get( wrapAsync(listingController.index))
    .post(
    isLoggedIn,
    upload.single('listing[image]'),
    validateListings,
    wrapAsync(listingController.createListing)
);

//NEW ROUTE
router.get("/new",isLoggedIn,listingController.renderNewForm );


router
    .route("/:id")
    .get(wrapAsync(listingController.showListings))
    .put(
        isLoggedIn,
        isOwner,
        upload.single('listing[image]'),
        validateListings,
        wrapAsync(listingController.updateListing)
    )
    .delete(
        isLoggedIn,
        isOwner, 
        wrapAsync(listingController.destroyListing)
    );

// //Index routes
// router.get("/", wrapAsync(listingController.index));

//Show ROUTE
// router.get("/:id",wrapAsync(listingController.showListings));

// //CREATE ROUTE
// router.post("/" , 
//     isLoggedIn,
//     validateListings,
//     wrapAsync(listingController.createListing)
// );


// EDIT ROUTE
router.get("/:id/edit" ,isLoggedIn,isOwner, wrapAsync(listingController.editForm));


// //UPDATE ROUTE
// router.put("/:id",
//     isLoggedIn,
//     isOwner,
//     validateListings,
//     wrapAsync(listingController.updateListing));

//DELETE ROUTE
// router.delete("/:id" ,isLoggedIn,isOwner,   wrapAsync(listingController.destroyListing));

module.exports = router;