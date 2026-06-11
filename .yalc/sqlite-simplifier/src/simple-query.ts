import { Database } from "./Database";

export interface JoinConfig {
  from: string;
  on: string | { local: string; foreign: string };
  fields?: string[];
  type?: "left" | "inner" | "right";
  as?: string;
}

export interface DateFilter {
  field: string;
  type:
    | "today"
    | "thisWeek"
    | "thisMonth"
    | "thisYear"
    | "last7Days"
    | "lastMonth";
}

export class QueryBuilder<T = any> {
  private db: Database;
  private table: string = "";
  private selectFields: string[] = ["*"];
  private joins: Map<string, JoinConfig> = new Map();
  private whereConditions: Record<string, any> = {};
  private whereRawConditions: Array<{
    field: string;
    operator: string;
    value: any;
  }> = [];
  private dateFilter: DateFilter | null = null;
  private orderByField: string = "";
  private orderByDirection: "ASC" | "DESC" = "ASC";
  private limitCount: number = 0;
  private offsetCount: number = 0;
  private groupByFields: string[] = [];
  private havingCondition: string = "";

  constructor(db: Database) {
    this.db = db;
  }

  // Main table selection
  from(table_name: string): this {
    this.table = table_name;
    return this;
  }

  // Alias for from()
  // table(table_name: string): this {
  //   return this.from(table_name);
  // }

  // Select specific fields
  select(fields: string[]): this {
    this.selectFields = fields;
    return this;
  }

  // Add a single field to select
  addField(field: string): this {
    if (this.selectFields[0] === "*") {
      this.selectFields = [];
    }
    this.selectFields.push(field);
    return this;
  }

  // Join with another table
  join(config: JoinConfig): this {
    const key = config.as || config.from;
    this.joins.set(key, config);
    return this;
  }

  // Simple join with default settings
  with(
    relationName: string,
    tableName: string,
    foreignKey: string,
    fields?: string[],
  ): this {
    this.joins.set(relationName, {
      from: tableName,
      on: foreignKey,
      fields: fields || ["*"],
      type: "left",
    });
    return this;
  }

  // Inner join
  innerJoin(table: string, on: string, fields?: string[]): this {
    return this.join({
      from: table,
      on,
      fields,
      type: "inner",
    });
  }

  // Left join
  leftJoin(table: string, on: string, fields?: string[]): this {
    return this.join({
      from: table,
      on,
      fields,
      type: "left",
    });
  }

  // WHERE conditions
  where(field: string, value: any): this {
    this.whereConditions[field] = value;
    return this;
  }

  whereEqual(field: string, value: any): this {
    return this.where(field, value);
  }

  whereNot(field: string, value: any): this {
    this.whereRawConditions.push({ field, operator: "!=", value });
    return this;
  }

  whereGreater(field: string, value: any): this {
    this.whereRawConditions.push({ field, operator: ">", value });
    return this;
  }

  whereLess(field: string, value: any): this {
    this.whereRawConditions.push({ field, operator: "<", value });
    return this;
  }

  whereGreaterOrEqual(field: string, value: any): this {
    this.whereRawConditions.push({ field, operator: ">=", value });
    return this;
  }

  whereLessOrEqual(field: string, value: any): this {
    this.whereRawConditions.push({ field, operator: "<=", value });
    return this;
  }

  whereLike(field: string, pattern: string): this {
    this.whereRawConditions.push({
      field,
      operator: "LIKE",
      value: `%${pattern}%`,
    });
    return this;
  }

  whereIn(field: string, values: any[]): this {
    this.whereRawConditions.push({ field, operator: "IN", value: values });
    return this;
  }

  // Date filters (generic)
  thisMonth(field: string = "created_at"): this {
    this.dateFilter = { field, type: "thisMonth" };
    return this;
  }

  thisWeek(field: string = "created_at"): this {
    this.dateFilter = { field, type: "thisWeek" };
    return this;
  }

  today(field: string = "created_at"): this {
    this.dateFilter = { field, type: "today" };
    return this;
  }

  thisYear(field: string = "created_at"): this {
    this.dateFilter = { field, type: "thisYear" };
    return this;
  }

  last7Days(field: string = "created_at"): this {
    this.dateFilter = { field, type: "last7Days" };
    return this;
  }

  lastMonth(field: string = "created_at"): this {
    this.dateFilter = { field, type: "lastMonth" };
    return this;
  }

  // Custom date range
  dateRange(field: string, startDate: string, endDate: string): this {
    this.whereRawConditions.push(
      { field, operator: ">=", value: startDate },
      { field, operator: "<=", value: endDate },
    );
    return this;
  }

  // Order by
  orderBy(field: string, direction: "ASC" | "DESC" = "ASC"): this {
    this.orderByField = field;
    this.orderByDirection = direction;
    return this;
  }

  // Limit and offset
  limit(count: number): this {
    this.limitCount = count;
    return this;
  }

  offset(count: number): this {
    this.offsetCount = count;
    return this;
  }

  // Pagination helper
  page(pageNumber: number, pageSize: number): this {
    this.limitCount = pageSize;
    this.offsetCount = (pageNumber - 1) * pageSize;
    return this;
  }

  // Group by
  groupBy(...fields: string[]): this {
    this.groupByFields = fields;
    return this;
  }

  having(condition: string): this {
    this.havingCondition = condition;
    return this;
  }

  // Execute query
  async get(): Promise<T[]> {
    const { sql, params } = this.buildSelectQuery();
    console.log(`[SQL] ${sql}`); // Debug
    console.log(`[Params]`, params);
    return await this.db.executeQuery(sql, params);
  }

  // Get first record
  async first(): Promise<T | null> {
    const results = await this.limit(1).get();
    return results[0] || null;
  }

  // Count records
  async count(): Promise<number> {
    const originalSelect = this.selectFields;
    this.selectFields = ["COUNT(*) as total"];
    const result = await this.get();
    this.selectFields = originalSelect;
    return (result[0] as any)?.total || 0;
  }

  // Check if exists
  async exists(): Promise<boolean> {
    const count = await this.count();
    return count > 0;
  }

  // Build the SELECT query
  private buildSelectQuery(): { sql: string; params: any[] } {
    const params: any[] = [];
    let sql = `SELECT `;

    // Build SELECT clause
    const selectParts: string[] = [];

    if (this.selectFields.includes("*")) {
      selectParts.push(`${this.table}.*`);
    } else {
      selectParts.push(
        ...this.selectFields.map((f) =>
          f.includes(".") || f.includes("(") ? f : `${this.table}.${f}`,
        ),
      );
    }

    // Add joined table fields
    for (const [alias, join] of this.joins) {
      const fields = join.fields || ["*"];
      for (const field of fields) {
        if (field === "*") {
          selectParts.push(`${join.from}.*`);
        } else {
          const fieldAlias = `${alias}_${field}`;
          selectParts.push(`${join.from}.${field} as ${fieldAlias}`);
        }
      }
    }

    sql += selectParts.join(", ");
    sql += ` FROM ${this.table}`;

    // Build JOIN clauses
    for (const [_, join] of this.joins) {
      const joinType = join.type || "left";
      let onClause: string;

      if (typeof join.on === "string") {
        onClause = `${this.table}.${join.on} = ${join.from}.id`;
      } else {
        onClause = `${this.table}.${join.on.local} = ${join.from}.${join.on.foreign}`;
      }

      sql += ` ${joinType.toUpperCase()} JOIN ${join.from} ON ${onClause}`;
    }

    // Build WHERE clause
    const whereParts: string[] = [];

    // Simple where conditions
    for (const [field, value] of Object.entries(this.whereConditions)) {
      whereParts.push(`${field} = ?`);
      params.push(value);
    }

    // Raw where conditions
    for (const condition of this.whereRawConditions) {
      if (condition.operator === "IN") {
        const placeholders = (condition.value as any[])
          .map(() => "?")
          .join(", ");
        whereParts.push(`${condition.field} IN (${placeholders})`);
        params.push(...(condition.value as any[]));
      } else {
        whereParts.push(`${condition.field} ${condition.operator} ?`);
        params.push(condition.value);
      }
    }

    // Date filter
    if (this.dateFilter) {
      const dateCondition = this.buildDateCondition(this.dateFilter, params);
      if (dateCondition) {
        whereParts.push(dateCondition);
      }
    }

    if (whereParts.length > 0) {
      sql += ` WHERE ${whereParts.join(" AND ")}`;
    }

    // GROUP BY
    if (this.groupByFields.length > 0) {
      sql += ` GROUP BY ${this.groupByFields.join(", ")}`;
    }

    // HAVING
    if (this.havingCondition) {
      sql += ` HAVING ${this.havingCondition}`;
    }

    // ORDER BY
    if (this.orderByField) {
      sql += ` ORDER BY ${this.orderByField} ${this.orderByDirection}`;
    }

    // LIMIT
    if (this.limitCount > 0) {
      sql += ` LIMIT ${this.limitCount}`;
    }

    // OFFSET
    if (this.offsetCount > 0) {
      sql += ` OFFSET ${this.offsetCount}`;
    }

    return { sql, params };
  }

  private buildDateCondition(dateFilter: DateFilter, params: any[]): string {
    switch (dateFilter.type) {
      case "today":
        params.push("now", "now", "+1 day");
        return `${dateFilter.field} >= date(?) AND ${dateFilter.field} < date(?, ?)`;
      case "thisWeek":
        return `${dateFilter.field} >= date('now','weekday 0','-7 days') AND ${dateFilter.field} < date('now','weekday 0')`;
      case "thisMonth":
        params.push(
          "now",
          "start of month",
          "now",
          "start of month",
          "+1 month",
        );
        return `${dateFilter.field} >= date(?, ?) AND ${dateFilter.field} < date(?, ?, ?)`;
      case "thisYear":
        params.push("now", "start of year", "now", "start of year", "+1 year");
        return `${dateFilter.field} >= date(?, ?) AND ${dateFilter.field} < date(?, ?, ?)`;
      case "last7Days":
        return `${dateFilter.field} >= date('now','-7 days') AND ${dateFilter.field} <= date('now')`;
      case "lastMonth":
        return `${dateFilter.field} >= date('now','start of month','-1 month') AND ${dateFilter.field} < date('now','start of month')`;
      default:
        return "";
    }
  }
}

// Main SimpleDB class
export class SimpleDB {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  from<T = any>(table: string): QueryBuilder<T> {
    return new QueryBuilder<T>(this.db).from(table);
  }

  table<T = any>(table: string): QueryBuilder<T> {
    return this.from<T>(table);
  }
}

// Helper function
export function createSimpleDB(db: Database): SimpleDB {
  return new SimpleDB(db);
}
