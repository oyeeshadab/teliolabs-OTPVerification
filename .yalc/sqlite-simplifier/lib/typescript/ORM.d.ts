import { Database } from "./Database";
import { RelationConfig } from "./advanced-queries";
import { QueryBuilder } from "./QueryBuilder";
export declare class ORM {
    private advancedQuery;
    private relations;
    constructor(db: Database);
    defineRelations(table: string, relations: Record<string, RelationConfig>): void;
    table<T = any>(table: string): QueryBuilder<T>;
    get categories(): QueryBuilder<any>;
    get transactions(): QueryBuilder<any>;
}
