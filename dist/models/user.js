"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phoneno: { type: String, required: true },
    otp: { type: String, required: true },
});
exports.User = mongoose_1.model("User", UserSchema);
//# sourceMappingURL=user.js.map