import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/CISKS_Registers")
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("Connection failed to database", err);
  });

export default mongoose;
