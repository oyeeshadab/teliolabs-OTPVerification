function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// advanced-queries.ts - Complete working version

/**
 * ============================================
 * OPERATORS
 * ============================================
 */

/**
 * ============================================
 * QUERY TYPES
 * ============================================
 */

export let QueryType = /*#__PURE__*/function (QueryType) {
  QueryType["SELECT"] = "SELECT";
  QueryType["INSERT"] = "INSERT";
  QueryType["UPDATE"] = "UPDATE";
  QueryType["DELETE"] = "DELETE";
  return QueryType;
}({});

/**
 * ============================================
 * TYPES
 * ============================================
 */

/**
 * ============================================
 * HELPERS
 * ============================================
 */

export function where(field, operator, value) {
  return {
    field,
    operator,
    value,
    logicalOperator: "AND"
  };
}
export function orWhere(field, operator, value) {
  return {
    field,
    operator,
    value,
    logicalOperator: "OR"
  };
}
export function asc(field) {
  return {
    field,
    direction: "ASC"
  };
}
export function desc(field) {
  return {
    field,
    direction: "DESC"
  };
}
export function sum(field) {
  return `SUM(${field})`;
}
export function avg(field) {
  return `AVG(${field})`;
}
export function count(field) {
  return `COUNT(${field})`;
}
export function min(field) {
  return `MIN(${field})`;
}
export function max(field) {
  return `MAX(${field})`;
}

/**
 * ============================================
 * SIMPLIFIED QUERY BUILDER
 * ============================================
 */

export class QueryBuilderSimplified {
  constructor(table, advancedQuery) {
    _defineProperty(this, "table", void 0);
    _defineProperty(this, "advancedQuery", void 0);
    _defineProperty(this, "selectFields", []);
    _defineProperty(this, "relations", {});
    _defineProperty(this, "whereConditions", {});
    _defineProperty(this, "groupByFields", []);
    _defineProperty(this, "orderByFields", []);
    _defineProperty(this, "limitValue", void 0);
    _defineProperty(this, "offsetValue", void 0);
    _defineProperty(this, "aggregates", []);
    _defineProperty(this, "includeRelations", {});
    this.table = table;
    this.advancedQuery = advancedQuery;
  }
  select(...fields) {
    this.selectFields = fields;
    return this;
  }
  selectAll() {
    this.selectFields = [];
    return this;
  }
  aggregate(alias, expression) {
    this.aggregates.push({
      alias,
      expression
    });
    return this;
  }
  count(alias, field = "*") {
    return this.aggregate(alias, `COUNT(${field})`);
  }
  sum(alias, field) {
    return this.aggregate(alias, `SUM(${field})`);
  }
  avg(alias, field) {
    return this.aggregate(alias, `AVG(${field})`);
  }
  max(alias, field) {
    return this.aggregate(alias, `MAX(${field})`);
  }
  min(alias, field) {
    return this.aggregate(alias, `MIN(${field})`);
  }
  join(relation, config) {
    this.includeRelations[relation] = true;
    this.relations[relation] = config || {
      table: relation,
      localKey: `${this.table}_id`,
      foreignKey: "id"
    };
    return this;
  }
  leftJoin(relation, localKey, foreignKey) {
    this.includeRelations[relation] = true;
    this.relations[relation] = {
      table: relation,
      localKey: localKey || `${this.table}_id`,
      foreignKey: foreignKey || "id",
      type: "left"
    };
    return this;
  }
  innerJoin(relation, localKey, foreignKey) {
    this.includeRelations[relation] = true;
    this.relations[relation] = {
      table: relation,
      localKey: localKey || `${this.table}_id`,
      foreignKey: foreignKey || "id",
      type: "inner"
    };
    return this;
  }
  where(conditions) {
    this.whereConditions = {
      ...this.whereConditions,
      ...conditions
    };
    return this;
  }
  groupBy(...fields) {
    this.groupByFields = fields;
    return this;
  }
  orderBy(field, direction = "ASC") {
    this.orderByFields.push({
      field,
      direction
    });
    return this;
  }
  limit(limit) {
    this.limitValue = limit;
    return this;
  }
  offset(offset) {
    this.offsetValue = offset;
    return this;
  }
  build() {
    const select = {};
    if (this.selectFields.length > 0) {
      this.selectFields.forEach(field => {
        select[field] = field;
      });
    }
    this.aggregates.forEach(agg => {
      select[agg.alias] = agg.expression;
    });
    const include = {};
    Object.keys(this.includeRelations).forEach(rel => {
      include[rel] = true;
    });
    return {
      select: Object.keys(select).length > 0 ? select : undefined,
      include: Object.keys(include).length > 0 ? include : undefined,
      where: this.whereConditions,
      groupBy: this.groupByFields.length > 0 ? this.groupByFields : undefined,
      orderBy: this.orderByFields,
      limit: this.limitValue,
      offset: this.offsetValue
    };
  }
  async get() {
    const options = this.build();
    if (Object.keys(this.relations).length > 0) {
      this.advancedQuery.defineRelations(this.table, this.relations);
    }
    return this.advancedQuery.find(this.table, options);
  }
  async first() {
    this.limitValue = 1;
    const options = this.build();
    if (Object.keys(this.relations).length > 0) {
      this.advancedQuery.defineRelations(this.table, this.relations);
    }
    return this.advancedQuery.findFirst(this.table, options);
  }
}

/**
 * ============================================
 * ADVANCED QUERY
 * ============================================
 */

export class AdvancedQuery {
  constructor(db, enableLogging = false) {
    _defineProperty(this, "db", void 0);
    _defineProperty(this, "relations", {});
    _defineProperty(this, "enableLogging", false);
    _defineProperty(this, "pendingQueries", new Map());
    _defineProperty(this, "lastQueryTime", 0);
    _defineProperty(this, "MIN_QUERY_INTERVAL_MS", 16);
    this.db = db;
    this.enableLogging = enableLogging;
  }

  /**
   * ============================================
   * DEFINE RELATIONS
   * ============================================
   */

  defineRelations(table, relations) {
    this.relations[table] = relations;
  }
  defineAllRelations(relationsConfig) {
    this.relations = {
      ...this.relations,
      ...relationsConfig
    };
  }

  /**
   * ============================================
   * QUERY BUILDER
   * ============================================
   */

  query(table) {
    return new QueryBuilderSimplified(table, this);
  }

  /**
   * ============================================
   * SIMPLIFIED METHODS
   * ============================================
   */

  async findWhere(table, where, options) {
    return this.find(table, {
      where,
      ...options
    });
  }
  async findById(table, id) {
    return this.findFirst(table, {
      where: {
        id
      }
    });
  }
  async withCount(table, relation, groupByField = "id") {
    return this.query(table).leftJoin(relation).groupBy(`${table}.${groupByField}`).count(`${relation}Count`, `${relation}.id`).get();
  }
  async exists(table, where) {
    const result = await this.findFirst(table, {
      where,
      select: {
        id: "id"
      }
    });
    return result !== null;
  }

  /**
   * ============================================
   * CORE METHODS
   * ============================================
   */

  async find(table, options = {}) {
    const queryKey = this.getQueryKey("find", table, options);
    if (this.pendingQueries.has(queryKey)) {
      if (this.enableLogging) {
        console.warn(`⚠️ Duplicate find query blocked for ${table}`);
      }
      return this.pendingQueries.get(queryKey);
    }
    const now = Date.now();
    if (now - this.lastQueryTime < this.MIN_QUERY_INTERVAL_MS) {
      await new Promise(resolve => setTimeout(resolve, this.MIN_QUERY_INTERVAL_MS));
    }
    this.lastQueryTime = Date.now();
    const promise = (async () => {
      try {
        const {
          sql,
          params
        } = this.buildSelectQuery(table, options);

        // if (this.enableLogging) {
        console.log("🔍 Generated SQL:", sql);
        console.log("📦 Params:", params);
        // }

        const results = await this.db.executeQuery(sql, params);
        return results;
      } catch (error) {
        console.error("❌ AdvancedQuery.find error:", error);
        throw error;
      } finally {
        this.pendingQueries.delete(queryKey);
      }
    })();
    this.pendingQueries.set(queryKey, promise);
    return promise;
  }
  async findFirst(table, options = {}) {
    const limitedOptions = {
      ...options,
      limit: 1
    };
    const results = await this.find(table, limitedOptions);
    return results.length > 0 ? results[0] : null;
  }
  async insert(table, options) {
    try {
      const {
        sql,
        params
      } = this.buildInsertQuery(table, options);
      if (this.enableLogging) {
        console.log("📝 Insert SQL:", sql);
        console.log("📦 Params:", params);
      }
      const result = await this.db.executeQuery(sql, params);
      return result.insertId || 0;
    } catch (error) {
      console.error("❌ AdvancedQuery.insert error:", error);
      throw error;
    }
  }
  async update(table, options) {
    try {
      const {
        sql,
        params
      } = this.buildUpdateQuery(table, options);
      if (this.enableLogging) {
        console.log("✏️ Update SQL:", sql);
        console.log("📦 Params:", params);
      }
      const result = await this.db.executeQuery(sql, params);
      return result.rowsAffected || 0;
    } catch (error) {
      console.error("❌ AdvancedQuery.update error:", error);
      throw error;
    }
  }
  async updateById(table, id, data) {
    return this.update(table, {
      data,
      where: {
        id
      }
    });
  }
  async delete(table, options) {
    try {
      const {
        sql,
        params
      } = this.buildDeleteQuery(table, options);
      if (this.enableLogging) {
        console.log("🗑️ Delete SQL:", sql);
        console.log("📦 Params:", params);
      }
      const result = await this.db.executeQuery(sql, params);
      return result.rowsAffected || 0;
    } catch (error) {
      console.error("❌ AdvancedQuery.delete error:", error);
      throw error;
    }
  }
  async deleteById(table, id) {
    return this.delete(table, {
      where: {
        id
      }
    });
  }
  async count(table, where) {
    var _results$;
    const options = {
      select: {
        count: "COUNT(*)"
      }
    };
    if (where) {
      options.where = where;
    }
    const results = await this.find(table, options);
    return ((_results$ = results[0]) === null || _results$ === void 0 ? void 0 : _results$.count) || 0;
  }
  async raw(sql, params = []) {
    try {
      if (this.enableLogging) {
        console.log("🔨 Raw SQL:", sql);
        console.log("📦 Params:", params);
      }
      return await this.db.executeQuery(sql, params);
    } catch (error) {
      console.error("❌ AdvancedQuery.raw error:", error);
      throw error;
    }
  }
  setLogging(enabled) {
    this.enableLogging = enabled;
    this.db.setLogging(enabled);
  }
  clearCache() {
    this.pendingQueries.clear();
    this.db.clearQueryCache();
  }
  getQueryKey(method, table, options) {
    return `${method}:${table}:${JSON.stringify(options)}`;
  }

  /**
   * ============================================
   * BUILD METHODS
   * ============================================
   */

  buildSelectQuery(table, options) {
    const params = [];
    let sql = `${QueryType.SELECT} `;
    if (options.distinct) {
      sql += `DISTINCT `;
    }
    sql += `${this.buildSelectClause(table, options)}\n`;
    if (options.count) {
      const column = options.count.column || "*";
      const alias = options.count.as || "count";
      const countColumn = column === "*" ? "*" : this.sanitizeColumn(column);
      // const countColumn =
      //   column === "*" ? "*" : this.sanitizeIdentifier(column);
      sql += `,COUNT(${countColumn}) AS ${this.sanitizeIdentifier(alias)}\n`;
      // selects.push(
      //   `COUNT(${countColumn}) AS ${this.sanitizeIdentifier(alias)}`,
      // );
    }
    sql += `FROM ${this.sanitizeIdentifier(table)}\n`;
    sql += this.buildJoins(table, options);

    // if (options.count) {
    //   const column = options.count.column || "*";
    //   const alias = options.count.as || "count";

    //   const countColumn =
    //     column === "*" ? "*" : this.sanitizeIdentifier(column);
    //   sql += `COUNT(${countColumn}) AS ${this.sanitizeIdentifier(alias)}\n`;
    //   // selects.push(
    //   //   `COUNT(${countColumn}) AS ${this.sanitizeIdentifier(alias)}`,
    //   // );
    // }

    const whereClause = this.buildWhereClause(options.where, params);
    if (whereClause) {
      sql += `WHERE ${whereClause}\n`;
    }
    if (options.groupBy) {
      const groupBy = Array.isArray(options.groupBy) ? options.groupBy.join(", ") : options.groupBy;
      sql += `GROUP BY ${groupBy}\n`;
    }
    const havingClause = this.buildHavingClause(options.having, params);
    if (havingClause) {
      sql += `HAVING ${havingClause}\n`;
    }
    const orderByClause = this.buildOrderByClause(options.orderBy);
    if (orderByClause) {
      sql += `${orderByClause}\n`;
    }
    if (options.limit !== undefined) {
      sql += `LIMIT ${options.limit}\n`;
    }
    if (options.offset !== undefined) {
      sql += `OFFSET ${options.offset}\n`;
    }
    return {
      sql,
      params
    };
  }
  buildInsertQuery(table, options) {
    const fields = Object.keys(options.data);
    const placeholders = fields.map(() => "?").join(", ");
    const params = Object.values(options.data);
    const sql = `
      ${QueryType.INSERT} INTO ${this.sanitizeIdentifier(table)}
      (${fields.map(f => this.sanitizeIdentifier(f)).join(", ")})
      VALUES (${placeholders})
    `;
    return {
      sql,
      params
    };
  }
  buildUpdateQuery(table, options) {
    const params = [];
    let sql = `${QueryType.UPDATE} ${this.sanitizeIdentifier(table)} SET `;
    const setClause = Object.keys(options.data).map(field => {
      params.push(options.data[field]);
      return `${this.sanitizeIdentifier(field)} = ?`;
    }).join(", ");
    sql += setClause;
    const whereClause = this.buildWhereClause(options.where, params);
    if (whereClause) {
      sql += ` WHERE ${whereClause}`;
    }
    return {
      sql,
      params
    };
  }
  buildDeleteQuery(table, options) {
    const params = [];
    let sql = `${QueryType.DELETE} FROM ${this.sanitizeIdentifier(table)}`;
    const whereClause = this.buildWhereClause(options.where, params);
    if (whereClause) {
      sql += ` WHERE ${whereClause}`;
    }
    return {
      sql,
      params
    };
  }
  buildSelectClause(table, options) {
    if (!options.select) {
      return `${this.sanitizeIdentifier(table)}.*`;
    }
    const parts = [];
    for (const [alias, value] of Object.entries(options.select)) {
      if (value.includes(".")) {
        var _this$relations$table;
        const [relationName, field] = value.split(".");
        const relation = relationName ? (_this$relations$table = this.relations[table]) === null || _this$relations$table === void 0 ? void 0 : _this$relations$table[relationName] : undefined;
        if (relation && field) {
          parts.push(`${this.sanitizeIdentifier(relation.table)}.${this.sanitizeIdentifier(field)} as ${this.sanitizeIdentifier(alias)}`);
        } else if (field) {
          parts.push(`${value} as ${this.sanitizeIdentifier(alias)}`);
        } else {
          parts.push(`${this.sanitizeIdentifier(alias)}`);
        }
        continue;
      }
      if (value.includes("(")) {
        parts.push(`${value} as ${this.sanitizeIdentifier(alias)}`);
        continue;
      }
      parts.push(`${this.sanitizeIdentifier(table)}.${this.sanitizeIdentifier(value)} as ${this.sanitizeIdentifier(alias)}`);
    }
    return parts.join(", ");
  }

  //   private buildJoins(table: string, options: QueryOptions): string {
  //     if (!options.include) {
  //       return "";
  //     }

  //     let joins = "";

  //     console.log(
  //       "Object.entries(options.include)",
  //       Object.entries(options.include),
  //     );

  //     for (const [relationName, enabled] of Object.entries(options.include)) {
  //       if (!enabled) continue;

  //       const relation = this.relations[table]?.[relationName];
  //       if (!relation) continue;

  //       const joinType = (relation.type || "LEFT").toUpperCase();
  //       joins += `${joinType} JOIN ${this.sanitizeIdentifier(relation.table)}
  // ON ${this.sanitizeIdentifier(table)}.${this.sanitizeIdentifier(relation.localKey)} = ${this.sanitizeIdentifier(relation.table)}.${this.sanitizeIdentifier(relation.foreignKey)}\n`;
  //     }

  //     return joins;
  //   }

  buildJoins(table, options) {
    if (!options.include) {
      return "";
    }
    const {
      tableName,
      localKey,
      foreignKey,
      type = "LEFT"
    } = options.include;
    if (!tableName || !localKey || !foreignKey) {
      return "";
    }

    // const joinType = type.toUpperCase();
    const joinType = (type || "LEFT").toUpperCase();
    return `
${joinType} JOIN ${this.sanitizeIdentifier(tableName)}
ON ${this.sanitizeIdentifier(table)}.${this.sanitizeIdentifier(localKey)}
= ${this.sanitizeIdentifier(tableName)}.${this.sanitizeIdentifier(foreignKey)}
`;
  }
  buildWhereClause(where, params) {
    if (!where) return "";
    const conditions = [];
    if (!Array.isArray(where)) {
      for (const [field, value] of Object.entries(where)) {
        conditions.push(`${this.sanitizeIdentifier(field)} = ?`);
        params.push(value);
      }
      return conditions.join(" AND ");
    }
    where.forEach((condition, index) => {
      const sql = this.buildCondition(condition, params);
      if (index === 0) {
        conditions.push(sql);
      } else {
        conditions.push(`${condition.logicalOperator || "AND"} ${sql}`);
      }
    });
    return conditions.join(" ");
  }
  buildCondition(condition, params) {
    const field = this.sanitizeIdentifier(condition.field);
    switch (condition.operator) {
      case "IN":
      case "NOT IN":
        const placeholders = condition.value.map(() => "?").join(", ");
        params.push(...condition.value);
        return `${field} ${condition.operator} (${placeholders})`;
      case "BETWEEN":
        params.push(condition.value[0]);
        params.push(condition.value[1]);
        return `${field} BETWEEN ? AND ?`;
      case "IS NULL":
      case "IS NOT NULL":
        return `${field} ${condition.operator}`;
      default:
        params.push(condition.value);
        return `${field} ${condition.operator} ?`;
    }
  }
  buildHavingClause(having, params) {
    if (!(having !== null && having !== void 0 && having.length)) return "";
    const conditions = [];
    having.forEach((condition, index) => {
      const sql = this.buildCondition(condition, params);
      if (index === 0) {
        conditions.push(sql);
      } else {
        conditions.push(`${condition.logicalOperator || "AND"} ${sql}`);
      }
    });
    return conditions.join(" ");
  }
  buildOrderByClause(orderBy) {
    if (!orderBy) return "";
    const orders = Array.isArray(orderBy) ? orderBy : [orderBy];
    const parts = orders.map(order => `${this.sanitizeIdentifier(order.field)} ${order.direction || "ASC"}`);
    return `ORDER BY ${parts.join(", ")}`;
  }

  // private sanitizeIdentifier(name: string): string {
  //   const sanitized = name.replace(/[^a-zA-Z0-9_]/g, "");
  //   if (sanitized !== name) {
  //     throw new Error(`Invalid identifier: ${name}`);
  //   }
  //   return sanitized;
  // }

  sanitizeIdentifier(name) {
    if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name)) {
      throw new Error(`Invalid SQL identifier: ${name}`);
    }
    return name;
  }
  sanitizeColumn(column) {
    return column.split(".").map(part => this.sanitizeIdentifier(part)).join(".");
  }
}

/**
 * ============================================
 * FACTORY
 * ============================================
 */

export function createAdvancedQuery(db, enableLogging = false) {
  return new AdvancedQuery(db, enableLogging);
}
//# sourceMappingURL=advanced-queries.js.map