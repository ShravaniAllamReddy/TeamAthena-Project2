module.exports = function (sequelize, DataTypes) {
    var Activity = sequelize.define("Activity", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        },
        street: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        zip: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5,5]
            }
        }

    });

    Activity.associate = function (models) {
        // We're saying that a Activity should belong to an User
        // A Activity can't be created without an User due to the foreign key constraint
        Activity.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Activity;
};
