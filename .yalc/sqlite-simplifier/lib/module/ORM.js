function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { AdvancedQuery } from "./advanced-queries";
import { QueryBuilder } from "./QueryBuilder";
export class ORM {
  constructor(db) {
    _defineProperty(this, "advancedQuery", void 0);
    _defineProperty(this, "relations", {});
    this.advancedQuery = new AdvancedQuery(db);
  }

  /*
   * ============================================
   * DEFINE RELATIONS
   * ============================================
   */

  defineRelations(table, relations) {
    this.relations[table] = relations;
    this.advancedQuery.defineRelations(table, relations);
  }

  /*
   * ============================================
   * TABLE
   * ============================================
   */

  table(table) {
    return new QueryBuilder(table, this.advancedQuery, this.relations[table] || {});
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
//# sourceMappingURL=ORM.js.map