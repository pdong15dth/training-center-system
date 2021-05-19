import { useEffect, useState } from "react";
import AdminHeader from "../../src/components/adminHeader";
import AdminTemplate from "../../src/containers/AdminTemplate";
import adminReqService from "../../src/services/adminService/admin.request.service";
import { toast } from "react-nextjs-toast";
import { useRouter } from "next/router";
import Link from "next/link";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

export default function Index() {
  const [listVehicle, setlistVehicle] = useState(null);
  const [loi, setloi] = useState("");
  const [selectedId, setselectedId] = useState(null);
  const [VehicleInfo, setVehicleInfo] = useState(null);

  const router = useRouter();
  const resetListUser = () => {
    adminReqService
      .getAllVehicle()
      .then((res) => {
        console.log(res.data)
        setlistVehicle(res.data);
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

  const selectedVehicle = (id) => {
    router.push({
      pathname: "/vehicle/info/[id]",
      query: { id: id },
    });
  };

  const deletedVehicle = (row, isActive) => {
    var str = ``
    if (isActive) {
      str = `Bạn có chắc muốn kích hoạt xe có biển số: ${row.biensoxe}`
    } else {
      str = `Bạn có chắc muốn vô hiệu xe có biển số: ${row.biensoxe}`
    }

    confirmAlert({
      title: "Xác nhận xoá xe",
      message: str,
      buttons: [
        {
          label: "Đồng ý",
          onClick: () => {
            adminReqService.activeOrDeActiveVehicle(isActive, row.id).then((res) => {
              resetListUser()
              toast.notify(`Cập nhật thành công`, {
                title: `Thành công`,
                duration: 3,
                type: "success",
              });
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
            console.log("xoas xoas")
          },
        },
        {
          label: "Không",
          onClick: () => { },
        },
      ],
    });
  }
  const renderListUserInTableView = (items) => {
    if (!items) {
      return <></>;
    }
    return items.map((item, index) => {
      return (
        <tr key={index}>
          <td onClick={() => selectedVehicle(item.id)}>{index + 1}</td>
          <td onClick={() => selectedVehicle(item.id)}>{item.biensoxe}</td>
          <td onClick={() => selectedVehicle(item.id)}>{item.loaixe}</td>
          <td onClick={() => selectedVehicle(item.id)}>{item.is_contract ? "Hợp Đồng" : "Chính Thức "}</td>
          <td>
            {item.status ? (
              <span className="badge badge-danger">
                Đang bận
              </span>
            ) : (
              <span className="badge badge-success">
                Tự do
              </span>
            )}
          </td>
          <td>
            {!item.is_deleted ? (
              <span className="badge badge-success">
                Hoạt động
              </span>
            ) : (
              <span className="badge badge-danger">
                Bảo trì
              </span>
            )}
          </td>
          <td>
            <button type="button" className={`btn btn-${item.is_deleted ? "success" : "danger"}danger mb-3`} onClick={() => deletedVehicle(item, item.is_deleted)}>{item.is_deleted ? "Kích hoạt" : "Vô hiệu"}</button>
          </td>
        </tr>
      );
    });
  };

  return (
    <AdminTemplate title="Danh sách xe">
      {AdminHeader("Danh sách xe")}
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
                    <Link href="/vehicle/create">
                      <a className="btn_1">Thêm xe</a>
                    </Link>
                  </div>
                </div>
              </div>

              {listVehicle ? (
                <div className="QA_table mb_30">
                  <table className="table lms_table_active text-center">
                    <thead >
                      <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Tên Xe</th>
                        <th scope="col">Biển Số Xe</th>
                        <th scope="col">Loại Xe</th>
                        <th scope="col">Trạng Thái</th>
                        <th scope="col">Tình trạng</th>
                        <th scope="col">Hành động</th>
                      </tr>
                    </thead>
                    <tbody>{renderListUserInTableView(listVehicle)}</tbody>
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
