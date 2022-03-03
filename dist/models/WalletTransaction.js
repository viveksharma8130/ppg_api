"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const Utils_1 = require("../utils/Utils");
const WalletTransactionSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'users', required: false },
    channel: { type: String, required: true, enum: ['reward', 'deposit', 'order'] },
    transaction_mode: { type: String, required: true, enum: ['credit', 'debit'] },
    amount: { type: Number, required: true },
    transaction_id: { type: String, required: true },
    item_object: { type: String, required: false },
    transaction_obj: { type: String, required: false },
    status: { type: Boolean, required: true, default: true },
    created_at: { type: Date, required: true, default: Utils_1.Utils.indianTimeZone },
    updated_at: { type: Date, required: true, default: Utils_1.Utils.indianTimeZone },
}, { id: false });
WalletTransactionSchema.set('toObject', { virtuals: true });
WalletTransactionSchema.set('toJSON', { virtuals: true });
exports.default = (0, mongoose_1.model)('wallet_transactions', WalletTransactionSchema);
