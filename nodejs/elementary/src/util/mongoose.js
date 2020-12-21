module.exports = {
    multipleMongooseToObject: function (mongooseArray) {
        return mongooseArray.map((item) => item.toObject());
    },
    mongooseToObject: function (mongoose) {
        return mongoose.toObject();
    },
};
