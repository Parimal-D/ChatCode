import mongoose, { Connection } from "mongoose";
let cachedConnection: Connection | null = null;
export async function connectToMongoDB() {
  if (cachedConnection) {
    console.log("cached connection");
    return cachedConnection;
  }
  try {
    let conn = await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("New Connection");
    cachedConnection = conn.connection;
    return cachedConnection;
  } catch (err) {
    throw err;
  }
}
