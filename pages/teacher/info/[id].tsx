import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AdminHeader from "../../../src/components/adminHeader";
import AdminTemplate from "../../../src/containers/AdminTemplate";
import adminReqService from "../../../src/services/adminService/admin.request.service";
import { toast } from "react-nextjs-toast";
import { DocumentContext } from "next/document";

Index.getInitialProps = async (ctx: DocumentContext) => {
  return {
    props: {
      query: ctx.query,
    },
  };
};

export default function Index({ props }) {
  const [loi, setloi] = useState("");
  const [teacherInfo, setteacherInfo] = useState(null);

  useEffect(() => {
    adminReqService
      .getDetailTeacher(props.query.id)
      .then((res) => {
        setteacherInfo(res.data)
      })
      .catch((err) => {
        setloi(err.message);
        toast.notify(`${err.message}`, {
          title: `Thất Bại`,
          duration: 3,
          type: "error",
        });
      });
  }, []);
  console.log(teacherInfo)
  return (
    <AdminTemplate title="Chi tiết thông tin Giáo Viên">
      {AdminHeader("Chi tiết thông tin Giáo Viên")}
    </AdminTemplate>
  );
}
