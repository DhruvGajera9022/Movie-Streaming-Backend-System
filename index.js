const express = require("express");
require("dotenv").config();

const session = require("express-session");
const FileStore = require("session-file-store")(session);
const cors = require("cors");
const morgan = require("morgan");

const authRoute = require("./routes/authRoute");
const dashboardRoute = require("./routes/dashboardRoute");
const profileRoute = require("./routes/profileRoute");
const userRoute = require("./routes/userRoute");
const roleRoute = require("./routes/roleRoute");
const discountRoute = require("./routes/discountRoute");
const settingsRoute = require("./routes/settingsRoute");

const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");


// Initialize app
const app = express();


// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


// Setup view engine 
app.set("view engine", "ejs");


// static file declaration
app.use(express.static("assets"));
app.use(express.static("plugins"));


// store session in file
let fileStoreOptions = {};


// session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new FileStore(fileStoreOptions),
}));


// routes
app.use("/", authRoute);
app.use("/", dashboardRoute);
app.use("/", profileRoute);
app.use("/", userRoute);
app.use("/", roleRoute);
app.use("/", discountRoute);
app.use("/", settingsRoute);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));


// Initialize Send Mail



// start server
app.listen(process.env.PORT, () => {
    console.log(`Server started at ${process.env.URL}${process.env.PORT}`);
});
