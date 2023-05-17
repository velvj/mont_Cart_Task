//Env
import { join, resolve } from "path";
import * as dotenv from "dotenv";
import { argv } from "process";
dotenv.config({ path: join(__dirname, "..", `${argv[2]}`) });

//Middleware npm
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";

//Middlewares
import Router from "./routes";

//Database connection
import { verifyDBConnection, sequelize } from "./instances/sequelize";

//PORT
const PORT = process.env.PORT;

const app = express();

//Express usage
app.use(express.json());
app.use(
  morgan("dev", {
    skip: function (req, res) {
      return res.statusCode < 400;
    },
  })
);
app.use(express.static("public"));
app.use(express.json());
app.use(express.text());
app.use(express.raw());
app.use(helmet());
app.use(cors());
app.use(compression());

//Database connection Established
try {
  verifyDBConnection();
  // sequelize.sync({force:true}).then(() => {
  //   console.log("Database connected successfully");
  // });
  console.log("Database connected successfully");
} catch (e) {
  console.log("Database connection failed", e);
}

//Router path
Router(app);

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
