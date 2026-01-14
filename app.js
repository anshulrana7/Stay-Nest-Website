const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema} = require("./schema.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() =>{
    console.log("Connected to db");
}).catch((err)=>{
    console.log(err);
});

async function main(params) { 
    await mongoose.connect(MONGO_URL);
}

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
// app.use(express.json());


const validateListings = (req, res, next) => {
    const { error } = listingSchema.validate(req.body || {});

    if (error) {
        const msg =  error.details.map((el) => el.message).join(", ");
        throw new ExpressError(400, msg);
    }

    next();
};



//Index routes
app.get("/listings", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
}));

//NEW ROUTE
app.get("/listings/new", (req, res) =>{
    res.render("listings/new.ejs");
});

//Show ROUTE
app.get("/listings/:id",wrapAsync(async(req,res)=>{
    let {id} = req.params;    //for this use url encoded extended
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
}));

//CREATE ROUTE
app.post("/listings" , 
    validateListings,
    wrapAsync( async(req, res,next)=>{
    // 1st way-- let{title, description, image, price,country, loaction} = req.body;
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
    })
);


// EDIT ROUTE
app.get("/listings/:id/edit" , wrapAsync(async(req, res)=>{
    let {id} = req.params;    //for this use url encoded extended
    const listing = await Listing.findById(id);
    res.render("listings/edit", {listing});
}));


//UPDATE ROUTE
app.put("/listings/:id",
    validateListings,
    wrapAsync(async(req, res)=>{
    let {id} = req.params; 
    await Listing.findByIdAndUpdate(id,{...req.body.listing}); //parameters ko decontrt krke individual values mai change krenge and pass to updated value
    // res.redirect("/listings");
    res.redirect(`/listings/${id}`);
}));

//DELETE ROUTE
app.delete("/listings/:id" ,wrapAsync(async (req, res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
}));

// app.get("/testListing" ,async (req,res) =>{
//     let sampleListing = new Listing({
//         title: "My New Villa",
//        description: "By the beach",
//         price: 1200,
//         location: "calangute. Goa",
//         country: "India",
//     });

//   await  sampleListing.save();
//   console.log("Sample was saved");
//   res.send("succesfull testing");
// });

app.all(/.*/, (req, res, next) => {
    next(new ExpressError(404, "Page Not found!"));
});


// app.use((err, req, res, next) =>{
//     let { statusCode = 500, message = "Something went wrong!" } = err;
//     res.status(statusCode).render("error.ejs",{err});
//     // res.status(statusCode).send(message);
//     // res.send("Something went wrong");
// });
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).render("error", { message });
});


app.listen(8080, ()=>{
    console.log("Server is listening to port 8080");
});
