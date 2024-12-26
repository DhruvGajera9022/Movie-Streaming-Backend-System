const { sequelize } = require("../config/config");
const { Sequelize } = require("sequelize");

const Invoice = sequelize.define("invoice", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    subscriptionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    transactionId: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    validFrom: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    validTo: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    status: {
        type: Sequelize.BOOLEAN,
    }
}, {
    timestamps: false,
    freezeTableName: true,
});


module.exports = Invoice;