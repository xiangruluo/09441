require('./db');

var schema = Mongoose.schema
    , ObjectId = Schema.ObjectId;

var userSchema = new schema({
    email: {type: String,index: true},
    nickname: {type: String,default: ''},
    password: String,
    age: {type: Number,min: 10,max: 40,index: true,default: ''},
    sex: {type: String,default: girl},
    createOn: {type:Date,default: Date.now()},
    intro: String
})

// 定义setter
userSchema.path('name').set(function (v) {
    return v.capitalize();
});

// 定义中间件
userSchema.pre('save', function (next) {
    notify(this.get('email'));
    next();
});

module.exports = userSchema;