import { Database } from "./Database";
export interface JoinConfig {
    from: string;
    on: string | {
        local: string;
        foreign: string;
    };
    fields?: string[];
    type?: "left" | "inner" | "right";
    as?: string;
}
export interface DateFilter {
    field: string;
    type: "today" | "thisWeek" | "thisMonth" | "thisYear" | "last7Days" | "lastMonth";
}
export declare class QueryBuilder<T = any> {
    private db;
    private table;
    private selectFields;
    private joins;
    private whereConditions;
    private whereRawConditions;
    private dateFilter;
    private orderByField;
    private orderByDirection;
    private limitCount;
    private offsetCount;
    private groupByFields;
    private havingCondition;
    constructor(db: Database);
    from(table_name: string): this;
    select(fields: string[]): this;
    addField(field: string): this;
    join(config: JoinConfig): this;
    with(relationName: string, tableName: string, foreignKey: string, fields?: string[]): this;
    innerJoin(table: string, on: string, fields?: string[]): this;
    leftJoin(table: string, on: string, fields?: string[]): this;
    where(field: string, value: any): this;
    whereEqual(field: string, value: any): this;
    whereNot(field: string, value: any): this;
    whereGreater(field: string, value: any): this;
    whereLess(field: string, value: any): this;
    whereGreaterOrEqual(field: string, value: any): this;
    whereLessOrEqual(field: string, value: any): this;
    whereLike(field: string, pattern: string): this;
    whereIn(field: string, values: any[]): this;
    thisMonth(field?: string): this;
    thisWeek(field?: string): this;
    today(field?: string): this;
    thisYear(field?: string): this;
    last7Days(field?: string): this;
    lastMonth(field?: string): this;
    dateRange(field: string, startDate: string, endDate: string): this;
    orderBy(field: string, direction?: "ASC" | "DESC"): this;
    limit(count: number): this;
    offset(count: number): this;
    page(pageNumber: number, pageSize: number): this;
    groupBy(...fields: string[]): this;
    having(condition: string): this;
    get(): Promise<T[]>;
    first(): Promise<T | null>;
    count(): Promise<number>;
    exists(): Promise<boolean>;
    private buildSelectQuery;
    private buildDateCondition;
}
export declare class SimpleDB {
    private db;
    constructor(db: Database);
    from<T = any>(table: string): QueryBuilder<T>;
    table<T = any>(table: string): QueryBuilder<T>;
}
export declare function createSimpleDB(db: Database): SimpleDB;
