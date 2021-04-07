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
  console.log(userInfo);
  const handleLogout = () => {
    adminReqService
      .logoutMethod()
      .then((res) => {
        toast.notify(`Đã đăng xuất`, {
          title: `Thành Công`,
          duration: 3,
          type: "success",
        });
        setTimeout(() => {
          router.push("/login");
        }, 3000);
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
                    <img src="img/icon/icon_search.svg" alt="" />{" "}
                  </button>
                </form>
              </div>
              <span className="f_s_14 f_w_400 ml_25 white_text text_white">
                Apps
              </span>
            </div>
            <div className="header_right d-flex justify-content-between align-items-center">
              <div className="header_notification_warp d-flex align-items-center">
                <li>
                  <a
                    className="bell_notification_clicker nav-link-notify"
                    href="#"
                  >
                    {" "}
                    <img src="img/icon/bell.svg" alt="" />
                  </a>
                  <div className="Menu_NOtification_Wrap">
                    <div className="notification_Header">
                      <h4>Notifications</h4>
                    </div>
                    <div className="Notification_body">
                      <div className="single_notify d-flex align-items-center">
                        <div className="notify_thumb">
                          <a href="#">
                            <img src="img/staf/2.png" alt="" />
                          </a>
                        </div>
                        <div className="notify_content">
                          <a href="#">
                            <h5>Cool Marketing </h5>
                          </a>
                          <p>Lorem ipsum dolor sit amet</p>
                        </div>
                      </div>
                      <div className="single_notify d-flex align-items-center">
                        <div className="notify_thumb">
                          <a href="#">
                            <img src="img/staf/4.png" alt="" />
                          </a>
                        </div>
                        <div className="notify_content">
                          <a href="#">
                            <h5>Awesome packages</h5>
                          </a>
                          <p>Lorem ipsum dolor sit amet</p>
                        </div>
                      </div>
                      <div className="single_notify d-flex align-items-center">
                        <div className="notify_thumb">
                          <a href="#">
                            <img src="img/staf/3.png" alt="" />
                          </a>
                        </div>
                        <div className="notify_content">
                          <a href="#">
                            <h5>what a packages</h5>
                          </a>
                          <p>Lorem ipsum dolor sit amet</p>
                        </div>
                      </div>
                      <div className="single_notify d-flex align-items-center">
                        <div className="notify_thumb">
                          <a href="#">
                            <img src="img/staf/2.png" alt="" />
                          </a>
                        </div>
                        <div className="notify_content">
                          <a href="#">
                            <h5>Cool Marketing </h5>
                          </a>
                          <p>Lorem ipsum dolor sit amet</p>
                        </div>
                      </div>
                      <div className="single_notify d-flex align-items-center">
                        <div className="notify_thumb">
                          <a href="#">
                            <img src="img/staf/4.png" alt="" />
                          </a>
                        </div>
                        <div className="notify_content">
                          <a href="#">
                            <h5>Awesome packages</h5>
                          </a>
                          <p>Lorem ipsum dolor sit amet</p>
                        </div>
                      </div>
                      <div className="single_notify d-flex align-items-center">
                        <div className="notify_thumb">
                          <a href="#">
                            <img src="img/staf/3.png" alt="" />
                          </a>
                        </div>
                        <div className="notify_content">
                          <a href="#">
                            <h5>what a packages</h5>
                          </a>
                          <p>Lorem ipsum dolor sit amet</p>
                        </div>
                      </div>
                    </div>
                    <div className="nofity_footer">
                      <div className="submit_button text-center pt_20">
                        <a href="#" className="btn_1">
                          See More
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <a className="CHATBOX_open nav-link-notify" href="#">
                    {" "}
                    <img src="img/icon/msg.svg" alt="" />{" "}
                  </a>
                </li>
              </div>
              <div className="profile_info">
                <img src="img/client_img.png" alt="#" />
                <div className="profile_info_iner">
                  <div className="profile_author_name">
                    <p>Neurologist </p>
                    <h5>Dr. Robar Smith</h5>
                  </div>
                  <div className="profile_info_details">
                    <a href="#">My Profile </a>
                    <a href="#">Settings</a>
                    <Link href="">
                      <a onClick={handleLogout}>Log Out </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTopBar;
