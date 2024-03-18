import { db } from ".";

export function getAllData<T>(
    tableName: string,
    callbackFn: (error: Error, data: T) => void
) {
    db.all(`SELECT * FROM ${tableName}`, callbackFn);
}

export function getDataById<T>(
    tableName: string,
    getBy: Record<string, any>,
    callbackFn: (error: Error, data: T) => void
) {
    db.get(
        `SELECT * FROM ${tableName} WHERE ${Object.keys(getBy)[0]} = ${
            Object.values(getBy)[0]
        }`,
        callbackFn
    );
}
