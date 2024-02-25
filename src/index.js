import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import httpServer from "./app.js";

httpServer.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
