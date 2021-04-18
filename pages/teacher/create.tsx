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
  const [exp, setexp] = useState(true);
  const [kmsafe, setkmsafe] = useState(true);
  const [errorVal, seterrorVal] = useState({
    fullname: "",
    sex: "",
    dateofbirth: "",
    phone: "",
    email: "",
    address: "",
    cmnd: "",
    experience_driver: "",
    km_safe: "",
  });
  const submitForm = (event) => {
    event.preventDefault();

    let valPhoneString = utils.checkPhoneNumber(event.target.phone.value);
    let valCmndString = utils.checkCMNDNumber(event.target.cmnd.value);

    let validExper =
      event.target.experience_driver.value == "" ||
      event.target.experience_driver.value < 0;
    let validkm_safe =
      event.target.km_safe.value == "" || event.target.km_safe.value < 0;

    if (
      valPhoneString !== "" ||
      valCmndString !== "" ||
      event.target.fullname.value == "" ||
      event.target.address.value == "" ||
      event.target.dateofbirth.value == "" ||
      event.target.email.value == "" ||
      validExper ||
      validkm_safe
    ) {
      let err = { ...errorVal };
      err.phone = valPhoneString;
      err.cmnd = valCmndString;
      err.fullname =
        event.target.fullname.value == "" ? "Vui lòng nhập Họ & Tên" : "";
      err.address =
        event.target.address.value == "" ? "Vui lòng nhập Địa chỉ" : "";
      err.email =
        event.target.email.value == "" ? "Vui lòng nhập Địa chỉ Email" : "";

      err.dateofbirth =
        event.target.dateofbirth.value == ""
          ? "Vui lòng nhập Ngày tháng năm sinh"
          : "";

      err.experience_driver = validExper
        ? "Số năm lái xe không được bỏ trống và phải lơn hơn 0"
        : "";
      err.km_safe = validkm_safe
        ? "Số năm Km lái xe an toàn không được bỏ trống và phải lơn hơn 0"
        : "";

      seterrorVal(err);
      return;
    } else {
      let err = { ...errorVal };
      err.phone = valPhoneString;
      err.cmnd = valCmndString;
      err.fullname = "";
      err.address = "";
      err.dateofbirth = "";
      err.experience_driver = "";
      err.km_safe = "";
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
      cnsk: event.target.cnsk.checked,
      gplx: "A1",
      experience_driver: parseInt(event.target.experience_driver.value),
      km_safe: parseInt(event.target.km_safe.value),
      email: event.target.email.value,
      is_deleted: !event.target.is_deleted.checked,
      is_contract: event.target.is_contract.checked,
      is_practice: event.target.is_practice.checked,
    });
    console.log(data);

    adminReqService
      .createTeacher( data)
      .then((res) => {
        toast.notify(`Cập nhật thành công`, {
          title: `Thanh Công`,
          duration: 3,
          type: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        setloi(err.message);
        toast.notify(`${err.message}`, {
          title: `Thất Bại`,
          duration: 3,
          type: "error",
        });
      });
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
            {errorVal.email !== "" ? renderCheckVali(errorVal.email) : <></>}
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
            {errorVal.dateofbirth !== "" ? (
              renderCheckVali(errorVal.dateofbirth)
            ) : (
              <></>
            )}
          </div>
          <div className="form-group col-md-3">
            <label htmlFor="sex">Giới tính</label>
            <select
              id="sex"
              className="form-control"
              defaultValue={"Nam"}
              name="sex"
            >
              <option>Nam</option>
              <option>Nữ</option>
            </select>
          </div>
        </div>

        <div className="form-group row">
          <label
            htmlFor="experience_driver"
            className="col-sm-3 col-form-label"
          >
            Số năm lái xe:
          </label>
          <div className="col-sm-2">
            <input
              type="number"
              className="form-control"
              id="experience_driver"
              placeholder="Số năm"
              min={0}
              name="experience_driver"
            />
          </div>
          {errorVal.experience_driver != "" ? (
            renderCheckVali(errorVal.experience_driver)
          ) : (
            <></>
          )}
        </div>
        <div className="form-group row">
          <label htmlFor="km_safe" className="col-sm-3 col-form-label">
            Số Km lái xe an toàn:{" "}
          </label>
          <div className="col-sm-2">
            <input
              type="number"
              className="form-control"
              id="km_safe"
              placeholder="Số Km"
              min={0}
              name="km_safe"
            />
          </div>
          {errorVal.km_safe !== "" ? renderCheckVali(errorVal.km_safe) : <></>}
        </div>

        <div className="form-group row">
          <label htmlFor="km_safe" className="col-sm-3 col-form-label">
            Giấy phép lái xe{" "}
          </label>
          <div className="col-sm-9">
            <span className="badge badge-success badge-minwidth">A1</span>{" "}
            <span className="badge badge-success badge-minwidth">A2</span>{" "}
            <span className="badge badge-success badge-minwidth">B1</span>{" "}
            <span className="badge badge-success badge-minwidth">B2</span>{" "}
            <a href="#">Xem hình</a>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="is_contract" className="col-sm-3 col-form-label">
            Giáo viên hợp đồng:{" "}
            <p>On (Hợp đồng) / Off (Chính Thức)</p>
          </label>
          <div className="col-sm-4">
            <label className="switch">
              <input type="checkbox" name="is_contract" defaultChecked />
              <span className="slider round"></span>
            </label>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="is_practice" className="col-sm-3 col-form-label">
            Giáo viên có dạy thực hành:{" "}
          </label>
          <div className="col-sm-4">
            <label className="switch">
              <input type="checkbox" name="is_practice" defaultChecked />
              <span className="slider round"></span>
            </label>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="cnsk" className="col-sm-3 col-form-label">
            Chứng nhận sức khỏe:{" "}
          </label>
          <div className="col-sm-4">
            <label className="switch">
              <input type="checkbox" name="cnsk" defaultChecked />
              <span className="slider round"></span>
            </label>
            <a href="#">Xem hình</a>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="km_safe" className="col-sm-3 col-form-label">
            Trạng thái tài khoản:{" "}
          </label>
          <div className="col-sm-4">
            <label className="switch">
              <input type="checkbox" name="is_deleted" defaultChecked />
              <span className="slider round"></span>
            </label>
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
          <div className="card-body">{renderFormInfoTeacher()}</div>
        </div>
      </div>
    </AdminTemplate>
  );
}
