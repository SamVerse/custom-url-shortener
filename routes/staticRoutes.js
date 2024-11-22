import express from "express";
import { URL } from "../models/url.js";
import { restrictTo } from "../middlewares/auth.js";

const router = express.Router();

router.get("/admin/url", restrictTo(['ADMIN']) ,async (req, res) => {
  const allurls = await URL.find();
  return res.render("home", {
    urls: allurls,
  });
});

router.get("/", restrictTo(['NORMAL' , 'ADMIN']), async (req, res) => {
  const allurls = await URL.find({createdBy: req.user?._id});
  return res.render("home", {
    urls: allurls,
    user: req.user
  });
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login", { error: "" });
});

export default router;