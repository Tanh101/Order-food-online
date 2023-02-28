const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    Role: {
        type: String,
        default: "guest"
    },
    deleteAt : {
        type: Date,
        default: null
    }
}, { timestamps: true });


AccountSchema.methods.delete = function () {
    this.deletedAt = new Date(Date.now());
    return this.save();
};



module.exports = mongoose.model('account', AccountSchema);
