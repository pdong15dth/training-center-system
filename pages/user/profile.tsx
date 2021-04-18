import AdminHeader from "../../src/components/adminHeader";
import AdminTemplate from "../../src/containers/AdminTemplate";

export default function Index() {
  return <AdminTemplate title="Thông tin tài khoản">
      {AdminHeader("Thông tin tài khoản")}
  </AdminTemplate>;
}
