const express = require("express");
const cors = require("cors");
const { sequelize } = require("./database/sequelize");
const app = express();
const PORT = 2020;


// const router = express.Router();

// Allow requests from your frontend (http://localhost:5173)
// app.use(cors({
//   origin: "http://localhost:5173", 
//   methods: "GET,POST,PUT,DELETE",
//   credentials: true
// }));

app.use(cors({ origin: "*", methods: "GET,HEAD,PUT,PATCH,POST,DELETE" }));


const Routers = require('./routes/routers');
app.use(express.json());
app.use(Routers);



const server = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
  }
};


server();

app.listen(PORT, () => {
    console.log(`Server is listening to PORT: ${PORT}`);
});

// const express = require("express");
// const cors = require("cors");
// const { sequelize } = require("./database/sequelize");
// const app = express();
// const PORT = 2020;

// // Define allowed origins (frontend URLs)
// const allowedOrigins = ["http://localhost:5173", "http://localhost:3000"];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true
// }));

// const Routers = require('./routes/routers');
// app.use(express.json());
// app.use(Routers);

// const server = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("✅ Database connection established successfully.");
//   } catch (error) {
//     console.error("❌ Unable to connect to the database:", error.message);
//   }
// };

// server();

// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on PORT: ${PORT}`);
// });




