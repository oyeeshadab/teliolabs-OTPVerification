import { Database } from "../Database";
import { WhereCondition } from "../types";
export declare function update(db: Database, table: string, data: Record<string, any>, where?: WhereCondition | WhereCondition[]): Promise<number>;
export declare function updateById(db: Database, table: string, id: number, data: Record<string, any>, idField?: string): Promise<number>;
