import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {
  addTask,
  deleteTask,
  fetchTaskDetails,
  fetchTasksForUser,
  updateTaskDetails,
} from '../database/query';
import {showErrorToast} from '@components/Toast/action';

export type Task = {
  task_id: number;
  user_id: string;
  task_title: string;
  task_Description: string;
  task_due_date: string;
  task_status: string;
};

type TasksState = {
  tasks: Task[];
  taskData: {
    task_title: string;
    task_Description: string;
    task_due_date: string;
    task_status: string;
  };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  page_no: number;
  total_count: number;
  total_pages: number;
};

type ApiFetchResponse = {
  page_no: number;
  total_count: number;
  total_pages: number;
  data: Task[];
};

export type ApiCreateResponse = {
  success: boolean;
  message: string;
  data: Task;
};

type FetchTasksParams = {
  userId: string;
  perPage: number;
  page: number;
};

export const fetchTasksAsync = createAsyncThunk(
  'tasks/fetchTasks',
  async ({userId, perPage, page}: FetchTasksParams) => {
    const response: ApiFetchResponse = await fetchTasksForUser({
      userId,
      perPage,
      page,
    });
    return response;
  },
);

export const createTaskAsync = createAsyncThunk(
  'tasks/createTask',
  async (newTask: Omit<Task, 'task_id'>) => {
    const response = await addTask({
      user_id: newTask.user_id,
      task_title: newTask.task_title,
      task_Description: newTask.task_Description,
      task_due_date: newTask.task_due_date,
      task_status: newTask.task_status,
    });
    console.log(response);
    return response;
  },
);

export const fetchTaskDetailsAsync = createAsyncThunk(
  'tasks/fetchTaskDetails',
  async (TaskIdOnly: Pick<Task, 'task_id'>) => {
    const response: any = await fetchTaskDetails(TaskIdOnly.task_id);
    console.log(response);
    return response;
  },
);

export const updateTaskDetailsAsync = createAsyncThunk(
  'tasks/updateTaskDetails',
  async ({
    taskId,
    updatedTask,
  }: {
    taskId: number;
    updatedTask: Partial<Task>;
  }) => {
    try {
      await updateTaskDetails(taskId, updatedTask);
      console.log(taskId, updatedTask);
      return {taskId, updatedTask};
    } catch (error) {
      throw error;
    }
  },
);

export const deleteTaskAsync = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId: number) => {
    await deleteTask(taskId);
    return {taskId};
  },
);

const initialState: TasksState = {
  tasks: [],
  taskData: {
    task_title: '',
    task_Description: '',
    task_due_date: '',
    task_status: '',
  },
  status: 'idle',
  error: null,
  page_no: 1,
  total_count: 0,
  total_pages: 0,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // Add other synchronous actions if needed
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTasksAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        fetchTasksAsync.fulfilled,
        (state, action: PayloadAction<ApiFetchResponse>) => {
          state.status = 'succeeded';
          state.tasks = state.tasks.concat(action.payload.data);
          state.page_no = action.payload.page_no;
          state.total_count = action.payload.total_count;
          state.total_pages = action.payload.total_pages;
        },
      )
      .addCase(fetchTasksAsync.rejected, (_state, action) => {
        showErrorToast(action.error.message ?? '');
      })
      .addCase(createTaskAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        createTaskAsync.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = 'succeeded';
          state.tasks = [
            ...state.tasks,
            {
              task_id: action.payload.data.task_id,
              user_id: action.payload.data.user_id,
              task_title: action.payload.data.task_title,
              task_Description: action.payload.data.task_Description,
              task_due_date: action.payload.data.task_due_date,
              task_status: action.payload.data.task_status,
            },
          ];
        },
      )
      .addCase(createTaskAsync.rejected, (_state, action) => {
        showErrorToast(action.error.message ?? 'Failed to create task');
      })
      .addCase(
        deleteTaskAsync.fulfilled,
        (state, action: PayloadAction<{taskId: number}>) => {
          state.status = 'succeeded';
          state.tasks = state.tasks.filter(
            task => task.task_id !== action.payload.taskId,
          );
        },
      )
      .addCase(
        fetchTaskDetailsAsync.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = 'succeeded';
          state.tasks = state.tasks.filter(
            task => task.task_id !== action.payload.taskId,
          );
        },
      )
      .addCase(fetchTaskDetailsAsync.rejected, (_state, action) => {
        showErrorToast(action.error.message ?? 'Failed to fetch task details');
      })
      .addCase(
        updateTaskDetailsAsync.fulfilled,
        (
          state,
          action: PayloadAction<{taskId: number; updatedTask: Partial<Task>}>,
        ) => {
          state.status = 'succeeded';
          const {taskId, updatedTask} = action.payload;
          const taskIndex = state.tasks.findIndex(
            task => task.task_id === taskId,
          );
          if (taskIndex !== -1) {
            state.tasks[taskIndex] = {
              ...state.tasks[taskIndex],
              ...updatedTask,
            };
          }
          console.log('success');
        },
      )
      .addCase(updateTaskDetailsAsync.rejected, (state, action) => {
        showErrorToast(action.error.message ?? 'Update failed');
      });
  },
});

export const taskReducer = taskSlice.reducer;
export default taskSlice;
