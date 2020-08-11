'use strict';

const Sequelize = require('sequelize');

module.exports = class music_edit extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      fileName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      albumName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      artistName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      filePath: {
        type: Sequelize.STRING,
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