import Link from "next/link";
import AdminHeader from "../../src/components/adminHeader";
import utils from "../../src/components/utils/constant";
import AdminTemplate from "../../src/containers/AdminTemplate";

export default function Index() {
    const renderListCourse = () => {
        return utils.listCourse.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td><Link href={`/course/${item}`}><a>Khoá đào tạo <strong>{item}</strong></a></Link></td>
                </tr>
            )
        })
    }
    return <AdminTemplate title="Danh sách hệ đạo tào">
        {AdminHeader("Danh sách khoá đạo tào")}
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
                                                    placeholder="Tìm kiếm tên khoá đào tạo..."
                                                />
                                            </div>
                                            <button type="submit">
                                                {" "}
                                                <i className="ti-search"></i>{" "}
                                            </button>
                                        </form>
                                    </div>
                                </div>
                                {/* <div className="add_button ml-10">
                                    <Link href="/teacher/create">
                                        <a className="btn_1">Thêm Khoá Đào tạo</a>
                                    </Link>
                                </div> */}
                            </div>
                        </div>

                        <div className="QA_table table-responsive ">
                            <table className="table pt-0">
                                <thead>
                                    <tr>
                                        <th scope="col">STT</th>
                                        <th scope="col">Tên khoá</th>
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
    </AdminTemplate>;
}
