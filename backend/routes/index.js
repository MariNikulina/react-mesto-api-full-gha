const router = require("express").Router();
const userRouter = require("./users");
const cardRouter = require("./cards");
const auth = require("../middlewares/auth");
const NotFoundError = require("../errors/not-found-error");
const { createUser, login, logout } = require("../controllers/users");
const {
  validationSchemaSignIn,
  validationSchemaSignup,
} = require("../middlewares/validation");

router.post("/signup", validationSchemaSignup, createUser);
router.post("/signin", validationSchemaSignIn, login);

// Защита API авторизацией
router.use(auth);

router.get("/signout", logout);

router.use("/", userRouter);
router.use("/", cardRouter);
router.use("*", (req, res, next) => {
  next(new NotFoundError("Страница не найдена"));
});

module.exports = router;
