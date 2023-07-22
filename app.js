const fs = require("fs");
const path = require("path");
const http = require("http");
const compression = require("compression");
const cors = require("cors");
const express = require("express");

const config = require("./config");
const models = require("./models");

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    optionsSuccessStatus: 200,
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, DELETE, PUT", "PATCH"
  );
  //   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(compression());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// logs all routes in development environment: need for debug requests
app.all("*", function (req, resp, next) {
  console.log(req.method, req.url);
  next();
});

models.sequelize.authenticate().then(async () => {models.sequelize.authenticate().then(() => console.log("Database connected successfully")).catch(err=>console.log("Database connection error", err))
await models.sequelize.sync({ }); console.log("Database connected successfully")}).catch(err=>console.log("Database connection error", err))


process.on("uncaughtException", (error) => {
  console.error(error);
  process.exit(1);
});

const port = config.server.port || "3036";


// app.use(require('connect').bodyParser());
app.use(express.json());

const server = http.createServer(app);



// models.sequelize.sync().then(function() {
  server.listen(port, (error) => {
    if (error) {
      console.error('Server error: ', error);
      process.exit(1);
    }

    const router = express.Router();
    app.use('/api', router);

    // include all routes in /routes folder
    fs.readdirSync(path.join(__dirname, 'routes')).map(file => {
      require('./routes/' + file)(router);
    });

    console.log(`Server is started on port ${config.server.port} in ${config.env} mode`);
  });
  server.on('error', onError);
  server.on('listening', onListening);
// }); 

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("Listening on ", bind);
}
