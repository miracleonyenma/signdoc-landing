import mongoose from 'mongoose';

const connectDB = handler => async (req) => {
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return handler(req);
  }
  // Use new db connection
  await mongoose.connect(process.env.MONGO_URL)
  // .then(() => {
  //   console.log('wored')
  //  const admin = new mongoose.mongo.Admin(mongoose.connection.db)
  //  admin.buildInfo().then((info) => console.log(info, 'This is the server info'))
  // })
  return handler(req);
};

export default connectDB;