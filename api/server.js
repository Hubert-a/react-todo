const express = require("express");
require("dotenv").config();
const TaskRoute = require("./Routes/Tasks");
const UserRoute = require("./Routes/user")
//express app
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(express.json());
app.use(cors({ origin: "*" }));
// app.use((res, req, next) => {
//   console.log(req.path, req.method);
//   next();
// });

app.use("/api/todo", TaskRoute);
app.use("/api/user", UserRoute)

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port 4000");
    });
  })
  .catch((err) => {
    console.log(err);
  });

  
