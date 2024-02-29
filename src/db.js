const getNum = async (db, id) => {
  const stmt = db.prepare('SELECT num FROM view WHERE id = ?').bind(id);
  const num = await stmt.first('num');
  return num || 0;
};

const setNum = async (db, id, num) => {
  const stmt = db
    .prepare('INSERT INTO view (id, num) VALUES (?1, ?2) ON CONFLICT (id) DO UPDATE SET num = ?2')
    .bind(id, num);
  await stmt.run();
};

export { getNum, setNum };
