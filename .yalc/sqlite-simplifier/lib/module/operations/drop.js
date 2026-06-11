export async function dropTable(db, table, ifExists = true) {
  return db.drop({
    table,
    ifExists
  });
}
//# sourceMappingURL=drop.js.map