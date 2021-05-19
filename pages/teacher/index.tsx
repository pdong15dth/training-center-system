import { useEffect, useState } from "react";
import AdminHeader from "../../src/components/adminHeader";
import AdminTemplate from "../../src/containers/AdminTemplate";
import adminReqService from "../../src/services/adminService/admin.request.service";
import { toast } from "react-nextjs-toast";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Index() {
  const [listTeacher, setlistTeacher] = useState(null);
  const [loi, setloi] = useState("");
  const [selectedId, setselectedId] = useState(null);
  const [teacherInfo, setteacherInfo] = useState(null);

  const router = useRouter();
  const resetListUser = () => {
    adminReqService
      .getAllTeacher()
      .then((res) => {
        setlistTeacher(res.data);
      })
      .catch((err) => {
        setloi(err.message);
        if (err.message == "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại") {
          router.push("/login")
        }
        toast.notify(`${err.message}`, {
          title: `Thất Bại`,
          duration: 3,
          type: "error",
        });
      });
  };

  useEffect(() => {
    resetListUser();
  }, []);

  const selectedTeacher = (id) => {
    router.push({
      pathname: "/teacher/info/[id]",
      query: { id: id },
    });
  };
  const renderListUserInTableView = (items) => {
    if (!items) {
      return <></>;
    }
    return items.map((item, index) => {
      return (
        <tr key={index}>
          <td onClick={() => selectedTeacher(item.id)}>{item.id}</td>
          <td onClick={() => selectedTeacher(item.id)}>{item.fullname}</td>
          <td onClick={() => selectedTeacher(item.id)}>{item.phone}</td>
          <td onClick={() => selectedTeacher(item.id)}>{item.email}</td>
          <td>
            {!item.is_deleted ? (
              <button className="btn btn-success rounded-pill">
                Hoạt động
              </button>
            ) : (
              <button className="btn btn-danger rounded-pill">
                Đã khóa
              </button>
            )}
          </td>
        </tr>
      );
    });
  };

  return (
    <AdminTemplate title="Danh sách giáo viên">
      {AdminHeader("Danh sách giáo viên")}
      <div className="col-lg-12">
        <div className="white_card card_height_100 mb_30">
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
                    <Link href="/teacher/create">
                      <a className="btn_1">Thêm Giáo Viên</a>
                    </Link>
                  </div>
                </div>
              </div>

              {listTeacher ? (
                <div className="QA_table mb_30">
                  <table className="table lms_table_active">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Họ & tên</th>
                        <th scope="col">Số điện thoại</th>
                        <th scope="col">Email</th>
                        <th scope="col">Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>{renderListUserInTableView(listTeacher)}</tbody>
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
  );
}
