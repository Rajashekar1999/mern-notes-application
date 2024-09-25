import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGOOSE_URI);
    console.log(`db coonect :${conn.connection.host}`);
  } catch (error) {
    console.log(error.message);
  }
};

export default dbConnect;
