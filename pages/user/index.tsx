import { NextScript } from "next/document";
import Head from "next/head";
import AdminHeader from "../../src/components/adminHeader";
import AdminTemplate from "../../src/containers/AdminTemplate";

export default function index() {
  return (
    <AdminTemplate title="Danh sách tài khoản">
      <Head>
        <link
          rel="stylesheet"
          href="vendors/datatable/css/jquery.dataTables.min.css"
        />
        <link
          rel="stylesheet"
          href="vendors/datatable/css/responsive.dataTables.min.css"
        />
        <link
          rel="stylesheet"
          href="vendors/datatable/css/buttons.dataTables.min.css"
        />
      </Head>
      {AdminHeader("Danh sách Tài Khoản")}
      <div className="col-lg-12">
        <div className="white_card card_height_100 mb_30">
          <div className="white_card_body">
            <div className="QA_section">
              <div className="white_box_tittle list_header">
                <h4></h4>
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
                    <a
                      href="#"
                      data-toggle="modal"
                      data-target="#addcategory"
                      className="btn_1"
                    >
                      Tạo tài khoản
                    </a>
                  </div>
                </div>
              </div>

              <div className="QA_table mb_30">
                <table className="table lms_table_active">
                  <thead>
                    <tr>
                      <th scope="col">title</th>
                      <th scope="col">Category</th>
                      <th scope="col">Teacher</th>
                      <th scope="col">Lesson</th>
                      <th scope="col">Enrolled</th>
                      <th scope="col">Price</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                        {" "}
                        <a href="#" className="question_content">
                          {" "}
                          title here 1
                        </a>
                      </th>
                      <td>Category name</td>
                      <td>Teacher James</td>
                      <td>Lessons name</td>
                      <td>16</td>
                      <td>$25.00</td>
                      <td>
                        <a href="#" className="status_btn">
                          Active
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        {" "}
                        <a href="#" className="question_content">
                          {" "}
                          title here 1
                        </a>
                      </th>
                      <td>Category name</td>
                      <td>Teacher James</td>
                      <td>Lessons name</td>
                      <td>16</td>
                      <td>$25.00</td>
                      <td>
                        <a href="#" className="status_btn">
                          Active
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        {" "}
                        <a href="#" className="question_content">
                          {" "}
                          title here 1
                        </a>
                      </th>
                      <td>Category name</td>
                      <td>Teacher James</td>
                      <td>Lessons name</td>
                      <td>16</td>
                      <td>$25.00</td>
                      <td>
                        <a href="#" className="status_btn">
                          Active
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        {" "}
                        <a href="#" className="question_content">
                          {" "}
                          title here 1
                        </a>
                      </th>
                      <td>Category name</td>
                      <td>Teacher James</td>
                      <td>Lessons name</td>
                      <td>16</td>
                      <td>$25.00</td>
                      <td>
                        <a href="#" className="status_btn">
                          Active
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        {" "}
                        <a href="#" className="question_content">
                          {" "}
                          title here 1
                        </a>
                      </th>
                      <td>Category name</td>
                      <td>Teacher James</td>
                      <td>Lessons name</td>
                      <td>16</td>
                      <td>$25.00</td>
                      <td>
                        <a href="#" className="status_btn">
                          Active
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        {" "}
                        <a href="#" className="question_content">
                          {" "}
                          title here 1
                        </a>
                      </th>
                      <td>Category name</td>
                      <td>Teacher James</td>
                      <td>Lessons name</td>
                      <td>16</td>
                      <td>$25.00</td>
                      <td>
                        <a href="#" className="status_btn">
                          Active
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        {" "}
                        <a href="#" className="question_content">
                          {" "}
                          title here 1
                        </a>
                      </th>
                      <td>Category name</td>
                      <td>Teacher James</td>
                      <td>Lessons name</td>
                      <td>16</td>
                      <td>$25.00</td>
                      <td>
                        <a href="#" className="status_btn">
                          Active
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        {" "}
                        <a href="#" className="question_content">
                          {" "}
                          title here 1
                        </a>
                      </th>
                      <td>Category name</td>
                      <td>Teacher James</td>
                      <td>Lessons name</td>
                      <td>16</td>
                      <td>$25.00</td>
                      <td>
                        <a href="#" className="status_btn">
                          Active
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        {" "}
                        <a href="#" className="question_content">
                          {" "}
                          title here 1
                        </a>
                      </th>
                      <td>Category name</td>
                      <td>Teacher James</td>
                      <td>Lessons name</td>
                      <td>16</td>
                      <td>$25.00</td>
                      <td>
                        <a href="#" className="status_btn">
                          Active
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        {" "}
                        <a href="#" className="question_content">
                          {" "}
                          title here 1
                        </a>
                      </th>
                      <td>Category name</td>
                      <td>Teacher James</td>
                      <td>Lessons name</td>
                      <td>16</td>
                      <td>$25.00</td>
                      <td>
                        <a href="#" className="status_btn">
                          Active
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        {" "}
                        <a href="#" className="question_content">
                          {" "}
                          title here 1
                        </a>
                      </th>
                      <td>Category name</td>
                      <td>Teacher James</td>
                      <td>Lessons name</td>
                      <td>16</td>
                      <td>$25.00</td>
                      <td>
                        <a href="#" className="status_btn">
                          Active
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
    </AdminTemplate>
  );
}
