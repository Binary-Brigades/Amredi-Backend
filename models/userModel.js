const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const geoSchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["Point", "LineString", "Polygon"],
    default: "Point"
  },
  coordinates:{
    type: [Number],
    required: true,
    index: "2dsphere"
  }
})

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: String,
    required: true
  },
  location: geoSchema,
  verified: {
    type: Boolean,
    default: false
  },
  joined: {
    type: Date,
    default: Date.now()
  }
});

userSchema.pre("save", async function () {
  if (this.isModified("password") || this.isNew) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash
  }
});

exports.userModel = mongoose.model("User", userSchema)
