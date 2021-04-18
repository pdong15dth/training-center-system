import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import adminReqService from "../../../src/services/adminService/admin.request.service";
import { toast } from "react-nextjs-toast";
import AdminTemplate from "../../../src/containers/AdminTemplate";
import AdminHeader from "../../../src/components/adminHeader";
import { DocumentContext } from "next/document";

Index.getInitialProps = async (ctx: DocumentContext) => {
  return {
    props: {query: ctx.query}
  }
}


export default function Index({props}) {
  const router = useRouter();

  const [detail, setdetail] = useState(null);
  const [loi, setloi] = useState("");

  useEffect(() => {
    adminReqService
      .getDetailCourse(props.query.id)
      .then((res) => setdetail(res.data))
      .catch((err) => {
        setloi(err.message);
        toast.notify(`${err.message}`, {
          title: `Thất Bại`,
          duration: 3,
          type: "error",
        });
      });
  }, []);
console.log(detail)
  return (
    <AdminTemplate title="Thông tin tài khoản">
      {AdminHeader("Thông tin tài khoản")}
      <div className="col-lg-12">
        <div className="card_box box_shadow position-relative mb_30">
          <div className="white_box_tittle ">
            <div className="main-title2 ">
              <h4 className="mb-2 ">
                Thời khóa biểu: Áp dụng từ {detail.start_date} Hạng {detail.training_system} - {detail.name}
              </h4>
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
              {/* <h5 className="mb-2">
                <strong>
                  <span>B2: LÁI XE TỪ 4 - 9 CHỖ VÀ TẢI DƯỚI 3.5 TẤN</span>
                </strong>
              </h5> */}
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
                <strong>Trường hợp đặc biệt:</strong> Thứ 7, Chủ Nhật (Phụ thu
                1.500.000đ) / trọn khóa
                <strong>(Áp dụng từ ngày 08/11/2019)</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminTemplate>
  );
}
