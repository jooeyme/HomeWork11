module.exports = (sequelize, DataTypes) => {
    const Todo = sequelize.define('Todo', {
      title: DataTypes.STRING,
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    });
  
    return Todo;
  };