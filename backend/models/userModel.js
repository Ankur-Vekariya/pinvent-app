const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please add a name"],
    },
    email: {
      type: String,
      require: [true, "please add email"],
      unique: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "please enter a valid email",
      ],
    },
    password: {
      type: String,
      require: [true, "Please add a password"],
      minLength: [6, "Password must be 6 char"],
      // maxLength: [, "Password not more than 23 char"],
    },
    photo: {
      type: String,
      require: [true, "Please add a photo"],
      default:
        "https://blog.hootsuite.com/wp-content/uploads/2020/02/Image-copyright.png.webp",
    },
    phone: {
      type: String,
      default: "+91",
    },
    bio: {
      type: String,
      maxLength: [250, "Password not more than 250 char"],
      default: "bio",
    },
  },
  {
    timestams: true,
  }
);

//encrypt password before save to Db
userSchema.pre("save", async function (next) {
  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
