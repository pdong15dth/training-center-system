import { useEffect, useState } from "react";
import AdminHeader from "../../../../../src/components/adminHeader";
import ErrorValid from "../../../../../src/components/Common/ErrorValid";
import utils from "../../../../../src/components/utils/constant";
import AdminTemplate from "../../../../../src/containers/AdminTemplate";
import adminReqService from "../../../../../src/services/adminService/admin.request.service";
import { toast } from "react-nextjs-toast";
import { DocumentContext } from "next/document";
import Loading from "../../../../../src/components/Loading";
import Link from "next/link";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useRouter } from "next/router";

Index.getInitialProps = async (ctx: DocumentContext) => {

  return {
    props: { query: ctx.query }
  }
}

async function refetchListStudent(id) {
  let data = await adminReqService.getAllStudent()
  return data?.data
}

export default function Index({ props }) {
  const suggestions = ["Apple", "Air", "Asia", "Mumbai", "Kolkata", "Banana"]

  const [tagSelected, setTagSelected] = useState(null)
  const [tags, setTags] = useState([])
  const [listStudent, setListStudent] = useState(null)
  const [detailClass, setdetailClass] = useState(null)
  const [isLoading, setisLoading] = useState(true)
  const [loi, setloi] = useState("");
  const router = useRouter()
  const [errorVal, seterrorVal] = useState({
    id_class: 0,
    fullname: "",
    date_of_birth: "",
    phone: "",
    address: "",
    cmnd: "",
    experience_driver: "",
    km_safe: "",
    amount: null
  });

  useEffect(() => {

    adminReqService.getDetailCourse(props.query.id).then(res => {
      setdetailClass(res?.data)
      setisLoading(false)
    }).catch(err => {
      setisLoading(false)
      setloi(err.message);
      toast.notify(`${err.message}`, {
        title: `Thất Bại`,
        duration: 3,
        type: "error",
      });
    })
    refetchListStudent(props.query.id).then(res => {
      setListStudent(res)
    }).catch(err => {
      toast.notify(`${err.message}`, {
        title: `Thất Bại`,
        duration: 3,
        type: "error",
      });
    })
  }, [])

  const onSubmitCreateCourse = (event) => {
    event.preventDefault();

    var fullname = utils.checkEmptyString(event.target.fullname.value)
    // var checkEmail = utils.checkEmailValid(event.target.email.value)
    var checkPhone = utils.checkPhoneNumber(event.target.phone.value)
    var checkAddress = utils.checkEmptyString(event.target.address.value)
    var checkCmnd = utils.checkCMNDNumber(event.target.cmnd.value)
    let validExper =
      event.target.experience_driver.value == "" ||
      event.target.experience_driver.value < 0;
    let validkm_safe =
      event.target.km_safe.value == "" || event.target.km_safe.value < 0;

    if (fullname != "" || checkPhone != "" || checkAddress != "" || checkCmnd != "") {
      let err = { ...errorVal };
      err.phone = checkPhone
      err.address = checkAddress
      err.cmnd = checkCmnd
      err.date_of_birth =
        event.target.date_of_birth.value == ""
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
      let err = {
        id_class: 0,
        fullname: "",
        date_of_birth: "",
        phone: "",
        address: "",
        cmnd: "",
        experience_driver: "",
        km_safe: "",
        amount: null
      }
      seterrorVal(err);
    }

    var data = JSON.stringify({
      "id_class": parseInt(props.query.idClass),
      "full_name": event.target.fullname.value,
      "email": event.target.email.value,
      "sex": "Nam",
      "date_of_birth": utils
        .formatDate(event.target.date_of_birth.value)
        .replaceAll("/", "-"),
      "phone": event.target.phone.value,
      "address": event.target.address.value,
      "cmnd": event.target.cmnd.value,
      "cnsk": true,
      "gplx": tags.toString(),
      "exp": parseInt(event.target.experience_driver.value),
      "number_of_km": parseInt(event.target.km_safe.value),
      "id_role": 1,
      "amount": parseInt(event.target.amount.value)
    });

    console.log(data)
    adminReqService.createStudentInClass(data).then((res) => {
      refetchListStudent(props.query.id).then(res => {
        setListStudent(res)
      }).catch(err => {
        toast.notify(`${err.message}`, {
          title: `Thất Bại`,
          duration: 3,
          type: "error",
        });
      })
      toast.notify(`Thêm khoá học thành công`, {
        title: `Thành công`,
        duration: 3,
        type: "success",
      });

    }).catch(err => {
      toast.notify(`${err.message}`, {
        title: `Thất Bại`,
        duration: 3,
        type: "error",
      });
    })
  }

  const renderError = (loi) => {
    return (
      <div className="col-md-12">
        <h6 className="card-subtitle mb-2 text-center" style={{ color: "red" }}>{loi}</h6>
      </div>
    )
  }

  const listTags = (tags) => {
    console.log("dong ne", tags.length)
    return (
      <div className={`col-sm-${tags.length}`}>
        {tags.map((tag, index) => {
          return (
            <>
              <span key={index} className="badge badge-success badge-minwidth">{tag}</span>{" "}
            </>
          )
        })}
      </div>
    )
  }

  const choooseTag = () => {

  }
  const renderContentForm = (detailClass) => {
    return (
      <form onSubmit={onSubmitCreateCourse}>
        <div className="form-group">
          <label htmlFor="fullname">Họ & Tên</label>
          <input
            type="text"
            className="form-control"
            id="fullname"
            name="fullname"
            placeholder="Họ & Tên"
          />
          {ErrorValid(errorVal.fullname)}
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
            <label htmlFor="phone">Số điện thoại</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              placeholder="Số điện thoại"
            />
            {ErrorValid(errorVal.phone)}

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
          {ErrorValid(errorVal.address)}
        </div>
        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="cmnd">CMND/CCCD</label>
            <input
              type="text"
              className="form-control"
              id="cmnd"
              name="cmnd"
              placeholder="CMND 9 số / 12 số"
            />
            {ErrorValid(errorVal.cmnd)}
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="date_of_birth">Ngày sinh (dd-mm-yyyy)</label>
            <input
              type="text"
              className="form-control"
              id="date_of_birth"
              name="date_of_birth"
              placeholder="Vd: 12-02-1997"
            />
            {ErrorValid(errorVal.date_of_birth)}
          </div>
          <div className="form-group col-md-4">
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
          {ErrorValid(errorVal.experience_driver)}
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
          {ErrorValid(errorVal.km_safe)}
        </div>

        <div className="form-group row">
          <label htmlFor="km_safe" className="col-sm-3 col-form-label">
            Giấy phép lái xe hiện có:{" "}
          </label>
          {listTags(tags)}
          <div className="col-sm-4">
            <div className="input-group">
              <select className="custom-select" id="inputGroupSelect04" aria-label="Example select with button addon" onChange={(newTags) => setTagSelected(newTags.target.value)}>
                <option value={``}>Loại bằng</option>
                {utils.listCourse.map((item, index) => {
                  return <option key={index} value={`${item}`}>{item}</option>
                })}
              </select>
              <div className="input-group-append">
                <button className="btn btn-light" type="button" onClick={() => {
                  var newTags = [...tags]
                  var index = newTags.indexOf(tagSelected);
                  if (index == -1 && tagSelected != null && tagSelected != "") {
                    newTags.push(tagSelected)
                  }
                  setTags(newTags)
                  console.log("tasg", newTags)
                }}>Chọn</button>
              </div>
            </div>
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
          <label
            htmlFor="experience_driver"
            className="col-sm-3 col-form-label"
          >
            Tiền học phí đã đóng:
        </label>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              id="amount"
              placeholder="Số tiền"
              min={0}
              name="amount"
            />
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

    )
  }
  const submitCreate = (event) => {
    event.preventDefault();
    var data = JSON.stringify({
      "id_course": 1,
      "quantity": 20,
      "teacher_id": parseInt(event.target.teacher_id.value),
      "vehicle_id": parseInt(event.target.vehicle_id.value)
    });
    adminReqService.createClassInCourse(data).then(res => {
      toast.notify(`Thêm lớp học thành công`, {
        title: `Thành công`,
        duration: 3,
        type: "success",
      });
    }).catch(err => {
      toast.notify(`${err.message}`, {
        title: `Thất Bại`,
        duration: 3,
        type: "error",
      });
    })
  }
  const renderCreateForm = () => {
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
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="training_system">ID: </label><strong>{" "}{`detail?.id`}</strong>
                    {" / "}
                    <label htmlFor="training_system">Tên khoá học: </label><strong>{" "}{`detail?.name`}</strong>

                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="training_system">Số học viên tối đa: </label><strong>{" "}20</strong>
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

  const renderListStudent = () => {
    const actionRemove = (row) => {
      console.log(row)
    }

    const deleteClass = (row) => {
      confirmAlert({
        title: "Xác nhận xoá lớp học",
        message: `Bạn có chắc muốn xoá lớp học có Mã: ${row.code}`,
        buttons: [
          {
            label: "Đồng ý",
            onClick: () => actionRemove(row),
          },
          {
            label: "Không",
            onClick: () => { },
          },
        ],
      });
    }

    const gotoAddStudent = (row) => {
      router.push(`${router.asPath}/add-student`)
    }

    return listStudent?.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.id}</td>
          <td><Link href={`/course/${router.query.slug}/edit/${router.query.id}/add-student`}><a>{item.full_name}</a></Link></td>
          <td>
            <button className="btn btn-danger rounded-pill" onClick={() => deleteClass(item)}>
              <i className="ti-pencil"></i>{" "}Xoá
              </button>
          </td>
        </tr>
      )
    })
  }

  return (
    <>
      {renderCreateForm()}
      <AdminTemplate title="Thêm học viên">
        {AdminHeader("Thêm học viên")}
        <div className="col-lg-12">
          <div className="white_card card_height_100 mb_30">
            <div className="white_card_body">
              <div className="card-body">
                {renderContentForm(detailClass)}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="white_card card_height_100 mb_30 QA_section">
            <div className="white_card_body">
              <div className="QA_section">
                <div className="white_box_tittle list_header">
                  <div className="box_right d-flex lms_block">
                    <div className="serach_field_2">
                      <div className="search_inner">
                        <form>
                          <div className="search_field">
                            <input
                              type="text"
                              placeholder="Tìm kiếm lớp học..."
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
                      <a className="btn_1" href="#" data-toggle="modal"
                        data-target="#createFormModal">Thêm lớp học</a>
                    </div>
                  </div>
                </div>

                <div className="QA_table table-responsive ">
                  <table className="table pt-0 text-center">
                    <thead>
                      <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Tên lớp</th>
                        <th scope="col">Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {renderListStudent()}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminTemplate>
    </>
  );
}
