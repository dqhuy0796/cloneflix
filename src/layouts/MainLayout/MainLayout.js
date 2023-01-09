import Footer from "~/layouts/Footer";
import Header from "~/layouts/Header";
function MainLayout({ children }) {
    return (
        <>
            <Header />
            <div className="bg-dark-900 min-h-screen">{children}</div>
            <Footer />
        </>
    );
}

export default MainLayout;
