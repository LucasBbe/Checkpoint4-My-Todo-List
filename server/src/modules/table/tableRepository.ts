import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Table = {
  id: number;
  name: string;
  user_id?: number | null;
};

class TableRepository {
  async create(table: Omit<Table, "id">) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO `table` (name, user_id) VALUES (?, ?);",
      [table.name, table.user_id],
    );

    return result;
  }

  async update(id: number, name: string) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE `table` SET name = ? WHERE id = ?",
      [name, id],
    );
    return result;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from `table` where id = ?",
      [id],
    );

    return result.affectedRows;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from `table` where id = ?",
      [id],
    );

    return rows[0] as Table;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from `table`");

    return rows as Table[];
  }
}

export default new TableRepository();
