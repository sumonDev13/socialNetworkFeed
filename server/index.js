import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { dbConnection } from "./config/db.js";



import { register } from "./controllers/auth-controller.js";
import { createPost } from "./controllers/post-controller.js";
import { verifyToken } from "./middleware/auth-middleware.js";


import authRoute from "./routes/auth.js";
import usersRoute from './routes/users.js'
import postRoute from './routes/posts.js'


/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/posts", postRoute);

const port = process.env.PORT || 5000;
dbConnection();

app.listen(port, () => {
  console.log(` server is listening on port ${port}`);
});
