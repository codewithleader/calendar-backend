const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        ok: false,
        message: 'User already exists!',
      });
    }
    user = new User(req.body);

    /* Encrypting the password */
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    // Saving in the database
    await user.save();

    // Generate a token
    const token = await generateJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      message: 'Register user successfully!',
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: 'An error here! Please contact the administrator',
    });
  }
};

const userLogin = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        ok: false,
        message: 'User or password is incorrect! Email: Elis Delete this message',
      });
    }

    // Checking if the password is correct
    const isPasswordMatch = bcrypt.compareSync(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        ok: false,
        message: 'User or password is incorrect! Password: Elis Delete this message',
      });
    }

    // Generate a token
    const token = await generateJWT(user.id, user.name);

    res.status(200).json({
      ok: true,
      message: 'User login!',
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: 'An error here! Please contact the administrator',
    });
  }
};

const revalidateToken = async (req = request, res = response) => {
  const { uid, name } = req;
  // Generate a token
  const token = await generateJWT(uid, name);
  res.json({
    ok: true,
    message: 'Revalidate token!',
    uid,
    name,
    token,
  });
};

module.exports = {
  createUser,
  userLogin,
  revalidateToken,
};
