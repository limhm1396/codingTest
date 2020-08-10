'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('music_edits', {
      fileName: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      albumName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      artistName: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      filePath: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('music_edits');
  }
};