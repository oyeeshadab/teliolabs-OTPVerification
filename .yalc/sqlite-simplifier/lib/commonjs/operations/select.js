"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.select = select;
exports.selectAll = selectAll;
exports.selectById = selectById;
exports.selectFirst = selectFirst;
exports.selectWithFields = selectWithFields;
async function select(db, table, where) {
  return db.select({
    table,
    where
  });
}
async function selectAll(db, table) {
  return db.select({
    table
  });
}
async function selectById(db, table, id, idField = "id") {
  const results = await db.select({
    table,
    where: {
      field: idField,
      operator: "=",
      value: id
    },
    limit: 1
  });
  return results[0] || null;
}
async function selectWithFields(db, table, fields, where) {
  return db.select({
    table,
    fields,
    where
  });
}
async function selectFirst(db, table, where) {
  const results = await db.select({
    table,
    where,
    limit: 1
  });
  return results[0] || null;
}
//# sourceMappingURL=select.js.map