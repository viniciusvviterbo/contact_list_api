import connect, { sql } from "@databases/sqlite";
import IPerson from "../types/person";
import IContact from "../types/contact";

// No file here due to no store bing kept on disk
const db = connect();

async function prepare() {
    await db.query(sql`
        CREATE TABLE Persons (
            id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            firstName VARCHAR NOT NULL,
            lastName VARCHAR
        );`);
    await db.query(sql`
        CREATE TABLE Contacts (
            id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            personId INTEGER NOT NULL,
            type VARCHAR NOT NULL,
            value VARCHAR NOT NULL,
            FOREIGN KEY(personId) REFERENCES Persons(id)
        );
    `);
}
const prepared = prepare();

export async function setPerson(person: IPerson): Promise<Object> {
    await prepared;
    await db.query(sql`
        INSERT INTO Persons (firstName, lastName)
        VALUES (${person.firstName}, ${person.lastName})
    `);
    return {
        message: "Person created",
    };
}
export async function setContact(contact: IContact): Promise<Object> {
    await prepared;
    await db.query(sql`
        INSERT INTO Contacts (personId, type, value)
        VALUES (${contact.personId}, ${contact.type}, ${contact.value})
    `);
    return { message: "Contact created" };
}

export async function getPerson(
    id?: number
): Promise<IPerson | IPerson[] | undefined> {
    await prepared;
    const queryString = id
        ? sql`
        SELECT id, firstName, lastName
        FROM Persons
        WHERE id=${id};`
        : sql`
        SELECT id, firstName, lastName
        FROM Persons;`;
    const results = await db.query(queryString);
    if (id) {
        return results[0];
    } else if (results.length) {
        return results;
    } else {
        return undefined;
    }
}
export async function getContact(
    id?: number
): Promise<IContact | IPerson[] | undefined> {
    await prepared;
    const queryString = id
        ? sql`
        SELECT id, personId, type, value
        FROM Contacts
        WHERE id=${id};`
        : sql`
        SELECT id, personId, type, value
        FROM Contacts;`;
    const results = await db.query(queryString);
    if (id) {
        return results[0];
    } else if (results.length) {
        return results;
    } else {
        return undefined;
    }
}
export async function getPersonsContact(
    id: number
): Promise<IContact | IPerson[] | undefined> {
    await prepared;
    const queryString = sql`
        SELECT id, personId, type, value
        FROM Contacts
        WHERE personId=${id};`;
    const results = await db.query(queryString);
    if (results.length) {
        return results;
    } else {
        return undefined;
    }
}

export async function deletePerson(id: number): Promise<Object> {
    await prepared;
    await db.query(sql`
        DELETE FROM Persons
        WHERE id=${id};
    `);
    return {
        message: "Person deleted",
    };
}
export async function deleteContact(id: number): Promise<Object> {
    await prepared;
    await db.query(sql`
        DELETE FROM Contacts
        WHERE id=${id};
    `);
    return {
        message: "Contact deleted",
    };
}

export async function editPerson(person: IPerson): Promise<Object> {
    await prepared;
    await db.query(sql`
        UPDATE Persons
        SET firstName = ${person.firstName},
            lastName = ${person.lastName}
        WHERE id=${person.id};
    `);
    return {
        message: "Person updated",
    };
}
export async function editContact(contact: IContact): Promise<Object> {
    await prepared;
    await db.query(sql`
        UPDATE Contacts
        SET personId = ${contact.personId},
            type = ${contact.type},
            value = ${contact.value}
        WHERE id=${contact.id};
        `);
    return {
        message: "Contact updated",
    };
}
