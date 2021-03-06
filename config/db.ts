import mongoose from "mongoose";

async function connectToDb() {
  if (mongoose.connection?.readyState >= 1) {
    return;
  }

  return mongoose.connect(process.env.MONGO_URI!!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
}

export default connectToDb;
