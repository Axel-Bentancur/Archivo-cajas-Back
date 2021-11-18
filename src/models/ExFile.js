const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("ExFile", {
    ex_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ex_number_part: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
