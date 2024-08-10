const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    crypto.randomBytes(16, (err, buffer) => {
      if (err) return cb(err);
      const filename = buffer.toString("hex") + path.extname(file.originalname);
      cb(null, filename);
    });
  },
});

const upload = multer({ storage }).single("image");

module.exports = upload;
