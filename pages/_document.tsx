import Document, { Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="stylesheet" href="/css/bootstrap.min.css" />
          {/* <!-- themefy CSS --> */}
          <link
            rel="stylesheet"
            href="/vendors/themefy_icon/themify-icons.css"
          />
          <link rel="stylesheet" href="/vendors/font_awesome/css/all.min.css" />
          {/* <!-- datatable CSS --> */}
          {/* <!-- scrollabe  --> */}
          <link rel="stylesheet" href="/vendors/scroll/scrollable.css" />

          {/* <!-- menu css  --> */}
          <link rel="stylesheet" href="/css/metisMenu.css" />
          {/* <!-- style CSS --> */}
          <link rel="stylesheet" href="/css/style.css" />
          <link
            rel="stylesheet"
            href="/css/colors/default.css"
            id="colorSkinCSS"
          />
        </Head>
        <body className="crm_body_bg">
          <Main />

          <NextScript />
          {/* <!-- footer  --> */}
          {/* <!-- jquery slim --> */}
          <script src="/js/jquery-3.4.1.min.js"></script>
          {/* <!-- popper js --> */}
          <script src="/js/popper.min.js"></script>
          {/* <!-- bootstarp js --> */}
          <script src="/js/bootstrap.min.js"></script>
          {/* <!-- sidebar menu  --> */}
          <script src="/js/metisMenu.js"></script>

          {/* <!-- responsive table --> */}
          <script src="vendors/datatable/js/jquery.dataTables.min.js"></script>
          <script src="vendors/datatable/js/dataTables.responsive.min.js"></script>
          <script src="vendors/datatable/js/dataTables.buttons.min.js"></script>
          <script src="vendors/datatable/js/buttons.flash.min.js"></script>
          <script src="vendors/datatable/js/jszip.min.js"></script>
          <script src="vendors/datatable/js/pdfmake.min.js"></script>
          <script src="vendors/datatable/js/vfs_fonts.js"></script>
          <script src="vendors/datatable/js/buttons.html5.min.js"></script>
          <script src="vendors/datatable/js/buttons.print.min.js"></script>
          {/* <!-- scrollabe  --> */}
          <script src="/vendors/scroll/perfect-scrollbar.min.js"></script>
          <script src="/vendors/scroll/scrollable-custom.js"></script>

          {/* <!-- custom js --> */}
          <script src="/js/custom.js"></script>
        </body>
      </Html>
    );
  }
}
