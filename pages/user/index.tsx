import { NextScript } from "next/document";
import Head from "next/head";
import { useEffect, useState } from "react";
import AdminHeader from "../../src/components/adminHeader";
import AdminTemplate from "../../src/containers/AdminTemplate";
import adminReqService from "../../src/services/adminService/admin.request.service";
import { toast } from "react-nextjs-toast";
import Link from "next/link";
import { useRouter } from "next/router";
import authService from "../../src/services/authService/auth.service";
import utils from "../../src/components/utils/constant";

export default function index() {
  const [listUser, setlistUser] = useState(null);
  const [selectedId, setselectedId] = useState(null);
  const [userInfo, setuserInfo] = useState(null);
  const router = useRouter();
  const [checkUsername, setCheckusername] = useState(false);
  const [checkpass, setCheckpass] = useState(false);
  const [checkrepass, setCheckrepass] = useState(false);
  const [checkrole, setCheckrole] = useState(false);
  const [checkemail, setCheckemail] = useState(false);
  const [checksex, setChecksex] = useState(false);
  const [checkdate_of_birth, setCheckdate_of_birth] = useState(false);
  const [checkphone, setCheckphone] = useState(false);
  const [checkfullname, setCheckfullname] = useState(false);
  const [checkaddress, setCheckaddress] = useState(false);
  const [currentUser, setcurrentUSer] = useState(null);
  const [loi, setloi] = useState("");

  useEffect(() => {
    setcurrentUSer(authService.getUserInfor());
    adminReqService
      .getAllUser()
      .then((res) => {
        setlistUser(res.data);
      })
      .catch((err) => {
        setloi(err.message);
        toast.notify(`${err.message}`, {
          title: `Thất Bại`,
          duration: 3,
          type: "error",
        });
      });
  }, []);

  const resetListUser = () => {
    adminReqService
      .getAllUser()
      .then((res) => {
        setlistUser(res.data);
      })
      .catch((err) => {
        setloi(err.message);
        toast.notify(`${err.message}`, {
          title: `Thất Bại`,
          duration: 3,
          type: "error",
        });
      });
  };
  const selectedUser = (id) => {
    setselectedId(id);
    let info = listUser.filter((user) => user.id == id);
    setuserInfo(info[0]);
  };

  const submitChange = (event) => {
    event.preventDefault();

    var data = JSON.stringify({
      email: event.target.email.value,
      username: event.target.username.value,
      role: event.target.role.value,
      sex: event.target.sex.value,
      dateofbirth: formatDate(event.target.date_of_birth.value).replaceAll(
        "/",
        "-"
      ),
      phone: event.target.phone.value,
      fullname: event.target.fullname.value,
      address: event.target.address.value,
    });
    var obj = JSON.parse(data);
    if (checkValidate(obj)) {
      return;
    }
    adminReqService
      .updateAccount(data)
      .then((res) => {
        adminReqService
          .getAllUser()
          .then((res) => {
            setlistUser(res.data);
          })
          .catch((err) => {
            setloi(err.message);
            toast.notify(`${err.message}`, {
              title: `Thất Bại`,
              duration: 3,
              type: "error",
            });
          });
        toast.notify(`Cập nhật tài khoản thành công`, {
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
  };

  function formatDate(input) {
    var datePart = input.match(/\d+/g),
      day = datePart[0], // get only two digits
      month = datePart[1],
      year = datePart[2];
    return day + "/" + month + "/" + year;
  }

  const checkValidate = (data) => {
    let returnValue = 0;

    if (data.username == "") {
      setCheckusername(true);
      returnValue = 1;
    } else {
      setCheckusername(false);
    }
    if (data.password == "") {
      setCheckpass(true);
      returnValue = 1;
    } else {
      setCheckpass(false);
    }
    if (data.repassword != data.password) {
      setCheckrepass(true);
      returnValue = 1;
    } else {
      setCheckrepass(false);
    }
    if (data.role == "") {
      setCheckrole(true);
      returnValue = 1;
    } else {
      setCheckrole(false);
    }
    if (data.email == "") {
      setCheckemail(true);
      returnValue = 1;
    } else {
      setCheckemail(false);
    }
    if (data.dateofbirth == "") {
      setCheckdate_of_birth(true);
      returnValue = 1;
    } else {
      setCheckdate_of_birth(false);
    }
    if (data.phone == "") {
      setCheckphone(true);
      returnValue = 1;
    } else {
      setCheckphone(false);
    }
    if (data.sex == "") {
      setChecksex(true);
      returnValue = 1;
    } else {
      setChecksex(false);
    }
    if (data.address == "") {
      setCheckaddress(true);
      returnValue = 1;
    } else {
      setCheckaddress(false);
    }
    if (data.fullname == "") {
      setCheckfullname(true);
      returnValue = 1;
    } else {
      setCheckfullname(false);
    }
    return returnValue;
  };

  const submitCreate = (event) => {
    event.preventDefault();
    var data = JSON.stringify({
      username: event.target.username.value,
      password: event.target.password.value,
      repassword: event.target.repassword.value,
      role: event.target.role.value,
      email: event.target.email.value,
      dateofbirth: utils.formatDate(event.target.date_of_birth.value).replaceAll(
        "/",
        "-"
      ),
      sex: event.target.sex.value,
      phone: event.target.phone.value,
      fullname: event.target.fullname.value,
      address: event.target.address.value,
    });
    var obj = JSON.parse(data);

    if (checkValidate(obj)) {
      return;
    }
    adminReqService
      .createAccount(data)
      .then((res) => {
        resetListUser();
        toast.notify(`Tạo tài khoản mới thành công`, {
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
  };
  const [isDelete, setisDelete] = useState(false);

  const renderListUserInTableView = (items) => {
    if (!items) {
      return <></>;
    }
    return items.map((item, index) => {
      return (
        <tr key={index}>
          <td
            onClick={() => selectedUser(item.id)}
            data-toggle="modal"
            data-target="#exampleModalCenter"
          >
            {item.id}
          </td>
          <td
            onClick={() => selectedUser(item.id)}
            data-toggle="modal"
            data-target="#exampleModalCenter"
          >
            {item.username}
          </td>
          <td
            onClick={() => selectedUser(item.id)}
            data-toggle="modal"
            data-target="#exampleModalCenter"
          >
            {item.role}
          </td>
          <td
            onClick={() => selectedUser(item.id)}
            data-toggle="modal"
            data-target="#exampleModalCenter"
          >
            {item.fullname}
          </td>
          <td
            onClick={() => selectedUser(item.id)}
            data-toggle="modal"
            data-target="#exampleModalCenter"
          >
            {item.phone}
          </td>
          <td
            onClick={() => selectedUser(item.id)}
            data-toggle="modal"
            data-target="#exampleModalCenter"
          >
            {item.email}
          </td>
          <td>
            <label className="switch">
              <input
                type="checkbox"
                onChange={(e) => {
                  if (item.is_delete) {
                    adminReqService
                      .enableAccount(item.username)
                      .then((res) => {
                        resetListUser();
                        toast.notify(`Tạo tài khoản mới thành công`, {
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
                  } else {
                    adminReqService
                      .disableAccount(item.username)
                      .then((res) => {
                        resetListUser();
                        toast.notify(`Tạo tài khoản mới thành công`, {
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
                  }
                }}
                checked={!item.is_delete}
              />
              <span className="slider round"></span>
            </label>

            {/* <span
              className={`badge badge-${item.is_delete ? "danger" : "success"}`}
            >
              {item.is_delete ? "Ngừng Hoạt Động" : "Đang Hoạt Đông"}
            </span> */}
          </td>
        </tr>
      );
    });
  };

  const renderCheckVali = (isCheck: boolean, message: string = "") => {
    if (isCheck) {
      return (
        <div
          className="alert alert-danger"
          style={{ margin: "10px 0", padding: "0 5px" }}
          role="alert"
        >
          <i
            className="fa fa-times"
            style={{ padding: "0 5px 0 0" }}
            aria-hidden="true"
          ></i>
          {message}
        </div>
      );
    } else {
      <></>;
    }
  };
  const renderCreateUserForm = () => {
    return (
      <div
        className="modal fade"
        id="createFormModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="createFormModalTitle"
        aria-hidden="true"
      >
        <div
          className=" modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Tạo tài khoản
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
              <form onSubmit={submitCreate}>
                <div className="form-group">
                  <label htmlFor="fullname">Họ & tên</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullname"
                    name="fullname"
                    placeholder="Họ & tên"
                  />
                  {renderCheckVali(checkfullname, "Vui lòng nhập Họ & tên")}
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      id="email"
                      placeholder="Email"
                    />
                    {renderCheckVali(checkemail, "Vui lòng nhập Email")}
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="username">User name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      placeholder="User name"
                    />
                    {renderCheckVali(checkUsername, "Vui lòng nhập User name")}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="password">Mật khẩu</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Mật khẩu"
                    />
                    {renderCheckVali(checkpass, "Vui lòng nhập mật khẩu")}
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="password">Nhập lại mật khẩu</label>
                    <input
                      type="password"
                      className="form-control"
                      id="repassword"
                      name="repassword"
                      placeholder="Nhập lại mật khẩu"
                    />
                    {renderCheckVali(
                      checkrepass,
                      "Các mật khẩu đã nhập không khớp. Hãy thử lại."
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="address">Địa chỉ</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    placeholder="1234 Main St"
                  />
                  {renderCheckVali(checkaddress, "Vui lòng nhập Địa chỉ")}
                </div>
                <div className="form-row">
                  <div className="form-group col-md-4">
                    <label htmlFor="phone">Số điện thoại</label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      name="phone"
                    />
                    {renderCheckVali(checkphone, "Vui lòng nhập Số điện thoại")}
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="date_of_birth">
                      Ngày sinh{" "}
                      <strong>
                        <i>(dd/mm/yyyy)</i>
                      </strong>
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="date_of_birth"
                      name="date_of_birth"
                      defaultValue=""
                    />
                    {renderCheckVali(
                      checkdate_of_birth,
                      "Vui lòng nhập Ngày sinh"
                    )}
                  </div>
                  <div className="form-group col-md-2">
                    <label htmlFor="role">Vai trò</label>
                    <select className="form-control" name="role">
                      <option value="ADMIN">ADMIN</option>
                      <option value="EDITOR">EDITOR</option>
                      <option value="EDITOR">TEACHER</option>
                    </select>
                    {renderCheckVali(checkrole, "Vui lòng nhập Vai trò")}
                  </div>
                  <div className="form-group col-md-2">
                    <label htmlFor="sex">Giới tính</label>
                    <select className="form-control" name="sex">
                      <option value="Nam">Nam</option>
                      <option value="Nu">Nữ</option>
                    </select>
                    {renderCheckVali(checksex, "Vui lòng nhập Giới tính")}
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Đóng
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Lưu thay đổi
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderFormEdit = (item) => {
    return (
      <form onSubmit={submitChange}>
        <div className="form-group">
          <label htmlFor="fullname">Họ & tên</label>
          <input
            type="text"
            className="form-control"
            id="fullname"
            name="fullname"
            onChange={(e) => {
              item.fullname = e.target.value;
              setuserInfo({ ...item });
            }}
            value={userInfo.fullname}
            placeholder="Họ & tên"
          />
          {renderCheckVali(checkfullname, "Vui lòng không để trống Họ & Tên")}
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              onChange={(e) => {
                item.email = e.target.value;
                setuserInfo({ ...item });
              }}
              value={userInfo.email}
              id="email"
              placeholder="Email"
            />
            {renderCheckVali(checkemail, "Vui lòng không để trống Email")}
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="username">User name</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              onChange={(e) => {
                item.username = e.target.value;
                setuserInfo({ ...item });
              }}
              value={userInfo.username}
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
            onChange={(e) => {
              item.address = e.target.value;
              setuserInfo({ ...item });
            }}
            value={userInfo.address}
            placeholder="1234 Main St"
          />
          {renderCheckVali(checkaddress, "Vui lòng không để trống Địa Chỉ")}
        </div>
        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              onChange={(e) => {
                item.phone = e.target.value;
                setuserInfo({ ...item });
              }}
              value={userInfo.phone}
            />
            {renderCheckVali(
              checkphone,
              "Vui lòng không để trống Số Điện thoại"
            )}
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="date_of_birth">
              Ngày sinh{" "}
              <strong>
                <i>(dd-mm-yyyy)</i>
              </strong>
            </label>
            <input
              type="text"
              className="form-control"
              id="date_of_birth"
              name="date_of_birth"
              onChange={(e) => {
                item.date_of_birth = e.target.value;
                setuserInfo({ ...item });
              }}
              value={userInfo.date_of_birth}
            />
            {renderCheckVali(
              checkdate_of_birth,
              "Vui lòng không để trống Ngày Sinh"
            )}
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="inputState">Vai trò</label>
            <select
              id="inputState"
              className="form-control"
              name="role"
              onChange={(e) => {
                item.role = e.target.value;
                setuserInfo({ ...item });
              }}
              value={userInfo.role}
              disabled={currentUser.username == item.username}
            >
              <option value="ADMIN">ADMIN</option>
              <option value="EDITOR">EDITOR</option>
              <option value="EDITOR">TEACHER</option>
            </select>
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="inputState">Giới tính</label>
            <select
              id="inputState"
              className="form-control"
              name="sex"
              onChange={(e) => {
                item.sex = e.target.value;
                setuserInfo({ ...item });
              }}
              value={userInfo.sex}
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
            Đóng
          </button>
          <button type="submit" className="btn btn-primary">
            Lưu thay đổi
          </button>
        </div>
      </form>
    );
  };
  const renderInfoUser = () => {
    if (!userInfo) {
      return <></>;
    }
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
            <div className="modal-body">{renderFormEdit(userInfo)}</div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      {renderInfoUser()}
      {renderCreateUserForm()}
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
                        className="btn_1"
                        data-toggle="modal"
                        data-target="#createFormModal"
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
                  <div style={{ color: "red", textAlign: "center" }}>
                    <strong>{loi ? loi : ""}</strong>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </AdminTemplate>
    </>
  );
}
