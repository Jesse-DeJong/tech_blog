// Import models
const User = require('./User');
const Article = require('./Article');
const Comment = require('./Comment');

// Relationships
Article.belongsTo(User, {
    foreignKey: 'author'
});

Article.hasMany(Comment, {
    foreignKey: 'article_title',
    onDelete: 'CASCADE'
});

Comment.belongsTo(Article, {
    foreignKey: 'id'
});

Comment.belongsTo(User, {
    foreignKey: 'author'
});

// Export models
module.exports = {
    User,
    Article,
    Comment
};