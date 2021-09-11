const sequelize = require('../config/connection');
const { User, Article } = require('../models');

const userData = require('./userData.json');
const articleData = require('./articleData.json');

const seedDatabase = async () => {
    // Force wipe the database when seeding
    await sequelize.sync({ force: true });

    // Seed USER model data
    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true
    });
    console.log('\n/--- SEEDED USER DATA ---/\n');

    // Seed ARTICLE model data
    await Article.bulkCreate(articleData, {
        individualHooks: true,
        returning: true
    });
    console.log('\n/--- SEEDED ARTICLE DATA ---/\n');

    process.exit(0);
};

seedDatabase();