import client from "./config";

const startDatabase = async (): Promise<void> => {
  await client.connect();
  console.log("Database is connected!");
};

export default startDatabase;
