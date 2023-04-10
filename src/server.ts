import app from "./app";
import { startDatabase } from "./database/index";

const PORT: number = 3000;
const runningMsg: string = `Server is running on http://localhost:${PORT}`;
app.listen(PORT, async (): Promise<void> => {
  await startDatabase();
  console.log(runningMsg);
});
