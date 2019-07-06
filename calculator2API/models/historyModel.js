const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const historyModelSchema = mongoose.Schema({
    _id :mongoose.Schema.Types.ObjectId,
    expr : {type:String,required:true},
    ans : {type:Number,required:true},
    opr : {type:String},
    createdOn : {type:Date,required:true,default:Date.now}
});

historyModelSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('historyModel',historyModelSchema);