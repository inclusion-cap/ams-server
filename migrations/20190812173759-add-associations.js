"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.addColumn(
      "Submissions", // target model
      "campaignId", // key being added
      {
        type: Sequelize.UUID,
        references: {
          model: "Campaigns", // source model
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.removeColumn(
      "Submissions", // target model
      "campaignId" // key being added
    );
  }
};
