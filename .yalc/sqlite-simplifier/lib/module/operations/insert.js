export async function insert(db, table, data) {
  return db.insert({
    table,
    data
  });
}
export async function insertMany(db, table, dataArray) {
  const results = [];
  for (const data of dataArray) {
    const id = await db.insert({
      table,
      data
    });
    results.push(id);
  }
  return results;
}
//# sourceMappingURL=insert.js.map