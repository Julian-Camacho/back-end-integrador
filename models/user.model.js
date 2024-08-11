const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  fullName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 100,
    trim: true,
    validate: {
      validator: function (v) {
        return /^[A-Za-z0-9._+\-']+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(v);
      }, // validamos que el mail sea valido
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 100,
    trim: true,
  },
  avatar: {
    type: String,
    trim: true,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  },
  phone: {
    type: String,
  },
  bornDate: {
    type: Date,
  },
  role: {
    type: String,
    default: "CLIENT_ROLE",
    enum: ["ADMIN_ROLE", "CLIENT_ROLE"],
  },
});

module.exports = mongoose.model("User", userSchema);
