export async function select(db, table, where) {
  return db.select({
    table,
    where
  });
}
export async function selectAll(db, table) {
  return db.select({
    table
  });
}
export async function selectById(db, table, id, idField = "id") {
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
export async function selectWithFields(db, table, fields, where) {
  return db.select({
    table,
    fields,
    where
  });
}
export async function selectFirst(db, table, where) {
  const results = await db.select({
    table,
    where,
    limit: 1
  });
  return results[0] || null;
}
//# sourceMappingURL=select.js.map