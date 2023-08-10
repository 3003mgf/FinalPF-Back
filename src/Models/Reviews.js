import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const Reviews = sequelize.define('Reviews', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    UserId:{
      type: DataTypes.STRING,
      allowNull: false
    },
    comment:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    rating:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    deleted:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
  },
  {
    timestamps: false
  })

  export default Reviews;