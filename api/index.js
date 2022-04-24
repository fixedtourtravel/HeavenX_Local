const express = require("express");
const app = express();
var cors = require("cors");
const path = require("path");

const helmet = require("helmet");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const isLoggedIn = require("./middleware/isLoggedIn");

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log("error in connecting database", err));
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/uploads", express.static(__dirname + "/uploads"));

// Routes
app.use("/query", require("./routes/query"));
app.use("/api/auth", require("./routes/auth")); 
app.use("/guest", require("./routes/guestroute"));
app.use("/vendor", require("./routes/vendor"));
app.use("/admin", require("./routes/admin"));
app.use("/api/payment", require("./routes/payment"));
app.use("/", require("./routes/newsletterUsers"));

const Port = process.env.PORT || 5000;

app.listen(Port, () => {
  console.log("Server Running on 5000...");
});
