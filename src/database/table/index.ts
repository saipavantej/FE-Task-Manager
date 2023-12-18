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
      `CREATE TABLE IF NOT EXISTS downloads (
        task_id INTEGER NOT NULL PRIMARY KEY,
        user_id TEXT NOT NULL,
        task_title TEXT NOT NULL,
        task_Description TEXT NOT NULL,
        task_due_date TEXT NOT NULL,
        english_subtitle_url TEXT,
        task_status TEXT,
        FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
      );`,
      [],
      () => {
        console.log('Downloads table created successfully');
      },
      error => {
        console.error('Error creating downloads table:', error);
      },
    );
  });
};

export {createUserTable, createTasksTable};
