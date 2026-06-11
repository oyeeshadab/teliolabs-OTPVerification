import { Database } from "../Database";
export declare function insert(db: Database, table: string, data: Record<string, any>): Promise<number>;
export declare function insertMany(db: Database, table: string, dataArray: Record<string, any>[]): Promise<number[]>;
