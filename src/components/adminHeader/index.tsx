export default function AdminHeader(title) {
  return (
    <div className="col-12">
      <div className="dashboard_header mb_50">
        <div className="row">
          <div className="col-lg-6">
            <div className="dashboard_header_title">
              <h3>{title}</h3>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="dashboard_breadcam text-right">
              <p>
                <a href="index.html">Trang chủ</a>{" "}
                <i className="fas fa-caret-right"></i> {title}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
