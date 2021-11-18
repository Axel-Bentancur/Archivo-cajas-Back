const { Router } = require("express");
const {
  getAllBoxes,
  getBox,
  getFile,
  createBox,
  updateFile,
} = require("../Controllers/controllers");

const router = Router();

router.route("/search/boxes/:box").get(getBox);
router.route("/search/files/").get(getFile);
router.route("/search/all/").get(getAllBoxes);
router.route("/box").post(createBox);
//router.route("/update").post(updateFile);

module.exports = router;
