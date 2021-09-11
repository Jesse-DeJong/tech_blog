// Import models
const User = require('./User');
const Article = require('./Article');

// Relationships
Article.belongsTo(User, {
    foreignKey: 'id'
});

// Export models
module.exports = {
    User,
    Article
};