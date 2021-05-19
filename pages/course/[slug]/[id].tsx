import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import adminReqService from "../../../src/services/adminService/admin.request.service";
import { toast } from "react-nextjs-toast";
import AdminTemplate from "../../../src/containers/AdminTemplate";
import AdminHeader from "../../../src/components/adminHeader";
import { DocumentContext } from "next/document";
import utils from "../../../src/components/utils/constant";

Index.getInitialProps = async (ctx: DocumentContext) => {
  return {
    props: { query: ctx.query }
  }
}


export default function Index({ props }) {

  const [detail, setdetail] = useState(null);
  const [loi, setloi] = useState("");
  const checkCourse = utils.checkIsValidCourse(props.query.slug)
  const [checked, setChecked] = useState(false)
  useEffect(() => {

    adminReqService
      .getDetailCourse(props.query.id)
      .then((res) => {
        let data = res.data
        console.log(data.status)
        setdetail(res.data)
        setChecked(data.status ? true : false)
      })
      .catch((err) => {
        setloi(err.message);
        toast.notify(`${err.message}`, {
          title: `Thất Bại 12`,
          duration: 3,
          type: "error",
        });
      });
  }, []);
  const renderContentView = (detail) => {
    return (
      <div className="white_box_tittle ">
        <div className="main-title2 ">
          <div className="row">
            <div className="col-10">
              <h4 className="mb-2">
                Thời khóa biểu: Áp dụng từ {detail.start_date} Hạng {detail.training_system} - {detail.name}
              </h4>
            </div>
            <div className="col-2 text-center">
              <h5 className="mb-2">
                <strong>
                  <u className="header-card-course">Kích hoạt:</u>
                </strong>
              </h5>
              <label className="switch clear-padding-switch">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    setChecked(!checked)
                    adminReqService
                      .updateActiveCourse(props.query.id, checked)
                      .then((res) => {
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
                  }}
                  checked={checked}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>


          <h5 className="mb-2">
            <strong>
              <u className="header-card-course">GPLX HẠNG:</u>
            </strong>
          </h5>
          <h5 className="mb-2">
            <strong>
              <span>B1 - B11: TỰ ĐỘNG: LÁI XE TỰ ĐỘNG TỪ 4 - 9 CHỖ</span>
            </strong>
          </h5>
        </div>
        <div className="box_body background-card-course">
          <h4 className="mb-2 ">LỊCH HỌC XE</h4>
          <p>
            <strong>Ngày chẳn:</strong> Thứ 2, 4, 6, Chủ nhật
      </p>
          <p>
            <strong>Ngày lẻ:</strong> Thứ 3, 5, 7
      </p>
          <br />
          <p>
            <strong>Trường hợp đặc biệt:</strong> Thứ 7, Chủ Nhật (Phụ thu 1.500.000đ) / trọn khóa
        <strong>(Áp dụng từ ngày 08/11/2019)</strong>
          </p>
        </div>
      </div>
    )
  }
  return (
    <AdminTemplate title="Thông tin khoá học">
      {AdminHeader("Thông tin khoá học")}
      <div className="col-lg-12">
        <div className="card_box box_shadow position-relative mb_30">
          {checkCourse != -1
            ? (detail ? renderContentView(detail)
              :
              <div className="white_box_tittle">Không tìm thấy data tương ứng</div>)
            :
            <div className="white_box_tittle">Không tìm thấy data tương ứng</div>}
        </div>
      </div>
    </AdminTemplate>
  );
}
