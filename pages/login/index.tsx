import React, { FormEvent, useState } from "react";
import { TReqLogin } from "../../src/interfaces/admin.interface/admin.http.interfaces";
import adminReqService from "../../src/services/adminService/admin.request.service";
import localStorageService from "../../src/services/localStorage.service/localStorage.service";
import { useRouter } from "next/router";
import { LoginDataModel } from "../../src/models/AdminDataResult";
import axiosService from "../../src/services/httpService/axios.service";
import AdminTemplate from "../../src/containers/AdminTemplate";
import AdminHeader from "../../src/components/adminHeader";

const LoginPage = ({ data, ...props }) => {
  const router = useRouter();

  const [dataLogin, setDataLogin] = useState<TReqLogin>({
    password: "",
    username: "",
  });

  const handleOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    const dataChanged = {
      ...dataLogin,
      [name]: value,
    };
    setDataLogin(dataChanged);
  };

  const handleOnsubmit = (e: any) => {
    e.preventDefault();
    adminReqService
      .loginMethod(dataLogin)
      .then((res) => {
        localStorageService.accessToken.set(res.data.token);
        const userInfor: any = res.data.infoUser;
        localStorageService.userInfor.set(new LoginDataModel(userInfor));
        axiosService.getAxiosConfig();
        router.push("/");
      })
      .catch((err) => {
        // console.log('error', err);
      });
  };

  return (
    <AdminTemplate title="Đăng nhập vào hệ thống">
      {AdminHeader("Login")}
      <div className="col-lg-12">
        <div className="white_box mb_30">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="modal-content cs_modal">
                <div className="modal-header justify-content-center theme_bg_1">
                  <h5 className="modal-title text_white">Form Đăng Nhập</h5>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleOnsubmit}>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your email"
                        name="username"
                        onChange={handleOnchange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        onChange={handleOnchange}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn_1 full_width text-center"
                    >
                      Đăng Nhập
                    </button>

                    {/* <p>
                      Need an account?{" "}
                      <a
                        data-toggle="modal"
                        data-target="#sing_up"
                        data-dismiss="modal"
                        href="#"
                      >
                        {" "}
                        Sign Up
                      </a>
                    </p>
                    <div className="text-center">
                      <a
                        href="#"
                        data-toggle="modal"
                        data-target="#forgot_password"
                        data-dismiss="modal"
                        className="pass_forget_btn"
                      >
                        Forget Password?
                      </a>
                    </div> */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminTemplate>
  );
};

export default LoginPage;
