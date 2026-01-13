// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const listingSchema = new Schema({
//     title: {
//         type: String,
//         required: true,
//     },
//     description: String,


//     // image: {
//     // filename: String,
//     // url: {
//     //     type: String,
//     //     default: "https://img.freepik.com/free-photo/beautiful-tropical-nature_23-2151979595.jpg?semt=ais_hybrid&w=740&q=80",
//     //     set: (v) => v === ""? "https://img.freepik.com/free-photo/beautiful-tropical-nature_23-2151979595.jpg?semt=ais_hybrid&w=740&q=80": v,
//     // }
    


//     image: {
//         type: String,
//         default:
//             "https://img.freepik.com/free-photo/beautiful-tropical-nature_23-2151979595.jpg?semt=ais_hybrid&w=740&q=80",
//         set: (v) => v === ""? "https://img.freepik.com/free-photo/beautiful-tropical-nature_23-2151979595.jpg?semt=ais_hybrid&w=740&q=80": v,
//     // },

//     },
//     price: Number,
//     location: String,
//     country: String,
// });

// const Listing = mongoose.model("Listing", listingSchema);
// module.exports = Listing;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,

  image: {
    type: String, // 🔴 CHANGED (earlier it was object: { filename, url })
    default:
      "https://img.freepik.com/free-photo/beautiful-tropical-nature_23-2151979595.jpg",
    set: (v) =>
      v === ""
        ? "https://img.freepik.com/free-photo/beautiful-tropical-nature_23-2151979595.jpg"
        : v,
  },

  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
