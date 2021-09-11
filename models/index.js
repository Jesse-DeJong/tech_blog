// Import models
const User = require('./User');
const Article = require('./Article');

// Relationships
Article.belongsTo(User, {
    foreignKey: 'username'
});

// Export models
module.exports = {
    User,
    Article
};