import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  fetchTasksApi,
  deleteTaskApi,
  updateTaskApi,
  createTaskApi,
} from '../services';

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async ({page, perPage}: any) => {
    try {
      const response = await fetchTasksApi({page, perPage});
      return response;
    } catch (error) {
      throw error;
    }
  },
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async taskData => {
    try {
      const response = createTaskApi(taskData);
      return response;
    } catch (error) {
      throw error;
    }
  },
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({taskId, updatedTaskData}: any) => {
    try {
      const response = updateTaskApi({taskId, updatedTaskData});
      return response;
    } catch (error) {
      throw error;
    }
  },
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId: string) => {
    try {
      const response = await deleteTaskApi(taskId);
      return response;
    } catch (error) {
      throw error;
    }
  },
);

// Redux slice for tasks
const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {entities: [], status: 'idle', error: null, pagination: {}},
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.entities = [...state.entities, ...action.payload.response];
        state.pagination = {
          page_no: action.payload.page_no,
          total_count: action.payload.total_count,
          total_pages: action.payload.total_pages,
        };
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.entities.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.entities.findIndex(
          task => task.id === action.payload.id,
        );
        if (index !== -1) {
          state.entities[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.entities = state.entities.filter(
          task => task._id !== action.meta.arg,
        );
      });
  },
});

export const taskReducer = tasksSlice.reducer;
export default tasksSlice;
