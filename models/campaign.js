"use strict";
module.exports = (sequelize, DataTypes) => {
  const Campaign = sequelize.define(
    "Campaign",
    {
      name: DataTypes.STRING,
      fields: DataTypes.JSON
    },
    {}
  );
  Campaign.associate = function(models) {
    // associations can be defined here
    Campaign.hasMany(models.Submission);
  };
  return Campaign;
};
