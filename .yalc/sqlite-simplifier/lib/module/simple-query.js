function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
export class QueryBuilder {
  constructor(db) {
    _defineProperty(this, "db", void 0);
    _defineProperty(this, "table", "");
    _defineProperty(this, "selectFields", ["*"]);
    _defineProperty(this, "joins", new Map());
    _defineProperty(this, "whereConditions", {});
    _defineProperty(this, "whereRawConditions", []);
    _defineProperty(this, "dateFilter", null);
    _defineProperty(this, "orderByField", "");
    _defineProperty(this, "orderByDirection", "ASC");
    _defineProperty(this, "limitCount", 0);
    _defineProperty(this, "offsetCount", 0);
    _defineProperty(this, "groupByFields", []);
    _defineProperty(this, "havingCondition", "");
    this.db = db;
  }

  // Main table selection
  from(table_name) {
    this.table = table_name;
    return this;
  }

  // Alias for from()
  // table(table_name: string): this {
  //   return this.from(table_name);
  // }

  // Select specific fields
  select(fields) {
    this.selectFields = fields;
    return this;
  }

  // Add a single field to select
  addField(field) {
    if (this.selectFields[0] === "*") {
      this.selectFields = [];
    }
    this.selectFields.push(field);
    return this;
  }

  // Join with another table
  join(config) {
    const key = config.as || config.from;
    this.joins.set(key, config);
    return this;
  }

  // Simple join with default settings
  with(relationName, tableName, foreignKey, fields) {
    this.joins.set(relationName, {
      from: tableName,
      on: foreignKey,
      fields: fields || ["*"],
      type: "left"
    });
    return this;
  }

  // Inner join
  innerJoin(table, on, fields) {
    return this.join({
      from: table,
      on,
      fields,
      type: "inner"
    });
  }

  // Left join
  leftJoin(table, on, fields) {
    return this.join({
      from: table,
      on,
      fields,
      type: "left"
    });
  }

  // WHERE conditions
  where(field, value) {
    this.whereConditions[field] = value;
    return this;
  }
  whereEqual(field, value) {
    return this.where(field, value);
  }
  whereNot(field, value) {
    this.whereRawConditions.push({
      field,
      operator: "!=",
      value
    });
    return this;
  }
  whereGreater(field, value) {
    this.whereRawConditions.push({
      field,
      operator: ">",
      value
    });
    return this;
  }
  whereLess(field, value) {
    this.whereRawConditions.push({
      field,
      operator: "<",
      value
    });
    return this;
  }
  whereGreaterOrEqual(field, value) {
    this.whereRawConditions.push({
      field,
      operator: ">=",
      value
    });
    return this;
  }
  whereLessOrEqual(field, value) {
    this.whereRawConditions.push({
      field,
      operator: "<=",
      value
    });
    return this;
  }
  whereLike(field, pattern) {
    this.whereRawConditions.push({
      field,
      operator: "LIKE",
      value: `%${pattern}%`
    });
    return this;
  }
  whereIn(field, values) {
    this.whereRawConditions.push({
      field,
      operator: "IN",
      value: values
    });
    return this;
  }

  // Date filters (generic)
  thisMonth(field = "created_at") {
    this.dateFilter = {
      field,
      type: "thisMonth"
    };
    return this;
  }
  thisWeek(field = "created_at") {
    this.dateFilter = {
      field,
      type: "thisWeek"
    };
    return this;
  }
  today(field = "created_at") {
    this.dateFilter = {
      field,
      type: "today"
    };
    return this;
  }
  thisYear(field = "created_at") {
    this.dateFilter = {
      field,
      type: "thisYear"
    };
    return this;
  }
  last7Days(field = "created_at") {
    this.dateFilter = {
      field,
      type: "last7Days"
    };
    return this;
  }
  lastMonth(field = "created_at") {
    this.dateFilter = {
      field,
      type: "lastMonth"
    };
    return this;
  }

  // Custom date range
  dateRange(field, startDate, endDate) {
    this.whereRawConditions.push({
      field,
      operator: ">=",
      value: startDate
    }, {
      field,
      operator: "<=",
      value: endDate
    });
    return this;
  }

  // Order by
  orderBy(field, direction = "ASC") {
    this.orderByField = field;
    this.orderByDirection = direction;
    return this;
  }

  // Limit and offset
  limit(count) {
    this.limitCount = count;
    return this;
  }
  offset(count) {
    this.offsetCount = count;
    return this;
  }

  // Pagination helper
  page(pageNumber, pageSize) {
    this.limitCount = pageSize;
    this.offsetCount = (pageNumber - 1) * pageSize;
    return this;
  }

  // Group by
  groupBy(...fields) {
    this.groupByFields = fields;
    return this;
  }
  having(condition) {
    this.havingCondition = condition;
    return this;
  }

  // Execute query
  async get() {
    const {
      sql,
      params
    } = this.buildSelectQuery();
    console.log(`[SQL] ${sql}`); // Debug
    console.log(`[Params]`, params);
    return await this.db.executeQuery(sql, params);
  }

  // Get first record
  async first() {
    const results = await this.limit(1).get();
    return results[0] || null;
  }

  // Count records
  async count() {
    var _result$;
    const originalSelect = this.selectFields;
    this.selectFields = ["COUNT(*) as total"];
    const result = await this.get();
    this.selectFields = originalSelect;
    return ((_result$ = result[0]) === null || _result$ === void 0 ? void 0 : _result$.total) || 0;
  }

  // Check if exists
  async exists() {
    const count = await this.count();
    return count > 0;
  }

  // Build the SELECT query
  buildSelectQuery() {
    const params = [];
    let sql = `SELECT `;

    // Build SELECT clause
    const selectParts = [];
    if (this.selectFields.includes("*")) {
      selectParts.push(`${this.table}.*`);
    } else {
      selectParts.push(...this.selectFields.map(f => f.includes(".") || f.includes("(") ? f : `${this.table}.${f}`));
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
      let onClause;
      if (typeof join.on === "string") {
        onClause = `${this.table}.${join.on} = ${join.from}.id`;
      } else {
        onClause = `${this.table}.${join.on.local} = ${join.from}.${join.on.foreign}`;
      }
      sql += ` ${joinType.toUpperCase()} JOIN ${join.from} ON ${onClause}`;
    }

    // Build WHERE clause
    const whereParts = [];

    // Simple where conditions
    for (const [field, value] of Object.entries(this.whereConditions)) {
      whereParts.push(`${field} = ?`);
      params.push(value);
    }

    // Raw where conditions
    for (const condition of this.whereRawConditions) {
      if (condition.operator === "IN") {
        const placeholders = condition.value.map(() => "?").join(", ");
        whereParts.push(`${condition.field} IN (${placeholders})`);
        params.push(...condition.value);
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
    return {
      sql,
      params
    };
  }
  buildDateCondition(dateFilter, params) {
    switch (dateFilter.type) {
      case "today":
        params.push("now", "now", "+1 day");
        return `${dateFilter.field} >= date(?) AND ${dateFilter.field} < date(?, ?)`;
      case "thisWeek":
        return `${dateFilter.field} >= date('now','weekday 0','-7 days') AND ${dateFilter.field} < date('now','weekday 0')`;
      case "thisMonth":
        params.push("now", "start of month", "now", "start of month", "+1 month");
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
  constructor(db) {
    _defineProperty(this, "db", void 0);
    this.db = db;
  }
  from(table) {
    return new QueryBuilder(this.db).from(table);
  }
  table(table) {
    return this.from(table);
  }
}

// Helper function
export function createSimpleDB(db) {
  return new SimpleDB(db);
}
//# sourceMappingURL=simple-query.js.map