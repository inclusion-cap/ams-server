"use strict";
module.exports = (sequelize, DataTypes) => {
  const Submission = sequelize.define(
    "Submission",
    {
      email: DataTypes.STRING,
      content: DataTypes.JSON,
      status: DataTypes.ENUM
    },
    {}
  );
  Submission.associate = function(models) {
    // associations can be defined here
  };
  return Submission;
};
