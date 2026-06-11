export async function deleteRecords(db, table, where) {
  return db.delete({
    table,
    where
  });
}
export async function deleteById(db, table, id, idField = "id") {
  return db.delete({
    table,
    where: {
      field: idField,
      operator: "=",
      value: id
    }
  });
}
export async function deleteAll(db, table) {
  return db.delete({
    table
  });
}
//# sourceMappingURL=delete.js.map