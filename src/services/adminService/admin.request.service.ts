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
  getUserInfo() {
    const uri = "admin/phong/view/account";
    return axiosService.getMethod(uri);
  }
}

const adminReqService = new AdminRequestService();
export default adminReqService;
