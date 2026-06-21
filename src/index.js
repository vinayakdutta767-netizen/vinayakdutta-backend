import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";
dotenv.config({path: "./.env"});

connectDB()
  .then(()=>{
      app.listen(process.env.PORT,()=>{
          console.log(`Server is running on port ${process.env.PORT}`);
      });
  })
  .catch((err)=>{
      console.log("MongoDB connection Error: ",err);
      throw err;
  });

// import express from "express";

// const app=express();

// (async ()=>{
//     try{
//          await mongoose.connect(`${process.env.MONGO_URL}/${DB_Name}`);
//          app.on("error",(err)=>{
//             console.log("Error",err);
//             throw err;
//             });

//             app.listen(process.env.PORT,()=>{
//                 console.log(`Server is running on port ${process.env.PORT}`);
//             });
//     }
//         catch(err){
//             console.log("MongoDB connection Error: ",err);
//             throw err;
//         }
// })()