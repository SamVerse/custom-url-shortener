import express from "express";
import urlRouter from "./routes/url.js";
import connectToMongoDB from "./dbConnection/connection.js";
import { URL } from "./models/url.js";
import path from "path";
import staticRoutes from "./routes/staticRoutes.js";
import userRoute from './routes/user.js';
import cookieParser from "cookie-parser";
import { 
  // checkAuth,
   checkForAuthentication,
   restrictTo,
    // handleRestrictToLoggedInUserOnly
   } from "./middlewares/auth.js";


const app = express(); // create an express app
const PORT = 8001;
connectToMongoDB("mongodb://localhost:27017/url-shortner"); // connect to MongoDB

// middleware
app.use(express.json()); // middleware to parse incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true })); // middleware to parse incoming requests with urlencoded payloads
app.use(cookieParser());
app.use(checkForAuthentication);


app.set("view engine", "ejs"); // set the view engine to ejs
app.set("views", path.resolve("./views"));  // set the views directory

app.use("/url" , restrictTo(['NORMAL', 'ADMIN']) ,urlRouter);
app.use('/user', userRoute);  
// Route to handle all the requests to /url
app.use('/' , staticRoutes);

// Route to handle redirection
app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const result = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );
  res.redirect(result.redirectedUrl);
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
