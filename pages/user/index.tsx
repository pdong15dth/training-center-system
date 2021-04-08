import { NextScript } from "next/document";
import Head from "next/head";
import { useEffect, useState } from "react";
import AdminHeader from "../../src/components/adminHeader";
import AdminTemplate from "../../src/containers/AdminTemplate";
import adminReqService from "../../src/services/adminService/admin.request.service";
import { toast } from "react-nextjs-toast";
import Link from "next/link";

export default function index() {
  const [listUser, setlistUser] = useState(null);
  const [selectedId, setselectedId] = useState(null);
  const [userInfo, setuserInfo] = useState(null);
  useEffect(() => {
    adminReqService
      .getAllUser()
      .then((res) => {
        setlistUser(res.data);
      })
      .catch((err) => {
        toast.notify(`${err.message}`, {
          title: `Thất Bại`,
          duration: 3,
          type: "error",
        });
      });
  }, []);

  const selectedUser = (id) => {
    let info = listUser.filter((user) => user.id == id);
    setuserInfo(info[0]);
  };

  const renderListUserInTableView = (items) => {
    if (!items) {
      return <></>;
    }
    return items.map((item, index) => {
      return (
        <tr
          key={index}
          data-toggle="modal"
          data-target="#exampleModalCenter"
          onClick={() => selectedUser(item.id)}
        >
          <td>{item.id}</td>
          <td>{item.username}</td>
          <td>{item.role}</td>
          <td>{item.fullname}</td>
          <td>{item.phone}</td>
          <td>{item.email}</td>
          <td>
            <span
              className={`badge badge-${item.is_delete ? "danger" : "success"}`}
            >
              {item.is_delete ? "Ngừng Hoạt Động" : "Đang Hoạt Đông"}
            </span>
          </td>
        </tr>
      );
    });
  };

  const submitChange = (event) => {
    event.preventDefault();
    console.log(event.target.date_of_birth);
  };
  var defaultValue = new Date();
  const renderInfoUser = () => {
    if (!userInfo) {
      return <></>;
    }
    console.log(userInfo);
    return (
      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div
          className=" modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Thông tin tài khoản: <strong>{userInfo.fullname}</strong>
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={submitChange}>
                <div className="form-group">
                  <label htmlFor="fullname">Họ & tên</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullname"
                    name="fullname"
                    defaultValue={userInfo.fullname}
                    placeholder="Họ & tên"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      defaultValue={userInfo.email}
                      id="email"
                      placeholder="Email"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="username">User name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      defaultValue={userInfo.username}
                      placeholder="User name"
                      disabled
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    defaultValue={userInfo.address}
                    placeholder="1234 Main St"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group col-md-4">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      name="phone"
                      defaultValue={userInfo.phone}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="date_of_birth">Ngày sinh <strong><i>(dd/mm/yyyy)</i></strong></label>
                    <input
                      type="text"
                      className="form-control"
                      id="date_of_birth"
                      name="date_of_birth"
                      defaultValue={userInfo.date_of_birth}
                    />
                  </div>
                  <div className="form-group col-md-2">
                    <label htmlFor="inputState">Vai trò</label>
                    <select
                      id="inputState"
                      className="form-control"
                      defaultValue={userInfo.role}
                    >
                      <option value="ADMIN">ADMIN</option>
                      <option value="EDITOR">EDITOR</option>
                    </select>
                  </div>
                  <div className="form-group col-md-2">
                    <label htmlFor="inputState">Giới tính</label>
                    <select
                      id="inputState"
                      className="form-control"
                      defaultValue={userInfo.sex}
                    >
                      <option value="Nam">Nam</option>
                      <option value="Nu">Nữ</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      {renderInfoUser()}
      <AdminTemplate title="Danh sách tài khoản">
        <Head>
          <link
            rel="stylesheet"
            href="vendors/datatable/css/jquery.dataTables.min.css"
          />
          <link
            rel="stylesheet"
            href="vendors/datatable/css/responsive.dataTables.min.css"
          />
          <link
            rel="stylesheet"
            href="vendors/datatable/css/buttons.dataTables.min.css"
          />
        </Head>
        {AdminHeader("Danh sách Tài Khoản")}
        <div className="col-lg-12">
          <div className="white_card card_height_100 mb_30">
            <div className="white_card_body">
              <div className="QA_section">
                <div className="white_box_tittle list_header">
                  <h4></h4>
                  <div className="box_right d-flex lms_block">
                    <div className="serach_field_2">
                      <div className="search_inner">
                        <form>
                          <div className="search_field">
                            <input
                              type="text"
                              placeholder="Search content here..."
                            />
                          </div>
                          <button type="submit">
                            {" "}
                            <i className="ti-search"></i>{" "}
                          </button>
                        </form>
                      </div>
                    </div>
                    <div className="add_button ml-10">
                      <a
                        href="#"
                        data-toggle="modal"
                        data-target="#addcategory"
                        className="btn_1"
                      >
                        Tạo tài khoản
                      </a>
                    </div>
                  </div>
                </div>

                {listUser ? (
                  <div className="QA_table mb_30">
                    <table className="table lms_table_active">
                      <thead>
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col">User name</th>
                          <th scope="col">Role</th>
                          <th scope="col">Họ & tên</th>
                          <th scope="col">Số điện thoại</th>
                          <th scope="col">Email</th>
                          <th scope="col">Trạng thái</th>
                        </tr>
                      </thead>
                      <tbody>{renderListUserInTableView(listUser)}</tbody>
                    </table>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </AdminTemplate>
    </>
  );
}
