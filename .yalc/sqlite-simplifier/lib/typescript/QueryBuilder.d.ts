import { AdvancedQuery, RelationConfig } from "./advanced-queries";
export declare class QueryBuilder<T = any> {
    private table;
    private advancedQuery;
    private options;
    private relations;
    constructor(table: string, advancedQuery: AdvancedQuery, relations?: Record<string, RelationConfig>);
    select(fields: Record<string, string>): this;
    where(where: Record<string, any>): this;
    include(relations: Record<string, boolean>): this;
    orderBy(field: string, direction?: "ASC" | "DESC"): this;
    latest(field?: string): this;
    limit(limit: number): this;
    withCount(relationName: string): this;
    get(): Promise<T[]>;
    first(): Promise<T | null>;
}
