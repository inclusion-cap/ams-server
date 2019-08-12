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
  };
  return Comment;
};
