export async function update(db, table, data, where) {
  return db.update({
    table,
    data,
    where
  });
}
export async function updateById(db, table, id, data, idField = "id") {
  return db.update({
    table,
    data,
    where: {
      field: idField,
      operator: "=",
      value: id
    }
  });
}
//# sourceMappingURL=update.js.map