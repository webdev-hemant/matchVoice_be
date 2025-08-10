const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: 18,
            max: 100
        }
    },
    gender: {
        type: DataTypes.ENUM('male', 'female', 'other'),
        allowNull: true,
        defaultValue: 'other'
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    interests: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
    },
    photos: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
    },
    latitude: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    longitude: {
        type: DataTypes.DOUBLE,
        allowNull: true
    }
}, {
    tableName: "users",
    timestamps: true
});

module.exports = User;
