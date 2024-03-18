"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteData = void 0;
const _1 = require(".");
function deleteData(tableName, deleteBy, callbackFn) {
    _1.db.run(`DELETE FROM ${tableName} WHERE ${Object.keys(deleteBy)[0]} = ?`, [Object.values(deleteBy)[0]], callbackFn);
}
exports.deleteData = deleteData;
