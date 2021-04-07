import Head from "next/head";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import UserFotter from "../../components/userFotter";
import UserNavbar from "../../components/userNavbar";
import { DTC_USER_ROUTE, RouteModel } from "../../routes";

type UserTemplateProps = {
  head?: HTMLHeadElement;
  className?: string;
  title: string;
};

 const UserTemplate: React.FC<UserTemplateProps> =  ({
  head,
  className = "",
  title,
  ...props
}) => {
  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        {head}
      </Head>
      <UserNavbar />
      <main className={className}>{props.children}</main>
      <UserFotter />
    </Fragment>
  );
};

export default UserTemplate;
