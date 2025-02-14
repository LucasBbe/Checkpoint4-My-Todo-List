import type { ResultSetHeader } from "mysql2";
import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Item = {
  id: number;
  title: string;
  user_id: number;
};
class CardRepository {
  async getCardsByListId(listId: number) {
    const [rows] = await databaseClient.query<Rows[]>(
      "SELECT * FROM `card` WHERE list_id = ? ORDER BY position",
      [listId],
    );
    return rows;
  }

  async createCard(title: string, position: number, listId: number) {
    const [result] = await databaseClient.query<ResultSetHeader>(
      "INSERT INTO `card` (title, position) VALUES (?, ?, ?)",
      [title, position, listId],
    );
    return result;
  }

  async updateCard(id: number, title: string) {
    const [result] = await databaseClient.query(
      "UPDATE `card` SET title = ? WHERE id = ?",
      [title, id],
    );
    return result;
  }

  async deleteCard(id: number) {
    const [result] = await databaseClient.query(
      "DELETE FROM `card` WHERE id = ?",
      [id],
    );
    return result;
  }
}
export default new CardRepository();
