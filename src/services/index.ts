import {appService} from '@config/network';

const loginApi = async (body: any) => {
  return appService
    .post('user/login', body)
    .then(function (response: any) {
      return response.data;
    })
    .catch(function (error) {
      throw error;
    });
};

const signUpApi = async (body: any) => {
  return appService
    .post('user/signup', body)
    .then(function (response: any) {
      return response.data;
    })
    .catch(function (error) {
      throw error;
    });
};

const forgetPasswordApi = async (body: any) => {
  return appService
    .post('user/forgetPassword', body)
    .then(function (response: any) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      throw error;
    });
};

const resetPasswordApi = async (body: any) => {
  return appService
    .post('user/resetPassword', body)
    .then(function (response: any) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      throw error;
    });
};

const editPasswordApi = async (body: any) => {
  return appService
    .put('user/editProfile', body)
    .then(function (response: any) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      throw error;
    });
};

const fetchTasksApi = async ({page, perPage}: any) => {
  return appService
    .get(`task/getTasks?page=${page}&per_page=${perPage}`)
    .then(function (response: any) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      throw error;
    });
};

const createTaskApi = async (taskData: any) => {
  return appService
    .post('task/createTask', taskData)
    .then(function (response: any) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      throw error;
    });
};

const deleteTaskApi = async (taskId: any) => {
  return appService
    .delete(`task/deleteTask/${taskId}`)
    .then(function (response: any) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      throw error;
    });
};
const updateTaskApi = async (taskId: any) => {
  return appService
    .patch(`task/updateTask/${taskId}`)
    .then(function (response: any) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      throw error;
    });
};

export {
  signUpApi,
  loginApi,
  forgetPasswordApi,
  resetPasswordApi,
  editPasswordApi,
  fetchTasksApi,
  createTaskApi,
  deleteTaskApi,
  updateTaskApi,
};
