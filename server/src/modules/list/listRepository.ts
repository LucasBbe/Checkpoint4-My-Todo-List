import databaseClient from "../../../database/client";

import type { ResultSetHeader } from "mysql2";
import type { Result, Rows } from "../../../database/client";
type list = {
  id: number;
  name: string;
  position: number;
  table_id: number;
};

class ListRepository {
  async getListsByTableId(tableId: number) {
    const [rows] = await databaseClient.query<Rows[]>(
      "SELECT * FROM `list` WHERE table_id = ? ORDER BY position",
      [tableId],
    );
    return rows;
  }

  async createList(name: string, position: number, tableId: number) {
    const [result] = await databaseClient.query<ResultSetHeader>(
      "INSERT INTO `list` (name, position, table_id) VALUES (?, ?, ?)",
      [name, position, tableId],
    );
    return result;
  }

  async updateList(id: number, name: string) {
    const [result] = await databaseClient.query(
      "UPDATE `list` SET name = ? WHERE id = ?",
      [name, id],
    );
    return result;
  }

  async deleteList(id: number) {
    const [result] = await databaseClient.query(
      "DELETE FROM `list` WHERE id = ?",
      [id],
    );
    return result;
  }
}

export default new ListRepository();
