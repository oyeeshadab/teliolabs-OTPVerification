function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
export class QueryBuilder {
  constructor(table, advancedQuery, relations = {}) {
    _defineProperty(this, "table", void 0);
    _defineProperty(this, "advancedQuery", void 0);
    _defineProperty(this, "options", {});
    _defineProperty(this, "relations", {});
    this.table = table;
    this.advancedQuery = advancedQuery;
    this.relations = relations;
  }

  /*
   * ============================================
   * SELECT
   * ============================================
   */

  select(fields) {
    this.options.select = fields;
    return this;
  }

  /*
   * ============================================
   * WHERE
   * ============================================
   */

  where(where) {
    this.options.where = where;
    return this;
  }

  /*
   * ============================================
   * INCLUDE
   * ============================================
   */

  include(relations) {
    this.options.include = relations;
    return this;
  }

  /*
   * ============================================
   * ORDER BY
   * ============================================
   */

  orderBy(field, direction = "ASC") {
    this.options.orderBy = {
      field,
      direction
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
      direction: "DESC"
    };
    return this;
  }

  /*
   * ============================================
   * LIMIT
   * ============================================
   */

  limit(limit) {
    this.options.limit = limit;
    return this;
  }

  /*
   * ============================================
   * WITH COUNT
   * ============================================
   */

  withCount(relationName) {
    const relation = this.relations[relationName];
    if (!relation) {
      throw new Error(`Relation '${relationName}' not found`);
    }

    /*
     * Include relation
     */

    this.options.include = {
      ...(this.options.include || {}),
      [relationName]: true
    };

    /*
     * Select all current table fields
     */

    this.options.select = {
      ...(this.options.select || {}),
      "*": "*",
      [`${relationName}Count`]: `COUNT(${relation.table}.id)`
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

  async get() {
    return this.advancedQuery.find(this.table, this.options);
  }

  /*
   * ============================================
   * FIRST
   * ============================================
   */

  async first() {
    return this.advancedQuery.findFirst(this.table, this.options);
  }
}
//# sourceMappingURL=QueryBuilder.js.map