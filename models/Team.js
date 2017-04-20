module.exports = (Sequelize, sequelize) => {
    return sequelize.define('team', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name        : Sequelize.STRING
    });
};