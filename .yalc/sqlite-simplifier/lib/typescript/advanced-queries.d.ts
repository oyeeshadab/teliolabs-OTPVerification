import { Database } from "./Database";
/**
 * ============================================
 * OPERATORS
 * ============================================
 */
export type SQLOperator = "=" | "!=" | ">" | "<" | ">=" | "<=" | "LIKE" | "IN" | "NOT IN" | "BETWEEN" | "IS NULL" | "IS NOT NULL";
/**
 * ============================================
 * QUERY TYPES
 * ============================================
 */
export declare enum QueryType {
    SELECT = "SELECT",
    INSERT = "INSERT",
    UPDATE = "UPDATE",
    DELETE = "DELETE"
}
/**
 * ============================================
 * TYPES
 * ============================================
 */
export interface WhereCondition {
    field: string;
    operator: SQLOperator;
    value?: any;
    logicalOperator?: "AND" | "OR";
}
export interface includeClause {
    tableName: string;
    localKey: string;
    foreignKey: string;
    type?: "left" | "inner" | "right";
}
export interface RelationConfig {
    table: string;
    localKey: string;
    foreignKey: string;
    type?: "left" | "inner" | "right";
}
export interface OrderByCondition {
    field: string;
    direction?: "ASC" | "DESC";
}
export interface QueryOptions {
    select?: Record<string, string>;
    include?: Record<string, any> | includeClause;
    where?: Record<string, any> | WhereCondition[];
    groupBy?: string | string[];
    having?: WhereCondition[];
    orderBy?: OrderByCondition | OrderByCondition[];
    limit?: number;
    offset?: number;
    distinct?: boolean;
    count?: {
        column?: string;
        as?: string;
    };
}
export interface InsertOptions {
    data: Record<string, any>;
}
export interface UpdateQueryOptions {
    data: Record<string, any>;
    where?: Record<string, any> | WhereCondition[];
}
export interface DeleteQueryOptions {
    where?: Record<string, any> | WhereCondition[];
}
/**
 * ============================================
 * HELPERS
 * ============================================
 */
export declare function where(field: string, operator: SQLOperator, value?: any): WhereCondition;
export declare function orWhere(field: string, operator: SQLOperator, value?: any): WhereCondition;
export declare function asc(field: string): OrderByCondition;
export declare function desc(field: string): OrderByCondition;
export declare function sum(field: string): string;
export declare function avg(field: string): string;
export declare function count(field: string): string;
export declare function min(field: string): string;
export declare function max(field: string): string;
/**
 * ============================================
 * SIMPLIFIED QUERY BUILDER
 * ============================================
 */
export declare class QueryBuilderSimplified {
    private table;
    private advancedQuery;
    private selectFields;
    private relations;
    private whereConditions;
    private groupByFields;
    private orderByFields;
    private limitValue?;
    private offsetValue?;
    private aggregates;
    private includeRelations;
    constructor(table: string, advancedQuery: AdvancedQuery);
    select(...fields: string[]): this;
    selectAll(): this;
    aggregate(alias: string, expression: string): this;
    count(alias: string, field?: string): this;
    sum(alias: string, field: string): this;
    avg(alias: string, field: string): this;
    max(alias: string, field: string): this;
    min(alias: string, field: string): this;
    join(relation: string, config?: Partial<RelationConfig>): this;
    leftJoin(relation: string, localKey?: string, foreignKey?: string): this;
    innerJoin(relation: string, localKey?: string, foreignKey?: string): this;
    where(conditions: Record<string, any>): this;
    groupBy(...fields: string[]): this;
    orderBy(field: string, direction?: "ASC" | "DESC"): this;
    limit(limit: number): this;
    offset(offset: number): this;
    private build;
    get<T = any>(): Promise<T[]>;
    first<T = any>(): Promise<T | null>;
}
/**
 * ============================================
 * ADVANCED QUERY
 * ============================================
 */
export declare class AdvancedQuery {
    private db;
    private relations;
    private enableLogging;
    private pendingQueries;
    private lastQueryTime;
    private readonly MIN_QUERY_INTERVAL_MS;
    constructor(db: Database, enableLogging?: boolean);
    /**
     * ============================================
     * DEFINE RELATIONS
     * ============================================
     */
    defineRelations(table: string, relations: Record<string, RelationConfig>): void;
    defineAllRelations(relationsConfig: Record<string, Record<string, RelationConfig>>): void;
    /**
     * ============================================
     * QUERY BUILDER
     * ============================================
     */
    query(table: string): QueryBuilderSimplified;
    /**
     * ============================================
     * SIMPLIFIED METHODS
     * ============================================
     */
    findWhere<T = any>(table: string, where: Record<string, any>, options?: Partial<QueryOptions>): Promise<T[]>;
    findById<T = any>(table: string, id: number | string): Promise<T | null>;
    withCount<T = any>(table: string, relation: string, groupByField?: string): Promise<T[]>;
    exists(table: string, where: Record<string, any>): Promise<boolean>;
    /**
     * ============================================
     * CORE METHODS
     * ============================================
     */
    find<T = any>(table: string, options?: QueryOptions): Promise<T[]>;
    findFirst<T = any>(table: string, options?: QueryOptions): Promise<T | null>;
    insert(table: string, options: InsertOptions): Promise<number>;
    update(table: string, options: UpdateQueryOptions): Promise<number>;
    updateById(table: string, id: number | string, data: Record<string, any>): Promise<number>;
    delete(table: string, options: DeleteQueryOptions): Promise<number>;
    deleteById(table: string, id: number | string): Promise<number>;
    count(table: string, where?: Record<string, any>): Promise<number>;
    raw<T = any>(sql: string, params?: any[]): Promise<T>;
    setLogging(enabled: boolean): void;
    clearCache(): void;
    private getQueryKey;
    /**
     * ============================================
     * BUILD METHODS
     * ============================================
     */
    private buildSelectQuery;
    private buildInsertQuery;
    private buildUpdateQuery;
    private buildDeleteQuery;
    private buildSelectClause;
    private buildJoins;
    private buildWhereClause;
    private buildCondition;
    private buildHavingClause;
    private buildOrderByClause;
    private sanitizeIdentifier;
    private sanitizeColumn;
}
/**
 * ============================================
 * FACTORY
 * ============================================
 */
export declare function createAdvancedQuery(db: Database, enableLogging?: boolean): AdvancedQuery;
