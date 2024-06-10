

const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// Import Router
const authRouter = require("./routes/auth");
const categoryRouter = require("./routes/categories");
const productRouter = require("./routes/products");
const phonepe = require("./routes/phonepe");
const orderRouter = require("./routes/orders");
const usersRouter = require("./routes/users");
const customizeRouter = require("./routes/customize");
// Import Auth middleware for check user login or not~
const { loginCheck } = require("./middleware/auth");
const CreateAllFolder = require("./config/uploadFolderCreateScript");
const cors = require('cors');

app.use(cors({
    origin: 'https://6664baeb28a7e0240946b426--tyohaar.netlify.app/', // Replace with your Netlify app URL
    methods: 'GET,POST,PUT,DELETE',
    credentials: true // Required for sending cookies across origins (if applicable)
}));

/* Create All Uploads Folder if not exists | For Uploading Images */
CreateAllFolder();

// Database Connection
  mongoose.connect("mongodb+srv://ecuser:ec123@eccluster.dbzbz7o.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=eccluster", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  });
  mongoose.connection.on("connected", () => {
    console.log("Database Connected Successfully");
  });
  
  mongoose.connection.on("error", (err) => {
    console.error("Database Connection Error:", err);
  });

// Middleware
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/api", authRouter);
app.use("/api/user", usersRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/phonepe", phonepe);
app.use("/api/order", orderRouter);
app.use("/api/customize", customizeRouter);

// Run Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Server is running on ", PORT);
});
