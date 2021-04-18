import { useEffect, useState } from "react";
import AdminHeader from "../../src/components/adminHeader";
import AdminTemplate from "../../src/containers/AdminTemplate";
import adminReqService from "../../src/services/adminService/admin.request.service";
import { toast } from "react-nextjs-toast";
import Loading from "../../src/components/Loading";

export default function Index() {
  const [loi, setloi] = useState("");
  const [courses, setCourses] = useState(null);

  useEffect(() => {
    adminReqService
      .getAllCourseActive()
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
        <div className="col-md-4" style={{ cursor: "pointer" }} key={index}>
          <div className="card mb-3 widget-chart">
            <div className="icon-wrapper rounded-circle">
              <div className="icon-wrapper-bg bg-primary"></div>
              <i className="ti-settings text-primary"></i>
            </div>
            <div className="widget-numbers">
              <span>{item.name}</span>
            </div>
            <div className="widget-subheading text-success">
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
  return (
    <AdminTemplate title="Danh sách đào tạo">
      {AdminHeader("Danh sách đào tạo")}
      <div className="col-md-4" style={{ cursor: "pointer" }}>
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
      {courses ? renderCourse(courses) : Loading()}
    </AdminTemplate>
  );
}
