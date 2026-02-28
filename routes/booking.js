const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/booking");
const { isLoggedIn } = require("../middleware");

router.get("/book/:id", isLoggedIn, bookingController.renderBookingForm);
router.post("/book/:id", isLoggedIn, bookingController.createBooking);
router.get("/bookings/my", isLoggedIn, bookingController.myBookings);
router.delete("/bookings/:id", isLoggedIn, bookingController.deleteBooking);

module.exports = router;