import mongoose from 'mongoose';
const { connection, connections, connect } = mongoose;

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error('ERROR: MONGODB_URI não está definido. Por favor, configure a variável de ambiente corretamente.');
  process.exit(1);
}
export async function mongoConnect() {
  connection
    .on("error", (error) => {
      console.log("ERROR: Connection to MongoDB failed", error);
    })
    .on("close", () => {
      console.log("Connection to MongoDB ended");
      process.exit(1);
    })
    .once("open", () => {
      const infos = connections;
      infos.map((info) =>
        console.log(
          `Connected to ${info.host}:${info.port}/${info.name} mongo Database`
        )
      );
    });

  await connect(mongoUri);
}

export function mongoDisconnect() {
  return connection.close();
}

export { mongoose };