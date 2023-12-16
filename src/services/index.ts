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

const signUpApi = async (params: any) => {
  const {body} = params;
  return appService
    .post('user/signup', body)
    .then(function (response: any) {
      return response.data;
    })
    .catch(function (error) {
      throw error;
    });
};

const forgetPasswordApi = async (params: any) => {
  const {body} = params;
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

const resetPasswordApi = async (params: any) => {
  const {body} = params;
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
export {signUpApi, loginApi, forgetPasswordApi, resetPasswordApi};
