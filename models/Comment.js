const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        comment_content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        article_title: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'article',
                key: 'id'
            }
        },
        author: {
            type: DataTypes.STRING,
            references: {
                model: 'user',
                key: 'username'
            }
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.fn('NOW')
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    }
);

module.exports = Comment;