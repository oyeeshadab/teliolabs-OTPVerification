import { Database } from "../Database";
import { WhereCondition } from "../types";
export declare function deleteRecords(db: Database, table: string, where?: WhereCondition | WhereCondition[]): Promise<number>;
export declare function deleteById(db: Database, table: string, id: number, idField?: string): Promise<number>;
export declare function deleteAll(db: Database, table: string): Promise<number>;
