'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('music_edits', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
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
      charset: 'utf8',
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('music_edits');
  }
};