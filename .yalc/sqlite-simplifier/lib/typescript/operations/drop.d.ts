import { Database } from "../Database";
export declare function dropTable(db: Database, table: string, ifExists?: boolean): Promise<void>;
