const User = require("../models/User");

const adduser = async (req, res, next) => {
  try {
    // if (!req.body.number) {
    //   throw new Error("phone number is mandatory");
    // }

    const name = req.body.name;
    const phonenumber = req.body.number;
    const email = req.body.email;

    const data = await User.create({
      name: name,
      phonenumber: phonenumber,
      email: email,
    });

    res.status(200).json({ newUserDetail: data });
  } catch (err) {
    console.log("check", err);
    res.status(500).json({
      error: err,
    });
  }
};

const getuser = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ allUsers: users });
  } catch (error) {
    console.log("Get user is failing", JSON.stringify(error));
    res.status(500).json({ error: error });
  }
};

const deleteuser = async (req, res) => {
  // try {
  // if (!req.params.id == "undefined") {
  //   console.log("Id is missing");
  //   return res.status(400).json({ err: "Id is missing" });
  // }
  //     const userId = req.params.id;
  //     await User.destroy({ where: { id: userId } });
  //     return res.Status(200);
  //   } catch (err) {
  //     console.log("delete", err);
  //     res.status(500).json(err);
  //   }
  // };
  const users = await User.findById(req.params.id)
    .then((user) => {
      return user.destroy();
    })
    .then((result) => {
      res.json({ msg: "user deleted" });
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = { adduser, getuser, deleteuser };
