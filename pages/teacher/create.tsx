import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AdminHeader from "../../src/components/adminHeader";
import AdminTemplate from "../../src/containers/AdminTemplate";
import adminReqService from "../../src/services/adminService/admin.request.service";
import { toast } from "react-nextjs-toast";
import { DocumentContext } from "next/document";
import Loading from "../../src/components/Loading";
import utils from "../../src/components/utils/constant";

Index.getInitialProps = async (ctx: DocumentContext) => {
  return {
    props: {
      query: ctx.query,
    },
  };
};

export default function Index({ props }) {
  const [loi, setloi] = useState("");
  const [errorVal, seterrorVal] = useState({
    fullname: "",
    sex: "",
    dateofbirth: "",
    phone: "",
    address: "",
    cmnd: "",
  });
  const submitForm = (event) => {
    event.preventDefault();

    let valPhoneString = utils.checkPhoneNumber(event.target.phone.value);
    let valCmndString = utils.checkCMNDNumber(event.target.cmnd.value);
    if (
      valPhoneString !== "" ||
      valCmndString !== "" ||
      event.target.fullname.value == "" ||
      event.target.address.value == ""
    ) {
      let err = { ...errorVal };
      err.phone = valPhoneString;
      err.cmnd = valCmndString;
      err.fullname =
        event.target.fullname.value == "" ? "Vui lòng nhập Họ & Tên" : "";
      err.address =
        event.target.address.value == "" ? "Vui lòng nhập Địa chỉ" : "";
      seterrorVal(err);
      return;
    } else {
      let err = { ...errorVal };
      err.phone = valPhoneString;
      err.cmnd = valCmndString;
      err.fullname = "";
      err.address = "";
      seterrorVal(err);
    }
    var data = JSON.stringify({
      fullname: event.target.fullname.value,
      sex: event.target.sex.value,
      dateofbirth: utils
        .formatDate(event.target.dateofbirth.value)
        .replaceAll("/", "-"),
      phone: event.target.phone.value,
      address: event.target.address.value,
      cmnd: event.target.cmnd.value,
      cnsk: event.target.cnsk.value,
      gplx: event.target.gplx.value,
      experience_driver: event.target.experience_driver.value,
      km_safe: event.target.km_safe.value,
      is_deleted: false,
    });

    console.log("day la id:", props.query.id)
    adminReqService
      .updateTeacher(props.query.id, data)
      .then((res) => {
        toast.notify(`Cập nhật thành công`, {
          title: `Thanh Công`,
          duration: 3,
          type: "success",
        });

      })
      .catch((err) => {
        console.log(err)
        setloi(err.message);
        toast.notify(`${err.message}`, {
          title: `Thất Bại`,
          duration: 3,
          type: "error",
        });
      });
    console.log(data);
  };

  const renderCheckVali = (message: string = "") => {
    if (message !== "") {
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
  const renderFormInfoTeacher = () => {
    return (
      <form onSubmit={submitForm}>
        <div className="form-group">
          <label htmlFor="fullname">Họ & Tên</label>
          <input
            type="text"
            className="form-control"
            id="fullname"
            name="fullname"
            placeholder="Họ & Tên"
          />
          {errorVal.fullname !== "" ? (
            renderCheckVali(errorVal.fullname)
          ) : (
            <></>
          )}
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Email"
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="username">Tên đăng nhập</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              placeholder="Username"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="address">Địa chỉ</label>
          <input
            type="text"
            className="form-control"
            id="address"
            placeholder="Nhập địa chỉ tại đây"
          />
          {errorVal.address !== "" ? renderCheckVali(errorVal.address) : <></>}
        </div>
        <div className="form-row">
          <div className="form-group col-md-3">
            <label htmlFor="cmnd">CMND/CCCD</label>
            <input
              type="text"
              className="form-control"
              id="cmnd"
              name="cmnd"
              placeholder="CMND 9 số / 12 số"
            />
            {errorVal.cmnd !== "" ? renderCheckVali(errorVal.cmnd) : <></>}
          </div>
          <div className="form-group col-md-3">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              placeholder="Phone"
            />
            {errorVal.phone !== "" ? renderCheckVali(errorVal.phone) : <></>}
          </div>
          <div className="form-group col-md-3">
            <label htmlFor="dateofbirth">Ngày sinh (dd-mm-yyyy)</label>
            <input
              type="text"
              className="form-control"
              id="dateofbirth"
              name="dateofbirth"
              placeholder="Vd: 12-02-1997"
            />
          </div>
          <div className="form-group col-md-3">
            <label htmlFor="sex">Giới tính</label>
            <select id="sex" className="form-control" defaultValue={"Nam"}>
              <option>Nam</option>
              <option>Nữ</option>
            </select>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-12">
            Chứng nhận sức khỏe:{" "}
            { true ? (
              <span className="badge badge-success badge-minwidth">Có</span>
            ) : (
              <span className="badge badge-success badge-minwidth">Không</span>
            )}{" "}
            <a href="#">Xem hình</a>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-4">
            Số năm lái xe:{" "}
            <span className="badge badge-success badge-minwidth">
              100 năm
            </span>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-4">
            Số Km lái xe an toàn:{" "}
            <span className="badge badge-success badge-minwidth">
              100 km
            </span>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-12">
            Giấy phép lái xe{" "}
            <strong>
              <i>
                <u>Hardcode</u>
              </i>
            </strong>
            : <span className="badge badge-success badge-minwidth">A1</span>{" "}
            <span className="badge badge-success badge-minwidth">A2</span>{" "}
            <span className="badge badge-success badge-minwidth">B1</span>{" "}
            <span className="badge badge-success badge-minwidth">B2</span>{" "}
            <a href="#">Xem hình</a>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-4">
            Trạng thái tài khoản:{" "}
            <span className="badge badge-success badge-minwidth">
              Đang hoạt động
            </span>
          </div>
        </div>
        <div style={{ color: "red" }}>
          <strong>
            {loi ? (
              <>
                <hr />
                {loi}
                <hr />
              </>
            ) : (
              ""
            )}
          </strong>
        </div>
        <button type="submit" className="btn btn-primary">
          Lưu thay đổi
        </button>
      </form>
    );
  };
  return (
    <AdminTemplate title="Chi tiết thông tin Giáo Viên">
      {AdminHeader("Chi tiết thông tin Giáo Viên")}
      <div className="col-lg-12">
        <div className="white_card card_height_100 mb_30">
          <div className="card-body">
            {renderFormInfoTeacher()}
          </div>
        </div>
      </div>
    </AdminTemplate>
  );
}
