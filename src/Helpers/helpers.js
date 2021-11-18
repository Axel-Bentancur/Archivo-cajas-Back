const { Box, ExFile, NeFile } = require("../db");
const fileData = {};

/**********************************************CREATE************************************************/
fileData.newBox = async (body) => {
  const { box_number, files } = body;
  const box_n = await fileData.createBox(box_number);
  const box = await fileData.addFiles(files, box_n);
  return box;
};

fileData.createBox = async (box_number) => {
  const newBox = await Box.create({ box_number });
  return newBox.id;
};

fileData.createNe = async (e) => {
  const { number } = e;
  const res = await NeFile.create({ ne_number: number, type: "ne" });
  return res;
};

fileData.createEx = async (e) => {
  const { number, yearNumEx, bodyNumEx } = e;
  const res = await ExFile.create({
    ex_number: number,
    type: "ex",
    year: yearNumEx,
    ex_number_part: bodyNumEx,
  });
  return res;
};

fileData.addFiles = async (files, box_n) => {
  const res = await Box.findByPk(box_n);
  files.forEach(async (e) => {
    if (e.type === "ne") {
      const newNe = await fileData.createNe(e);
      await newNe.setBox(res);
    } else {
      if (e.type === "ex") {
        const newEx = await fileData.createEx(e);
        await newEx.setBox(res);
      }
    }
  });
  return res;
};

/**********************************************SEARCH************************************************/
fileData.searchBox = async (boxN) => {
  const file = await Box.findOne({
    where: { box_number: boxN },
    include: [ExFile, NeFile],
  });
  return file;
};

fileData.searchNe = async (Ne) => {
  const file = await NeFile.findOne({
    where: { ne_number: Ne.number },
    include: [Box],
  });
  return file;
};

fileData.searchEx = async (Ex) => {
  const file = await ExFile.findOne({
    where: { ex_number: Ex.number, year: Ex.year, ex_number_part: Ex.body },
    include: [Box],
  });
  return file;
};

fileData.allBoxes = async () => {
  const Data = await Box.findAll({ include: [ExFile, NeFile] });
  return Data;
};

/**********************************************UPDATE************************************************/
fileData.updateEx = async (file) => {
  const { ex_number, year, ex_number_part, id } = file;
  const Data = await ExFile.update(
    {
      ex_number,
      ex_number_part,
      year,
    },
    {
      where: { id },
    }
  );
  return Data;
};

fileData.updateNe = async (file) => {
  const { ne_number, id } = file;
  const Data = await NeFile.update(
    {
      ne_number,
    },
    {
      where: { id },
    }
  );
  return Data;
};

/**********************************************DELETE************************************************/
fileData.deleteNe = async (file) => {
  const { id } = file;
  const Data = await NeFile.destroy({
    where: { id },
  });
  return Data;
};

fileData.deleteEx = async (file) => {
  const { id } = file;
  const Data = await ExFile.destroy({
    where: { id },
  });
  return Data;
};

module.exports = fileData;
