"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dropTable = dropTable;
async function dropTable(db, table, ifExists = true) {
  return db.drop({
    table,
    ifExists
  });
}
//# sourceMappingURL=drop.js.map