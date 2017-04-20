'use strict'
module.exports = (Sequelize, config) =>
{
    const options =
        {
            host: config.db.host,
            dialect: 'mysql',
            logging: false,
            define:
                {
                    timestamps: true,
                    paranoid: true,
                    defaultScope:
                        {
                            where:
                                {
                                    deletedAt: { $eq: null }
                                }
                        }
                }
        };

    const options_pg =
        {
            host: config.production.host,
            dialect: 'pg',
            logging: false,
            define:
                {
                    timestamps: true,
                    paranoid: true,
                    defaultScope:
                        {
                            where:
                                {
                                    deletedAt: { $eq: null }
                                }
                        }
                }
        };

    var sequelize;

    if(process.env.NODE_ENV === 'production')
    {
        sequelize = new Sequelize(config.production.name, config.production.user, config.production.password, options_pg);
    }
    else
    {
        sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, options);
    }

    const Team = require('../models/team')(Sequelize, sequelize);
    const User = require('../models/user')(Sequelize, sequelize);

    Team.belongsTo(User);
    User.hasMany(Team);

    return {
        user      : User,
        team      : Team,
        sequelize : sequelize
    };
};