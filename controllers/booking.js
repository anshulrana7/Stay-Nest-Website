const Booking = require("../models/booking");
const Listing = require("../models/listing");


// 📌 SHOW BOOKING FORM
module.exports.renderBookingForm = async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }

  res.render("bookings/form", { listing });
};



// 📌 CREATE BOOKING
module.exports.createBooking = async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }

  const { checkIn, checkOut } = req.body;

  // 🛑 EMPTY CHECK
  if (!checkIn || !checkOut) {
    req.flash("error", "Please select both dates");
    return res.redirect("back");
  }

  const start = new Date(checkIn);
  const end = new Date(checkOut);

  // 🛑 INVALID DATE CHECK
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    req.flash("error", "Invalid date");
    return res.redirect("back");
  }

  // 🛑 DATE ORDER CHECK
  if (start >= end) {
    req.flash("error", "Check-out must be after check-in");
    return res.redirect("back");
  }

  // 🛑 DATE CONFLICT CHECK
  const existingBooking = await Booking.findOne({
    property: listing._id,
    checkIn: { $lt: end },
    checkOut: { $gt: start },
  });

  if (existingBooking) {
    req.flash("error", "Property already booked for selected dates");
    return res.redirect("back");
  }

  // ✅ SAVE BOOKING
  const newBooking = new Booking({
    property: listing._id,
    user: req.user._id,
    checkIn: start,
    checkOut: end,
    totalPrice: listing.price,
  });

  await newBooking.save();

  req.flash("success", "Booking Confirmed!");
  res.redirect("/bookings/my");
};



// 📌 SHOW LOGGED-IN USER BOOKINGS
module.exports.myBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate("property");

  res.render("bookings/index", { bookings });
};



// 📌 DELETE BOOKING
module.exports.deleteBooking = async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);

  req.flash("success", "Booking cancelled");
  res.redirect("/bookings/my");
};