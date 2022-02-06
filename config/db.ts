import { connect } from "mongoose";

let alreadyConnected: number | null = null;

async function connectToDb() {
  if (alreadyConnected) return;

  const conn = await connect(process.env.MONGODB_URI!!);

  alreadyConnected = conn.connections[0].readyState;
  console.log(alreadyConnected);
}

export default connectToDb;
