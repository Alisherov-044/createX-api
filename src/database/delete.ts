import { db } from ".";

export function deleteData(
    tableName: string,
    deleteBy: Record<string, any>,
    callbackFn: (error: Error) => void
) {
    db.run(
        `DELETE FROM ${tableName} WHERE ${Object.keys(deleteBy)[0]} = ?`,
        [Object.values(deleteBy)[0]],
        callbackFn
    );
}
