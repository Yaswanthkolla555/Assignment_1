// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     const uri = process.env.MONGO_URI || "mongodb://localhost:27017/myLocalDB"; // Use local DB URI or environment variable
//     const conn = await mongoose.connect(uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     process.exit(1); // Exit the process if MongoDB connection fails
//   }
// };

// export default connectDB; // Export the connectDB function
import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_SECRET, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Database Connected Successfully");
  } catch (error) {
    console.error("❌ Database connection error:", error);
    process.exit(1);
  }
};

export default connectDb;




