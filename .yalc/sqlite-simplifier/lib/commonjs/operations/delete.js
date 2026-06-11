"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteAll = deleteAll;
exports.deleteById = deleteById;
exports.deleteRecords = deleteRecords;
async function deleteRecords(db, table, where) {
  return db.delete({
    table,
    where
  });
}
async function deleteById(db, table, id, idField = "id") {
  return db.delete({
    table,
    where: {
      field: idField,
      operator: "=",
      value: id
    }
  });
}
async function deleteAll(db, table) {
  return db.delete({
    table
  });
}
//# sourceMappingURL=delete.js.map