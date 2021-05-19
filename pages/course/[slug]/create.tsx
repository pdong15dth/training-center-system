import { useState } from "react";
import AdminHeader from "../../../src/components/adminHeader";
import ErrorValid from "../../../src/components/Common/ErrorValid";
import utils from "../../../src/components/utils/constant";
import AdminTemplate from "../../../src/containers/AdminTemplate";
import adminReqService from "../../../src/services/adminService/admin.request.service";
import { toast } from "react-nextjs-toast";
import { DocumentContext } from "next/document";

Index.getInitialProps = async (ctx: DocumentContext) => {
  return {
    props: { query: ctx.query }
  }
}

export default function Index({ props }) {

  const [errorVal, seterrorVal] = useState({
    name: "",
    start_date: "",
    graduation_date: "",
  });

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
    console.log(data)
  }

  return <AdminTemplate title="Tạo khoá học">
    {AdminHeader("Tạo khoá học")}
    <div className="col-lg-12">
      <div className="white_card card_height_100 mb_30">
        <div className="white_card_body">
          <div className="card-body">
            <form onSubmit={onSubmitCreateCourse}>
              <div className="form-row">
                <div className="form-group col-md-4">
                  <label htmlFor="name">Tên khoá học</label>
                  <input type="name" className="form-control" id="name" placeholder="Nhập tên khoá học" />
                  {ErrorValid(errorVal.name)}
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="time">Ca (Sáng / Chiều)</label>
                  <select id="time" className="form-control">
                    <option defaultChecked value="S">Sáng</option>
                    <option value="C">Chiều</option>
                  </select>
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="training_system">Khoá đào tạo</label>
                  <select id="training_system" className="form-control" defaultValue={props.query.slug}>
                    {utils.listCourse.map((item, index) => {
                      return <option key={index} value={`${item}`}>{item}</option>
                    })}

                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="start_date">Ngày bắt đầu (dd-MM-yyyy)</label>
                  <input type="text" className="form-control" id="start_date" placeholder="Nhập ngày bắt đầu" />
                  {ErrorValid(errorVal.start_date)}
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="graduation_date">Ngày dự kiến tốt nghiệp(dd-MM-yyyy)</label>
                  <input type="text" className="form-control" id="graduation_date" placeholder="Nhập ngày tốt nghiệp" />
                  {ErrorValid(errorVal.graduation_date)}
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Đồng ý</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </AdminTemplate>;
}
