const sequelize = require('./../db')
const { DataTypes } = require('sequelize')


const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING(100), unique: true, allowNull: false },
    password_hash: { type: DataTypes.STRING(255), allowNull: false }, // переименовал password в password_hash
    name: { type: DataTypes.STRING(100) }, // добавил name
    phone: { type: DataTypes.STRING(20), allowNull: false }, // добавил allowNull: false
    role: {type: DataTypes.STRING, defaultValue: "USER"},
});

const Service = sequelize.define('service', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    description: { type: DataTypes.TEXT }, // изменил STRING на TEXT
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false }, // уточнил точность
    discount: { type: DataTypes.DECIMAL(5, 2), defaultValue: 0.00 }, // уточнил точность
    duration_minutes: { type: DataTypes.INTEGER, allowNull: false }, // переименовал minutes в duration_minutes
    photo_url: { type: DataTypes.STRING(255) } // переименовал img в photo_url
}, {
    timestamps: false
});

const Order = sequelize.define('order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    total_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    status: { 
        type: DataTypes.ENUM('pending', 'confirmed', 'completed', 'cancelled'),
        defaultValue: 'pending'
    },
    start_time: { type: DataTypes.DATE, allowNull: false },
    end_time: { type: DataTypes.DATE, allowNull: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    timestamps: false
});

const OrderItem = sequelize.define('order_item', {
    quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
    final_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
}, {
    timestamps: false
});

const Review = sequelize.define('review', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rating: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1, max: 5 }
    },
    comment: { type: DataTypes.TEXT },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    timestamps: false
});

// Определяем связи между моделями
User.hasMany(Order, { foreignKey: 'user_id' });
Order.belongsTo(User, { foreignKey: 'user_id' });

Order.hasMany(OrderItem, { foreignKey: 'order_id' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

Service.hasMany(OrderItem, { foreignKey: 'service_id' });
OrderItem.belongsTo(Service, { foreignKey: 'service_id' });

User.hasMany(Review, { foreignKey: 'user_id' });
Review.belongsTo(User, { foreignKey: 'user_id' });

Order.hasOne(Review, { foreignKey: 'order_id' });
Review.belongsTo(Order, { foreignKey: 'order_id' });

// Для портфолио (если нужно)
const Portfolio = sequelize.define('portfolio', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    before_photo: { type: DataTypes.STRING(255), allowNull: false },
    after_photo: { type: DataTypes.STRING(255), allowNull: false },
    description: { type: DataTypes.TEXT },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    timestamps: false
});

module.exports = {
    User,
    Service,
    Order,
    OrderItem,
    Review,
    Portfolio
}