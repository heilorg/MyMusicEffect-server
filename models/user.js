const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcryptjs = require("bcryptjs");

const userSchema = new Schema({
    id: String,
    password: String,
    name: String,
    created: { type: Date, default: Date.now }
});
// 원래 유저 스키마에 곡 스키마를 서브스키마로 넣으려 했지만 데이터의 양이 너무 많아지면 유저 처리에 부하가 걸릴 듯

userSchema.methods.generateHash = password => {
    // 해싱
    return bcryptjs.hashSync(password, 8);
};
userSchema.methods.validateHash = password => {
    // 해싱 검사
    return bcryptjs.compareSync(password, this.password);
};

module.exports = mongoose.model("user", userSchema);
