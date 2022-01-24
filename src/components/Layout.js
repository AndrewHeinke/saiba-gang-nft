import Header from "components/Header";
import Footer from "components/Footer";
import NotifcationBanner from "components/NotificationBanner";

const Layout = ({ children, size, className }) => (
  <>
    <NotifcationBanner />
    <Header size={size} />
    <main>{children}</main>
    <Footer />
  </>
);

export default Layout;
