import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("./public")); // absolute path
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // avoid collisions
  },
});

export const upload = multer({ storage });
