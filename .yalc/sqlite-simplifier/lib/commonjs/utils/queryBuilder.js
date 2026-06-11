"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QueryBuilder = void 0;
class QueryBuilder {
  static buildInsertQuery(options) {
    const {
      table,
      data,
      onConflict
    } = options;
    const fields = Object.keys(data);
    const values = Object.values(data);
    const placeholders = fields.map(() => "?").join(", ");
    const conflictClause = onConflict ? ` OR ${onConflict}` : "";
    const query = `INSERT${conflictClause} INTO ${table} (${fields.join(", ")}) VALUES (${placeholders})`;
    return {
      query,
      params: values
    };
  }
  static buildSelectQuery(options) {
    const {
      table,
      fields = ["*"],
      where,
      orderBy,
      limit,
      offset
    } = options;
    const selectFields = fields.join(", ");
    let query = `SELECT ${selectFields} FROM ${table}`;
    const params = [];
    if (where) {
      const whereClause = this.buildWhereClause(where, params);
      query += ` WHERE ${whereClause}`;
    }
    if (orderBy) {
      query += ` ORDER BY ${orderBy.field} ${orderBy.direction || "ASC"}`;
    }
    if (limit) {
      query += ` LIMIT ${limit}`;
    }
    if (offset) {
      query += ` OFFSET ${offset}`;
    }
    return {
      query,
      params
    };
  }
  static buildUpdateQuery(options) {
    const {
      table,
      data,
      where
    } = options;
    const setClause = Object.keys(data).map(field => `${field} = ?`).join(", ");
    const params = Object.values(data);
    let query = `UPDATE ${table} SET ${setClause}`;
    if (where) {
      const whereClause = this.buildWhereClause(where, params);
      query += ` WHERE ${whereClause}`;
    }
    return {
      query,
      params
    };
  }
  static buildDeleteQuery(options) {
    const {
      table,
      where
    } = options;
    const params = [];
    let query = `DELETE FROM ${table}`;
    if (where) {
      const whereClause = this.buildWhereClause(where, params);
      query += ` WHERE ${whereClause}`;
    }
    return {
      query,
      params
    };
  }
  static buildDropQuery(options) {
    const {
      table,
      ifExists = false
    } = options;
    const existsClause = ifExists ? " IF EXISTS" : "";
    return `DROP TABLE${existsClause} ${table}`;
  }
  static buildWhereClause(where, params) {
    const conditions = Array.isArray(where) ? where : [where];
    const clauses = conditions.map(condition => {
      if (condition.operator === "IN") {
        const placeholders = condition.value.map(() => "?").join(", ");
        params.push(...condition.value);
        return `${condition.field} IN (${placeholders})`;
      } else {
        params.push(condition.value);
        return `${condition.field} ${condition.operator} ?`;
      }
    });
    return clauses.join(" AND ");
  }
}
exports.QueryBuilder = QueryBuilder;
//# sourceMappingURL=queryBuilder.js.map