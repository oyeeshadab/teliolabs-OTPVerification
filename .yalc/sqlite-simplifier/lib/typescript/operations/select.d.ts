import { Database } from "../Database";
import { WhereCondition } from "../types";
export declare function select<T = any>(db: Database, table: string, where?: WhereCondition | WhereCondition[]): Promise<T[]>;
export declare function selectAll<T = any>(db: Database, table: string): Promise<T[]>;
export declare function selectById<T = any>(db: Database, table: string, id: number, idField?: string): Promise<T | null>;
export declare function selectWithFields<T = any>(db: Database, table: string, fields: string[], where?: WhereCondition | WhereCondition[]): Promise<T[]>;
export declare function selectFirst<T = any>(db: Database, table: string, where?: WhereCondition | WhereCondition[]): Promise<T | null>;
