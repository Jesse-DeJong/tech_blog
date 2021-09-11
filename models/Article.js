const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/connection');

class Article extends Model {}

Article.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        article_title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        article_content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        author: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
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
        modelName: 'article',
    }
);

module.exports = Article;