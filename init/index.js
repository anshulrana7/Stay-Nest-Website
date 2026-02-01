// // const mongoose = require("mongoose");
// // const initData = require("./data.js");
// // const Listing = require("../models/listing.js");
// // const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// // main().then(() =>{
// //     console.log("Connected to db");
// // }).catch((err)=>{
// //     console.log(err);
// // });

// // async function main(params) { 
// //     await mongoose.connect(MONGO_URL);
// // }

// // const initDB = async()=>{
// //     await Listing.deleteMany({});
// //     await Listing.insertMany(initData.data);
// //     console.log("Data was initialized");
// // }

// // initDB();


// const mongoose = require("mongoose");
// const initData = require("./data.js");
// const Listing = require("../models/listing.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// main()
//   .then(() => {
//     console.log("Connected to DB");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// async function main() {
//   await mongoose.connect(MONGO_URL); 
// }

// const initDB = async () => {
//   await Listing.deleteMany({});  
//   initData.data=initData.data.map((obj) =>({...obj, owner: "697b755942d8e883c322594a"}));
//   await Listing.insertMany(initData.data);
//   console.log("Data was initialized");
// };

// initDB();


require("dotenv").config({ path: "../.env" }); // 👈 FIX
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = process.env.ATLASDB_URL;

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("Connected to MongoDB Atlas");
}

const initDB = async () => {
  await Listing.deleteMany({});

  initData.data = initData.data.map(obj => ({
    ...obj,
    owner: new mongoose.Types.ObjectId("697b755942d8e883c322594a")
  }));

  await Listing.insertMany(initData.data);
  console.log("Data was initialized");
};

main()
  .then(initDB)
  .catch(err => console.log(err));
