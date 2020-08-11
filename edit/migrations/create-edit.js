'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('edits', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('edits');
  }
};