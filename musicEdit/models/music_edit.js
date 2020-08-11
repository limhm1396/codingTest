'use strict';

const Sequelize = require('sequelize');

module.exports = class music_edit extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      fileName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      albumName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      artistName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      filePath: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: 'music_edit',
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {}
}