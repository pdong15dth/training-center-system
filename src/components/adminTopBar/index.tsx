import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import adminReqService from "../../services/adminService/admin.request.service";
import authService from "../../services/authService/auth.service";
import { toast } from "react-nextjs-toast";
import _authService from "../../services/authService/auth.service";
import Link from "next/link";

const AdminTopBar = () => {
  const router = useRouter();
  const authService = _authService;

  const [userInfo, setuserInfo] = useState(null);
  useEffect(() => {
    setuserInfo(authService.getUserInfor());
  }, []);
  const handleLogout = () => {
    adminReqService
      .logoutMethod()
      .then((res) => {
        router.push("/login")
        toast.notify(`Đã đăng xuất`, {
          title: `Thành Công`,
          duration: 3,
          type: "success",
        });
      })
      .catch((err) => {
        toast.notify(`${err.message}`, {
          title: `Thất Bại`,
          duration: 3,
          type: "error",
        });
      });
    authService.handleAdminLogout();
  };

  return (
    <div className="container-fluid no-gutters">
      <div className="row">
        <div className="col-lg-12 p-0 ">
          <div className="header_iner d-flex justify-content-between align-items-center">
            <div className="sidebar_icon d-lg-none">
              <i className="ti-menu"></i>
            </div>
            <div className="serach_field-area d-flex align-items-center">
              <div className="search_inner">
                <form action="#">
                  <div className="search_field">
                    <input type="text" placeholder="Search here..." />
                  </div>
                  <button type="submit">
                    {" "}
                    <img src="/img/icon/icon_search.svg" alt="" />{" "}
                  </button>
                </form>
              </div>
              <span className="f_s_14 f_w_400 ml_25 white_text text_white">
                Apps
              </span>
            </div>
            <div className="header_right d-flex justify-content-between align-items-center">
              <div className="profile_info">
                <img src="/img/user.png" alt="#" />
                {userInfo ? (
                  <div className="profile_info_iner">
                    <div className="profile_author_name">
                      <p>{userInfo.role}</p>
                      <h5>{userInfo.fullname}</h5>
                    </div>
                    <div className="profile_info_details">
                      <Link href="#">
                        <a>Trang cá nhân </a>
                      </Link>
                      <Link href="">
                        <a onClick={handleLogout}>Đăng xuất</a>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTopBar;
