"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createData = exports.createTable = void 0;
const _1 = require(".");
function createTable(tableName, tableRows) {
    _1.db.run(`
        CREATE TABLE IF NOT EXISTS ${tableName} (
            ${Object.keys(tableRows).map((key, index) => `${key} ${Object.values(tableRows)[index]}`)}
        )
    `);
}
exports.createTable = createTable;
function createData(tableName, data, callbackFn) {
    _1.db.run(`
        INSERT INTO ${tableName} (${Object.keys(data).map((key) => key)}) VALUES (${Object.keys(data).map(() => `?`)})
    `, Object.values(data), callbackFn);
}
exports.createData = createData;
