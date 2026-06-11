import { WhereCondition, InsertOptions, SelectOptions, UpdateOptions } from "../types";
export declare class QueryBuilder {
    static buildInsertQuery(options: InsertOptions): {
        query: string;
        params: any[];
    };
    static buildSelectQuery(options: SelectOptions): {
        query: string;
        params: any[];
    };
    static buildUpdateQuery(options: UpdateOptions): {
        query: string;
        params: any[];
    };
    static buildDeleteQuery(options: {
        table: string;
        where?: WhereCondition | WhereCondition[];
    }): {
        query: string;
        params: any[];
    };
    static buildDropQuery(options: {
        table: string;
        ifExists?: boolean;
    }): string;
    private static buildWhereClause;
}
