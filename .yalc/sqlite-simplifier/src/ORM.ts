import { Database } from "./Database";

import { AdvancedQuery, RelationConfig } from "./advanced-queries";

import { QueryBuilder } from "./QueryBuilder";

export class ORM {
  private advancedQuery: AdvancedQuery;

  private relations: Record<string, Record<string, RelationConfig>> = {};

  constructor(db: Database) {
    this.advancedQuery = new AdvancedQuery(db);
  }

  /*
   * ============================================
   * DEFINE RELATIONS
   * ============================================
   */

  defineRelations(table: string, relations: Record<string, RelationConfig>) {
    this.relations[table] = relations;

    this.advancedQuery.defineRelations(table, relations);
  }

  /*
   * ============================================
   * TABLE
   * ============================================
   */

  table<T = any>(table: string) {
    return new QueryBuilder<T>(
      table,
      this.advancedQuery,
      this.relations[table] || {},
    );
  }

  /*
   * ============================================
   * DYNAMIC TABLE GETTERS
   * ============================================
   */

  get categories() {
    return this.table("categories");
  }

  get transactions() {
    return this.table("transactions");
  }
}
