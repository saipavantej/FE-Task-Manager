import SQLite from 'react-native-sqlite-storage';
import {ApiCreateResponse, Task} from '../../features/tasksSlice';
SQLite.enablePromise(true);
// Open a database (or create it if it doesn't exist)
type task = {
  task_id: number;
  user_id: string;
  task_title: string;
  task_Description: string;
  task_due_date: string;
  task_status: string;
};

type addUserParam = {
  user_id: string;
  user_name: string;
  user_picture: string;
  email_id: string;
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
  email_id,
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
          db.transaction(tx => {
            tx.executeSql(
              'INSERT INTO users (user_id, user_name, user_picture, email_id ) VALUES (?, ?, ?, ?);',
              [user_id, user_name, user_picture, email_id],
              () => {
                successCallback(
                  `${user_id} user added to local storage succesfully`,
                );
              },
              error => {
                errorCallback(error);
              },
            );
          });
        } else {
          // User with user_id already exists
          successCallback(`${user_id} user already exist in local storage`);
        }
      },
      error => {
        errorCallback(error);
      },
    );
  });
};

const addTask = async (
  newTask: Omit<Task, 'task_id'>,
): Promise<ApiCreateResponse> => {
  const db = await SQLite.openDatabase({
    name: 'Task_Manager.db',
    location: 'default',
  });

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO tasks (user_id, task_title, task_Description, task_due_date, task_status) VALUES (?, ?, ?, ?, ?);',
        [
          newTask.user_id,
          newTask.task_title,
          newTask.task_Description,
          newTask.task_due_date,
          newTask.task_status,
        ],
        (_, result) => {
          // Assuming task_id is auto-incremented and generated by the database
          const insertedTask: Task = {
            task_id: result.insertId,
            ...newTask,
          };
          resolve({
            success: true,
            message: 'Task created successfully',
            data: insertedTask,
          });
        },
        error => {
          reject({
            success: false,
            message: error,
            data: null,
          });
        },
      );
    });
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
  data: task[];
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

    const downloads: task[] = [];

    for (let i = 0; i < results.rows.length; i++) {
      const download = results.rows.item(i);
      downloads.push(download as task);
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

const fetchTaskDetails = (task_id: number): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    const db = await SQLite.openDatabase({
      name: 'Task_Manager.db',
      location: 'default',
    });
    console.log(task_id);
    db.transaction(
      tx => {
        tx.executeSql(
          'SELECT * FROM tasks WHERE task_id = ?',
          [task_id],
          (_, result) => {
            if (result.rows.length > 0) {
              const taskDetails = result.rows.item(0);
              resolve(taskDetails);
            } else {
              reject('no data found');
            }
          },
          error => {
            reject(error);
          },
        );
      },
      error => {
        reject(error.message);
      },
    );
  });
};

const updateTaskDetails = async (
  taskId: number,
  updatedTask: Partial<Omit<Task, 'task_id'>>,
): Promise<void> => {
  const db = await SQLite.openDatabase({
    name: 'Task_Manager.db',
    location: 'default',
  });

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE tasks SET task_title = ?, task_Description = ?, task_due_date = ?, task_status = ? WHERE task_id = ?;',
        [
          updatedTask.task_title,
          updatedTask.task_Description,
          updatedTask.task_due_date,
          updatedTask.task_status,
          taskId,
        ],
        (_, result) => {
          if (result.rowsAffected > 0) {
            resolve();
          } else {
            reject('Task not found');
          }
        },
        error => {
          reject(error);
        },
      );
    });
  });
};

const deleteTask = (task_id: number): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    const db = await SQLite.openDatabase({
      name: 'Task_Manager.db',
      location: 'default',
    });

    db.transaction(
      tx => {
        tx.executeSql(
          'DELETE FROM tasks WHERE task_id = ?;',
          [task_id],
          (_, _result) => {
            resolve();
          },
          error => {
            reject(error);
          },
        );
      },
      error => {
        reject(error.message);
      },
    );
  });
};

export {
  addTask,
  addUser,
  fetchTasksForUser,
  fetchTaskDetails,
  deleteTask,
  updateTaskDetails,
};
