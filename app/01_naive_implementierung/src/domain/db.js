const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
const fs = require("fs");
const path = require("path");

const { projectFromRow, taskFromRow, taskStateToDb } = require("./mapping");

function initDatabase(db) {
  return db
    .get("SELECT name FROM sqlite_master WHERE type='table' AND name='tasks';")
    .then((tableExists) => {
      if (tableExists) {
        return db;
      }
      console.log("CREATING DATABASE");
      const content = fs.readFileSync(
        path.resolve(__dirname, "./init-sqlite.sql"),
        "utf8"
      );

      return db.exec(content).then((_) => {
        console.log("DB CREATED");
        return db;
      });
    });
}

function getDbFilename() {
  const filename = path.resolve("./db.sqlite");
  console.log(`Using SQLite file '${filename}'`);
  return filename;
}

function enableTracing(db) {
  db.on("trace", (query) => console.log(`Executed Query: ${query}`));
  return db;
}

class Database {
  constructor() {
    this.db = sqlite
      .open({
        filename: getDbFilename(),
        driver: sqlite3.Database,
        verbose: true,
      })
      .then(initDatabase)
      .then(enableTracing);
  }

  async getAllProjects() {
    const db = await this.db;
    const rows = await db.all("SELECT * FROM projects ORDER BY id");
    return rows.map(projectFromRow);
  }

  async getProjectById(projectId) {
    const db = await this.db;
    const row = await db.get("SELECT * FROM projects WHERE id = ?", [
      projectId,
    ]);

    if (!row) {
      return;
    }

    return projectFromRow(row);
  }

  async getCategoryById(categoryId) {
    const db = await this.db;
    const row = await db.get("SELECT * FROM categories WHERE id = ?", [
      categoryId,
    ]);

    return row;
  }

  async getTaskById(taskId) {
    const db = await this.db;
    const row = await db.get("SELECT * FROM tasks WHERE id = $1", [taskId]);

    if (!row) {
      return;
    }

    return taskFromRow(row);
  }

  async getTasks(projectId) {
    const db = await this.db;
    const rows = await db.all("SELECT * FROM tasks WHERE project_id = ?", [
      projectId,
    ]);

    return rows.map((r) => taskFromRow(r, ""));
  }

  async addTaskToProject(projectId, input) {
    try {
      const db = await this.db;
      await db.run(
        "INSERT INTO tasks (state, project_id, description, title, finish_date, assignee_id) VALUES (0, ?, ?, ?, ?, ?)",
        [
          projectId,
          input.description,
          input.title,
          input.toBeFinishedAt,
          input.assigneeId,
        ]
      );

      const { newTaskId } = await this.database.get(
        "SELECT last_insert_rowid() AS newTaskId"
      );
      return this.getTaskById(newTaskId);
    } catch (e) {
      console.error("UPDATE FAILED: " + e, e);
    }
  }

  async updateTaskState(taskId, newState) {
    const db = await this.db;
    await db.run("UPDATE tasks SET state = $1 WHERE id = ?", [
      taskStateToDb(newState),
      taskId,
    ]);

    return this.getTaskById(taskId);
  }
}

module.exports = new Database();
