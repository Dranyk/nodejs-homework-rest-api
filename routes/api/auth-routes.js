const express = require("express");

const ctrl = require("../../controllers/auth-controllers");

const { validateBody } = require("../../utils");

const { authenticate, upload } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

// signup
router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

// signin
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.get("/verify/:verificationToken", ctrl.verify);

router.post(
  "/verify",
  validateBody(schemas.emailSchema),
  ctrl.resendVerificationEmail
);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
    "/current",
    authenticate,
    validateBody(schemas.updateSubscriptionSchema),
    ctrl.updateSubscription
  );

router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatar);

module.exports = router;
