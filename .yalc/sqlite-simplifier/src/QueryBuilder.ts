import {
  AdvancedQuery,
  QueryOptions,
  RelationConfig,
} from "./advanced-queries";

export class QueryBuilder<T = any> {
  private table: string;

  private advancedQuery: AdvancedQuery;

  private options: QueryOptions = {};

  private relations: Record<string, RelationConfig> = {};

  constructor(
    table: string,
    advancedQuery: AdvancedQuery,
    relations: Record<string, RelationConfig> = {},
  ) {
    this.table = table;

    this.advancedQuery = advancedQuery;

    this.relations = relations;
  }

  /*
   * ============================================
   * SELECT
   * ============================================
   */

  select(fields: Record<string, string>) {
    this.options.select = fields;

    return this;
  }

  /*
   * ============================================
   * WHERE
   * ============================================
   */

  where(where: Record<string, any>) {
    this.options.where = where;

    return this;
  }

  /*
   * ============================================
   * INCLUDE
   * ============================================
   */

  include(relations: Record<string, boolean>) {
    this.options.include = relations;

    return this;
  }

  /*
   * ============================================
   * ORDER BY
   * ============================================
   */

  orderBy(field: string, direction: "ASC" | "DESC" = "ASC") {
    this.options.orderBy = {
      field,
      direction,
    };

    return this;
  }

  /*
   * ============================================
   * LATEST
   * ============================================
   */

  latest(field = "created_at") {
    this.options.orderBy = {
      field,
      direction: "DESC",
    };

    return this;
  }

  /*
   * ============================================
   * LIMIT
   * ============================================
   */

  limit(limit: number) {
    this.options.limit = limit;

    return this;
  }

  /*
   * ============================================
   * WITH COUNT
   * ============================================
   */

  withCount(relationName: string) {
    const relation = this.relations[relationName];

    if (!relation) {
      throw new Error(`Relation '${relationName}' not found`);
    }

    /*
     * Include relation
     */

    this.options.include = {
      ...(this.options.include || {}),
      [relationName]: true,
    };

    /*
     * Select all current table fields
     */

    this.options.select = {
      ...(this.options.select || {}),

      "*": "*",

      [`${relationName}Count`]: `COUNT(${relation.table}.id)`,
    };

    /*
     * Group by current table id
     */

    this.options.groupBy = `${this.table}.id`;

    return this;
  }

  /*
   * ============================================
   * GET
   * ============================================
   */

  async get(): Promise<T[]> {
    return this.advancedQuery.find<T>(this.table, this.options);
  }

  /*
   * ============================================
   * FIRST
   * ============================================
   */

  async first(): Promise<T | null> {
    return this.advancedQuery.findFirst<T>(this.table, this.options);
  }
}
