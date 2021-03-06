import {
  ILoginResponse,
  TReqLogin,
} from "../../interfaces/admin.interface/admin.http.interfaces";
import axiosService from "../httpService/axios.service";

class AdminRequestService {
  constructor() {}

  loginMethod(data: TReqLogin) {
    const uri = "admin/system/login";
    return axiosService.postMethod<TReqLogin, ILoginResponse>(uri, data);
  }

  logoutMethod() {
    const uri = "admin/logout";
    return axiosService.getMethod(uri);
  }

  //Get all user
  //{{url}}/api/admin/view/accounts
  getAllUser() {
    const uri = "admin/view/accounts";
    return axiosService.getMethod(uri);
  }

  //Get Info user
  //{{url}}/api/admin/phong/view/account
  getUserInfo(username: string) {
    const uri = `admin/${username}/view/account`;
    return axiosService.getMethod(uri);
  }

  //Create account
  //{{url}}/api/admin/signup
  createAccount(data) {
    const uri = "admin/signup";
    return axiosService.postMethod(uri, data);
  }

  //Update account
  //{{url}}/api/admin/account/update
  updateAccount(data) {
    const uri = "admin/account/update";
    return axiosService.putMethod(uri, data);
  }

  //{{url}}/api/admin/phong/disable/account
  disableAccount(username) {
    const uri = `admin/${username}/disable/account`;
    return axiosService.putMethod(uri, null);
  }

  //{{url}}/api/admin/dong/enable/account
  enableAccount(username) {
    const uri = `admin/${username}/enable/account`;
    return axiosService.putMethod(uri, null);
  }

  //View all teacher
  //{{url}}/api/admin/teacher/views
  getAllTeacher() {
    const uri = "admin/teacher/views";
    return axiosService.getMethod(uri);
  }

  //{{url}}/api/admin/teacher/4/view-detail
  getDetailTeacher(id) {
    console.log(id)
    const uri = `admin/teacher/${id}/view-detail`;
    return axiosService.getMethod(uri);
  }

  //{{url}}/api/admin/teacher/create
  createTeacher(data) {
    const uri = "admin/teacher/create";
    return axiosService.postMethod(uri, data);
  }

  //{{url}}/api/admin/teacher/10/update
  updateTeacher(id, data) {
    const uri = `admin/teacher/${id}/update`;
    return axiosService.putMethod(uri, data);
  }

  /*** Course API */

  //Get all course Active
  //{{url}}/api/admin/course/view/active
  getAllCourseActive() {
    const uri = `admin/course/view`;
    return axiosService.getMethod(uri);
  }

  //Get All course in-active
  //{{url}}/api/admin/course/view/in-active
  getAllCourseInactive() {
    const uri = `admin/course/view/in-active`;
    return axiosService.getMethod(uri);
  }

  //Active course
  //{{url}}/api/admin/course/2/active
  updateActiveCourse(id) {
    const uri = `admin/course/${id}/active`;
    return axiosService.putMethod(uri, null);
  }

  //Deactive course
  //{{url}}/api/admin/course/1/in-active
  updateDeactiveCourse(id) {
    const uri = `admin/course/${id}/in-active`;
    return axiosService.putMethod(uri, null);
  }

  //View detail course
  //{{url}}/api/admin/course/2/view
  getDetailCourse(id) {
    const uri = `admin/course/${id}/view`;
    return axiosService.getMethod(uri);
  }

  //Create course
  //{{url}}/api/admin/course/create
  createCourse(data) {
    const uri = "admin/Course/create";
    return axiosService.postMethod(uri, data);
  }

  //Update course
  //{{url}}/api/admin/course/1/update
  updateCourse(id, data) {
    const uri = `admin/course/${id}/update`;
    return axiosService.putMethod(uri, data);
  }
}

const adminReqService = new AdminRequestService();
export default adminReqService;
