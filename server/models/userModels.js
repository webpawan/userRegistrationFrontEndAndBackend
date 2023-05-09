import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";
dotenv.config();

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.methods.genrateToken = async function () {
  try {
    const token = jwt.sign({ id: this.id }, process.env.JWT_KEY, {
      expiresIn: "5h",
    });
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
    res.status(400).json("jwt token problem");
  }
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model("User", userSchema);
export default User;
