import SQLite from 'react-native-sqlite-storage';
SQLite.enablePromise(true);

const createUserTable = async () => {
  const db = await SQLite.openDatabase({
    name: 'Task_Manager.db',
    location: 'default',
  });

  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
        user_id TEXT NOT NULL PRIMARY KEY,
        user_name TEXT,
        user_picture TEXT,
        email_id TEXT
      );`,
      [],
      () => {
        console.log('Users table created successfully');
      },
      error => {
        console.error('Error creating users table:', error);
      },
    );
  });
};

const createTasksTable = async () => {
  const db = await SQLite.openDatabase({
    name: 'Task_Manager.db',
    location: 'default',
  });
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS tasks (
        user_id TEXT,
        task_id INTEGER PRIMARY KEY AUTOINCREMENT,
        task_title TEXT NOT NULL,
        task_Description TEXT NOT NULL,
        task_due_date TEXT NOT NULL,
        task_status TEXT,
        FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
      );`,
      [],
      () => {
        console.log('tasks table created successfully');
      },
      error => {
        console.error('Error creating tasks table:', error);
      },
    );
  });
};

export {createUserTable, createTasksTable};
