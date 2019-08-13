"use strict";
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      body: DataTypes.TEXT
    },
    {}
  );
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.Admin);
    Comment.belongsTo(models.Submission);
  };
  return Comment;
};
