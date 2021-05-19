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
    const [errorVal, seterrorVal] = useState({
        BienSoXe: "",
        LoaiXe: "",
    });
    const submitForm = (event) => {
        event.preventDefault();

        let valLoaiXe = utils.checkEmptyString(event.target.loai_xe.value);
        let valBienSoXe = utils.checkEmptyString(event.target.bien_so_xe.value);

        if (
            valLoaiXe !== "" ||
            valBienSoXe !== "") {
            let err = { ...errorVal };
            err.BienSoXe = valBienSoXe;
            err.LoaiXe = valLoaiXe;
            seterrorVal(err);
            return;
        } else {
            let err = { ...errorVal };
            err.BienSoXe = valBienSoXe;
            err.LoaiXe = valLoaiXe;
            seterrorVal(err);
        }
        var data = JSON.stringify({
            "bien_so_xe": event.target.bien_so_xe.value,
            "loai_xe": event.target.loai_xe.value,
            "xe_hop_dong": event.target.xe_hop_dong.value == "true" ? true : false
        });

        adminReqService
            .createVidecle(data)
            .then((res) => {
                console.log(res);
                if (res.data.status) {
                    toast.notify(`Cập nhật thành công`, {
                        title: `Thanh Công`,
                        duration: 3,
                        type: "success",
                    });
                } else {
                    let data = null
                    data = res.data
                    console.log(data.message);
                    toast.notify(`${data.message}`, {
                        title: `Thất Bại`,
                        duration: 3,
                        type: "error",
                    });
                }
            })
            .catch((err) => {
                setloi(err.message);
                toast.notify(`${err.message}`, {
                    title: `Thất Bại`,
                    duration: 3,
                    type: "error",
                });
            });
        console.log(data);
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
    const renderFormInfoVidecle = () => {
        return (
            <form onSubmit={submitForm}>

                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label htmlFor="bien_so_xe">Biển số</label>
                        <input
                            type="text"
                            className="form-control"
                            id="bien_so_xe"
                            name="bien_so_xe"
                            placeholder="Họ & Tên"
                        />
                        {errorVal.BienSoXe !== "" ? (
                            renderCheckVali(errorVal.BienSoXe)
                        ) : (
                            <></>
                        )}
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="loai_xe">Tên xe</label>
                        <input
                            type="text"
                            className="form-control"
                            id="loai_xe"
                            name="loai_xe"
                            placeholder="loai_xe"
                        />
                        {errorVal.BienSoXe !== "" ? (
                            renderCheckVali(errorVal.LoaiXe)
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                <div className="form-group col-md-6">
                    <div className="row">
                        <label htmlFor="xe_hop_dong" className="col-form-label">
                            Loại xe:{" "}
                        </label>
                        <div className="col-sm-6">
                            <select id="time" name="xe_hop_dong" className="form-control">
                                <option value="true" defaultChecked>Hợp đồng</option>
                                <option value="false">Chính thức</option>
                            </select>
                        </div>
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
        <AdminTemplate title="Chi tiết thông tin Xe">
            {AdminHeader("Chi tiết thông tin Xe")}
            <div className="col-lg-12">
                <div className="white_card card_height_100 mb_30">
                    <div className="card-body">
                        {renderFormInfoVidecle()}
                    </div>
                </div>
            </div>
        </AdminTemplate>
    );
}
