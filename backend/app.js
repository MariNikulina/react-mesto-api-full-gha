const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const { errors } = require("celebrate");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { PORT, MONGODB_URL } = require("./app.config");

const routers = require("./routes");

mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connect to bd");
  });

const app = express();

const ENV = "https://mesto.marina.nomoredomainsicu.ru";

app.use(
  cors({
    origin: true,
    credentials: true,
    ENV,
  }),
);

app.use(cookieParser());

app.use(bodyParser.json());

// подключаем логгер запросов
app.use(requestLogger);

// автоматическое восстановление работы сервера при падении
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});

app.use(routers);

// подключаем логгер ошибок
app.use(errorLogger);

// обработчик ошибок celebrate
app.use(errors());

// централизованная обработка ошибок
app.use(errorHandler);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
