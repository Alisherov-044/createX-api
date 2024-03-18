import { db } from ".";

export function createTable(
    tableName: string,
    tableRows: Record<string, string>
) {
    db.run(
        `
        CREATE TABLE IF NOT EXISTS ${tableName} (
            ${Object.keys(tableRows).map(
                (key, index) => `${key} ${Object.values(tableRows)[index]}`
            )}
        )
    `
    );
}

export function createData(
    tableName: string,
    data: Record<string, any>,
    callbackFn: (error: Error) => void
) {
    db.run(
        `
        INSERT INTO ${tableName} (${Object.keys(data).map(
            (key) => key
        )}) VALUES (${Object.keys(data).map(() => `?`)})
    `,
        Object.values(data),
        callbackFn
    );
}
