const Sequelize = require('sequelize');
module.exports = (sequelize, DataType) => {
  const Product = sequelize.define(
    "Product",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement:true,
        primaryKey:true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
        
      },
      description: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      url: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      enabled: {
        type: Sequelize.BOOLEAN(),
        allowNull: true,
        defaultValue: false
      },
    },
    {
      freezeTableName: true,
      tableName: "MST_PRODUCT",
      timestamps:false
    }
  );

  return Product;
};
