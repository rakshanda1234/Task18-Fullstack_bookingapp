const express = require("express");
const bodyparser = require("body-parser");

const errorController = require("./controllers/error");

const sequelize = require("./util/database");

var cors = require("cors");
const User = require("./models/User");
const app = express();

app.use(cors());

app.use(express.static("public"));

const userRoutes = require("./routes/user");
app.use(bodyparser.json({ extended: false }));
app.use(bodyparser.urlencoded());

app.use("/user", userRoutes);

app.use(errorController.get404);
sequelize
  .sync()
  .then((result) => {
    console.log(result);
    app.listen(3000);
  })

  .catch((err) => {
    console.log(err);
  });
