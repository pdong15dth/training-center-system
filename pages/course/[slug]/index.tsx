import { useEffect, useState } from "react";
import AdminHeader from "../../../src/components/adminHeader";
import AdminTemplate from "../../../src/containers/AdminTemplate";
import adminReqService from "../../../src/services/adminService/admin.request.service";
import { toast } from "react-nextjs-toast";
import Loading from "../../../src/components/Loading";
import { DocumentContext } from "next/document";
import { useRouter } from "next/router";
import Link from "next/link";

Index.getInitialProps = async (ctx: DocumentContext) => {
  return {
    props: { slug: ctx.query.slug }
  }
}

export default function Index({ props }) {
  const [loi, setloi] = useState("");
  const [courses, setCourses] = useState(null);
  const router = useRouter()
  useEffect(() => {
    adminReqService
      .getAllCourseActive(props.slug)
      .then((res) => setCourses(res?.data))
      .catch((err) => {
        setloi(err.message);
        toast.notify(`${err.message}`, {
          title: `Thất Bại`,
          duration: 3,
          type: "error",
        });
      });
  }, []);

  console.log(courses);
  const renderCourse = (items) => {
    return items.map((item, index) => {
      return (
        <div className="col-md-4" key={index}>
          <div className="card mb-3 widget-chart">

            <div className="icon-wrapper rounded-circle">
              <div className="icon-wrapper-bg bg-primary"></div>
             <Link href={`${router.asPath}/edit/${item.id}`}>
             <a>
             <i className="ti-pencil text-danger"></i></a>
             </Link>
            </div>

            <div className="widget-numbers">
              <Link href={`${router.asPath}/${item.id}`}>
                <a><span>{item.name}</span></a>
              </Link>
            </div>
            <div className="widget-subheading text-success" >
              <strong>Ngày bắt đầu: </strong>
              {item.start_date}
            </div>
            <br />
            <div className="widget-subheading text-danger">
              <strong>Ngày kết thúc: </strong>
              {item.end_date}
            </div>
            {item.status ? (
              <div className="widget-description text-success">
                <span className="pl-1">
                  <span>Đang hoạt động</span>
                </span>
              </div>
            ) : (
              <div className="widget-description text-danger">
                <span className="pl-1">
                  <span>Đã hoàn thành</span>
                </span>
              </div>
            )}
          </div>
        </div>
      );
    });
  };
  const renderError = (loi) => {
    return (
      <div className="col-md-12">
        <h6 className="card-subtitle mb-2 text-center" style={{ color: "red" }}>{loi}</h6>
      </div>
    )
  }

  const onclickCreateCourse = () => {
    router.push(`${router.asPath}/create`)
  }
  return (
    <AdminTemplate title="Danh sách đào tạo">
      {AdminHeader("Danh sách đào tạo")}
      <div className="col-md-4" style={{ cursor: "pointer" }} onClick={() => onclickCreateCourse()}>
        <div className="card mb-3 widget-chart custom-card-create">
          <div className="icon-wrapper rounded-circle custom-card-icon">
            <div className="icon-wrapper-bg bg-primary"></div>
            <i className="ti-plus text-primary"></i>
          </div>
          <div className="widget-numbers">
            <span className="text-center">Tạo khóa đào tạo</span>
          </div>
        </div>
      </div>
      {courses ? renderCourse(courses) : (loi ? renderError(loi) : Loading())}
    </AdminTemplate>
  );
}
