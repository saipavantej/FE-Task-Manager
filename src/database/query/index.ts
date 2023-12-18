import SQLite from 'react-native-sqlite-storage';
SQLite.enablePromise(true);
// Open a database (or create it if it doesn't exist)
type Download = {
  task_id: number;
  user_id: string;
  task_title: string;
  task_Description: string;
  task_due_date: string;
  task_status: string;
};

type addTasksParam = {
  user_id: string;
  task_id: string;
  task_title: string;
  task_Description: string;
  task_due_date: string;
  task_status: string;
  successCallback: () => void;
  errorCallback: (error: any) => void;
};

type addUserParam = {
  user_id: string;
  user_name: string;
  user_picture: string;
  successCallback: (e: string) => void;
  errorCallback: (error: any) => void;
};

type fetchTasksForUserParams = {
  userId: string;
  perPage: number;
  page: number;
};

const addUser = async ({
  user_id,
  user_name,
  user_picture,
  successCallback,
  errorCallback,
}: addUserParam): Promise<void> => {
  const db = await SQLite.openDatabase({
    name: 'Task_Manager.db',
    location: 'default',
  });

  db.transaction(tx => {
    tx.executeSql(
      'SELECT user_id FROM users WHERE user_id = ?',
      [user_id],
      (_, result) => {
        if (result.rows.length === 0) {
          // User with user_id doesn't exist, so insert the new record
          db.transaction(tx => {
            tx.executeSql(
              'INSERT INTO users (user_id, user_name, user_picture) VALUES (?, ?, ?);',
              [user_id, user_name, user_picture],
              () => {
                successCallback(`${user_id} user added succesfully`);
              },
              error => {
                errorCallback(error);
              },
            );
          });
        } else {
          // User with user_id already exists
          successCallback(`${user_id} user already exist`); // You can choose to handle this case differently
        }
      },
      error => {
        errorCallback(error);
      },
    );
  });
};

const addTask = async ({
  user_id,
  task_id,
  task_title,
  task_Description,
  task_due_date,
  task_status,
  successCallback,
  errorCallback,
}: addTasksParam): Promise<void> => {
  const db = await SQLite.openDatabase({
    name: 'Task_Manager.db',
    location: 'default',
  });
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO tasks (user_id, task_id, task_title, task_Description, task_due_date, task_status) VALUES (?, ?, ?, ?, ?, ?, );',
      [
        user_id,
        task_id,
        task_title,
        task_Description,
        task_due_date,
        task_status,
      ],
      () => {
        successCallback();
      },
      error => {
        errorCallback(error);
      },
    );
  });
};

const fetchTasksForUser = async ({
  userId,
  perPage,
  page,
}: fetchTasksForUserParams): Promise<{
  page_no: number;
  total_count: number;
  total_pages: number;
  data: Download[];
}> => {
  const db = await SQLite.openDatabase({
    name: 'Task_Manager.db',
    location: 'default',
  });

  try {
    const countResult = await db.executeSql(
      'SELECT COUNT(*) AS total FROM tasks WHERE user_id = ?',
      [userId],
    );

    const total_count = countResult[0].rows.item(0).total;
    const total_pages = Math.ceil(total_count / perPage);
    const offset = (page - 1) * perPage;

    const [results] = await db.executeSql(
      'SELECT * FROM tasks WHERE user_id = ? LIMIT ? OFFSET ?',
      [userId, perPage, offset],
    );

    const downloads: Download[] = [];

    for (let i = 0; i < results.rows.length; i++) {
      const download = results.rows.item(i);
      downloads.push(download as Download);
    }
    return {
      page_no: page,
      total_count,
      total_pages,
      data: downloads,
    };
  } catch (error) {
    return {
      page_no: 1,
      total_count: 0,
      total_pages: 0,
      data: [],
    };
  }
};

const fetchTasksById = async (task_id: number): Promise<any> => {
  const db = await SQLite.openDatabase({
    name: 'Tasks_manager.db',
    location: 'default',
  });

  try {
    const [results] = await db.executeSql(
      'SELECT * FROM tasks WHERE task_id = ?',
      [task_id],
    );
    if (results.rows.length > 0) {
      return results.rows.item(0);
    } else {
      return {};
    }
  } catch (error) {
    throw error;
  }
};

const removeTaskById = async (task_id: number): Promise<void> => {
  const db = await SQLite.openDatabase({
    name: 'Task_Manager.db',
    location: 'default',
  });
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM tasks WHERE task_id = ?;',
      [task_id],
      () => {
        console.log(`download_id: ${task_id} removed succesfully`);
      },
      error => {
        console.log(error);
        throw error;
      },
    );
  });
};

const deleteUserByUserId = async (
  user_id: string,
  successCallback: () => void,
  errorCallback: (error: any) => void,
): Promise<void> => {
  const db = await SQLite.openDatabase({
    name: 'Task_Manager.db',
    location: 'default',
  });
  db.executeSql('PRAGMA foreign_keys = ON');
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM users WHERE user_id = ?;',
      [user_id],
      () => {
        successCallback();
      },
      error => {
        errorCallback(error);
      },
    );
  });
};

export {
  addTask,
  addUser,
  fetchTasksForUser,
  fetchTasksById,
  removeTaskById,
  deleteUserByUserId,
};
