const fileCtrl = {};
const {
  newBox,
  searchBox,
  searchNe,
  searchEx,
  allBoxes,
  updateEx,
  updateNe,
  deleteEx,
  deleteNe,
} = require("../Helpers/helpers");

fileCtrl.getAllBoxes = async (req, res) => {
  const Data = await allBoxes();
  res.json(Data);
};

fileCtrl.getBox = async (req, res) => {
  const { box } = req.params;
  const Data = await searchBox(box);
  res.json(Data);
};

fileCtrl.getFile = async (req, res) => {
  const { type } = req.query;
  const Data =
    type === "ex" ? await searchEx(req.query) : await searchNe(req.query);
  res.json(Data);
};

fileCtrl.createBox = async (req, res) => {
  await newBox(req.body);
  res.status(201).json("success");
};

fileCtrl.updateFile = async (req, res) => {
  const { type, action } = req.body;
  if (action === "update") {
    const Data =
      type === "ex" ? await updateEx(req.body) : await updateNe(req.body);
    res.json(Data);
  } else if (action === "remove") {
    const Data =
      type === "ex" ? await deleteEx(req.body) : await deleteNe(req.body);
    res.json(Data);
  }
};

module.exports = fileCtrl;
