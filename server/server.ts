import { app } from "./app";
import connectDB from "./utilis/db";
require("dotenv").config();

app.listen(process.env.PORT, () => {
   console.log(`Server is running on port ${process.env.PORT}`);
   connectDB();
});
