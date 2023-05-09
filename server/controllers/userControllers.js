import User from "../models/userModels.js";
import bcryptjs from "bcryptjs";
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).send({ message: "404 fill the all fields" });
    }
    const userExit = await User.findOne({ email: email });
    if (userExit) {
      return res
        .send(400)
        .json({ message: "404 user already exit in data base" });
    }
    const newUser = await User({
      name: name,
      email: email,
      password: password,
    });

    if (newUser) {
      const token = await newUser.genrateToken();
      res.cookie("jwt", token, {
        httpOnly: true,
        //  secure: true,
      });
      await newUser.save();
      res.status(200).json(newUser);
    } else {
      res.status(400).send({ message: "404 something wrong" });
    }
  } catch (error) {
    res.status(400).json({ message: "404 something wrong" });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email && !password) {
      return res.status(404).json("fill these filed");
    }

    const loginUser = await User.findOne({ email: email });
    if (loginUser) {
      const isMatch = await bcryptjs.compare(password, loginUser.password);
      if (isMatch) {
        const token = await loginUser.genrateToken();
        res.cookie("jwt", token, {
          httpOnly: true,
          // secure: true,
        });
        return res.status(200).json(loginUser);
      } else {
        return res.status(404).json("invalid user crenditials");
      }
    } else {
      return res.status(404).json("invalid user crenditials");
    }
  } catch (error) {
    res.status(404).json("login error");
  }
};
export const rename = async (req, res) => {
  const { userId, name } = req.body;
  console.log(userId, name);
  const updatedName = await User.findByIdAndUpdate(
    userId,
    { name: name },
    { new: true }
  );
  if (!updatedName) {
    res.status(400).send("name changin api problem");
  } else {
    res.json(updatedName);
  }
};
export const password = async (req, res) => {
  const { email, password, newPassword } = req.body;
  console.log(email, password, newPassword);
  const loginUser = await User.findOne({ email: email });
  const isMatch = await bcryptjs.compare(password, loginUser.password);

  if (!isMatch) {
    res.status(404).json("please enter correct password");
  } else {
    const updatedHashPassword = bcryptjs.hashSync(newPassword, 10);
    if (updatedHashPassword) {
      const updatedPassword = await User.findByIdAndUpdate(
        loginUser.id,
        { password: updatedHashPassword },
        { new: true }
      );

      if (!updatedPassword) {
        res.status(400).send(" password changeing api problem");
      } else {
        res.status(200).send("password updated");
      }
    } else {
      res.status(400).send(" password changeing api problem");
    }
  }
};
