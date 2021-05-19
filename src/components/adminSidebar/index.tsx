import Link from "next/link";
import React, { Fragment } from "react";

const AdminSidebar = () => {
  return (
    // <!-- sidebar part here -->
    <nav className="sidebar dark_sidebar vertical-scroll  ps-container ps-theme-default ps-active-y">
      <div className="logo d-flex justify-content-between">
        <a href="index.html">
          <img src="/img/logo_white.png" alt="" />
        </a>
        <div className="sidebar_close_icon d-lg-none">
          <i className="ti-close"></i>
        </div>
      </div>
      <ul id="sidebar_menu">
        <li>
          <Link href="/" >
            <a aria-expanded="false">
              <div className="icon_menu">
                <img src="/img/menu-icon/dashboard.svg" alt="" />
              </div>
              <span>Dashboard</span>
            </a>
          </Link>
        </li>
        <li>
          <a className="has-arrow" href="#" aria-expanded="false">
            <div className="icon_menu">
              <img src="/img/menu-icon/2.svg" alt="" />
            </div>
            <span>Tài khoản</span>
          </a>
          <ul>
            <li>
              <Link href="/user">
                <a>Danh sách</a>
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <a className="has-arrow" href="#" aria-expanded="false">
            <div className="icon_menu">
              <img src="/img/menu-icon/2.svg" alt="" />
            </div>
            <span>Giáo Viên</span>
          </a>
          <ul>
            <li>
              <Link href="/teacher">
                <a>Danh sách</a>
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <a className="has-arrow" href="#" aria-expanded="false">
            <div className="icon_menu">
              <img src="/img/menu-icon/2.svg" alt="" />
            </div>
            <span>Trang Thiết Bị</span>
          </a>
          <ul>
            <li>
              <Link href="/vehicle">
                <a>Danh sách Xe</a>
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <a className="has-arrow" href="#" aria-expanded="false">
            <div className="icon_menu">
              <img src="/img/menu-icon/2.svg" alt="" />
            </div>
            <span>Khóa đào tạo</span>
          </a>
          <ul>
            <li>
              <Link href="/course">
                <a>Danh sách</a>
              </Link>
            </li>
          </ul>
        </li>
        
      </ul>
    </nav>
  );
};

export default AdminSidebar;
