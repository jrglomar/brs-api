'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservation_line extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      // Default in every static associate
      this.belongsTo(models.User, {
          foreignKey: "created_by",
          type: DataTypes.UUID
      });

      // Default in every static associate
      this.belongsTo(models.User, {
          foreignKey: "updated_by",
          type: DataTypes.UUID
      });

      this.belongsTo(models.Bus_seat, {
        foreignKey: "seatId",
        as: "seat",
        type: DataTypes.UUID,
      });

      this.belongsTo(models.Insurance, {
        foreignKey: "insuranceId",
        type: DataTypes.UUID,
      });

      this.belongsTo(models.Reservation, {
            foreignKey: "reservationId",
            as: "reservation",
            type: DataTypes.UUID,
      });

    }
  };
  Reservation_line.init({
    id :{
      type : DataTypes.UUID,
      primaryKey : true,
      defaultValue : DataTypes.UUIDV4,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'Active',
        allowNull: true,
      },
    created_by: {
        type: DataTypes.UUID,
        references: {
            model: sequelize.User,
            key: "id",
        },
    },
    updated_by: {
        type: DataTypes.UUID,
        references: {
            model: sequelize.User,
            key: "id",
        },
    },

    passengerName :{
        type: DataTypes.STRING(255),
        allowNull: true,
        // validate:{
        //     notEmpty: { msg: "Passenger name is required."},
        //   },
    },
    currentStatus: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    insuranceFee: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    amount: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    route: {
        type: DataTypes.STRING,
        allowNull: true,
    },
        
  }, 
  {
    sequelize,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    modelName: 'Reservation_line',
  });
  return Reservation_line;
};