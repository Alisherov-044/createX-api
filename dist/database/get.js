"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataById = exports.getAllData = void 0;
const _1 = require(".");
function getAllData(tableName, callbackFn) {
    _1.db.all(`SELECT * FROM ${tableName}`, callbackFn);
}
exports.getAllData = getAllData;
function getDataById(tableName, getBy, callbackFn) {
    _1.db.get(`SELECT * FROM ${tableName} WHERE ${Object.keys(getBy)[0]} = ${Object.values(getBy)[0]}`, callbackFn);
}
exports.getDataById = getDataById;
