import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type list = {
  id: number;
  name: string;
  position: number;
  table_id: number;
};

class ItemRepository {
  async create(item: Omit<list, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into list (name, position, table_id) values (?, ?, ?)",
      [item.name, item.position, item.table_id],
    );

    return result.insertId;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from item where id = ?",
      [id],
    );
    return rows[0] as list;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from item");

    return rows as list[];
  }
}

export default new ItemRepository();
