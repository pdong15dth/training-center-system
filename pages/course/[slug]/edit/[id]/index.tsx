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

async function getTeacher() {
  let data = await adminReqService.getAvailableTeacherInCourse()
  return data?.data
}

async function getVehicle() {
  let data = await adminReqService.getAvailableVehicleInCourse()
  return data?.data
}

async function refetchListClass(id) {
  let data = await adminReqService.getAllClassInCourse(id)
  return data?.data
}

export default function Index({ props }) {

  const [detail, setdetail] = useState(null)
  const [teachers, setteachers] = useState(null)
  const [vehicles, setvehicles] = useState(null)
  const [listClass, setlistClass] = useState(null)
  const [isLoading, setisLoading] = useState(true)
  const [loi, setloi] = useState("");
  const router = useRouter()
  const [errorVal, seterrorVal] = useState({
    name: "",
    start_date: "",
    graduation_date: "",
  });

  useEffect(() => {
    adminReqService.getDetailCourse(props.query.id).then(res => {
      setdetail(res?.data)
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
    getTeacher().then(res => {
      setteachers(res)
    }).catch(err => {
      toast.notify(`${err.message}`, {
        title: `Thất Bại`,
        duration: 3,
        type: "error",
      });
    })

    getVehicle().then(res => {
      setvehicles(res)
    }).catch(err => {
      toast.notify(`${err.message}`, {
        title: `Thất Bại`,
        duration: 3,
        type: "error",
      });

    })

    refetchListClass(props.query.id).then(res => {
      setlistClass(res)
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

    var name = utils.checkEmptyString(event.target.name.value)
    var checkstart_date = utils.checkEmptyString(event.target.start_date.value)
    var checkgraduation_date = utils.checkEmptyString(event.target.graduation_date.value)
    if (name != "" || checkstart_date != "" || checkgraduation_date != "") {

      let err = { ...errorVal };
      err.name = name
      err.start_date = checkstart_date
      err.graduation_date = checkgraduation_date
      seterrorVal(err);
      return;
    } else {
      let err = {
        name: "",
        start_date: "",
        graduation_date: "",
      }
      seterrorVal(err);
    }
    var data = JSON.stringify({
      "name": event.target.name.value,
      "start_date": event.target.start_date.value,
      "graduation_date": event.target.graduation_date.value,
      "training_system": event.target.training_system.value,
      "time": event.target.time.value
    });

    adminReqService.createCourse(data).then((res) => {
      refetchListClass(props.query.id).then(res => {
        setlistClass(res)
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

  const renderContentForm = (detail) => {
    return (
      <form onSubmit={onSubmitCreateCourse}>
        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="name">Tên khoá học</label>
            <input type="name" className="form-control" id="name" placeholder="Nhập tên khoá học" defaultValue={detail.name} />
            {ErrorValid(errorVal.name)}
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="time">Ca (Sáng / Chiều)</label>
            <select id="time" className="form-control" defaultValue={`${detail.time}`}>
              <option value="S">Sáng</option>
              <option value="C">Chiều</option>
            </select>
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="training_system">Khoá đào tạo</label>
            <select id="training_system" className="form-control" defaultValue={detail.training_system}>
              {utils.listCourse.map((item, index) => {
                return <option key={index} value={`${item}`}>{item}</option>
              })}

            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="start_date">Ngày bắt đầu (dd-MM-yyyy)</label>
            <input type="text" className="form-control" id="start_date" placeholder="Nhập ngày bắt đầu" defaultValue={detail.start_date} />
            {ErrorValid(errorVal.start_date)}
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="graduation_date">Ngày tốt nghiệp (dd-MM-yyyy)</label>
            <input type="text" className="form-control" id="graduation_date" placeholder="Nhập ngày tốt nghiệp" defaultValue={detail.graduation_date} />
            {ErrorValid(errorVal.graduation_date)}
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Đồng ý</button>
      </form>

    )
  }
  const submitCreate = (event) => {
    event.preventDefault();
    var data = JSON.stringify({
      "id_course": detail.id,
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
                    <label htmlFor="training_system">ID: </label><strong>{" "}{detail?.id}</strong>
                    {" / "}
                    <label htmlFor="training_system">Tên khoá học: </label><strong>{" "}{detail?.name}</strong>

                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="training_system">Số học viên tối đa: </label><strong>{" "}20</strong>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="teacher_id">Giáo viên phụ trách:</label>
                    <select id="teacher_id" className="form-control"  >
                      {teachers?.map((item, index) => {
                        return <option key={index} defaultChecked={index == 0} value={`${item.id}`}>{item.name}</option>
                      })}
                    </select>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="vehicle_id">Xe thực hành:</label>
                    <select id="vehicle_id" className="form-control">
                      {vehicles?.map((item, index) => {
                        return <option key={index} defaultChecked={index == 0} value={`${item.id}`}>{item.car_number_plates}</option>
                      })}
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
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderListCourse = () => {
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
      router.push({
        pathname: `${router.asPath}/add-student`,
        query: {
          id: row.id,
          code: row.code
        }
      })
    }

    return listClass?.map((item, index) => {
      console.log(router)
      return (
        <tr key={index}>
          <td>{item.id}</td>
          <td><Link href={`/course/${router.query.slug}/edit/${router.query.id}/add-student`}><a>Mã lớp: {item.code}</a></Link></td>
          <td>
            <button className="btn btn-danger rounded-pill" onClick={() => deleteClass(item)}>
              <i className="ti-pencil"></i>{" "}Xoá
              </button>
            {" "}
            <button className="btn btn-success rounded-pill" onClick={() => gotoAddStudent(item)}>
              <i className="ti-pencil"></i>{" "}Thêm HV
              </button>
          </td>
        </tr>
      )
    })
  }

  return (
    <>
      {renderCreateForm()}
      <AdminTemplate title="Chỉnh sửa khoá học">
        {AdminHeader("Chỉnh sửa khoá học")}
        <div className="col-lg-12">
          <div className="white_card card_height_100 mb_30">
            <div className="white_card_body">
              <div className="card-body">
                {isLoading ? Loading() : (detail ? renderContentForm(detail) : renderError(loi))}
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
                      {renderListCourse()}
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
