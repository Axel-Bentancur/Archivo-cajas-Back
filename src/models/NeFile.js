const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("NeFile", {
    ne_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
