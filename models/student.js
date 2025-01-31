

const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../database/sequelize');

class Student extends Model {}

Student.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM('male', 'female'),
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize, // Pass the connection instance
    modelName: 'Student', // Model name
    tableName: 'Students', // Table name
  }
);


module.exports = Student;
