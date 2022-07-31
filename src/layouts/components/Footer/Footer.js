import { GrFacebookOption, GrInstagram, GrTwitter, GrYoutube } from "react-icons/gr";

function Footer({ data }) {
    return (
        <footer className="px-3 py-5 w-full text-xs text-light-100/50 bg-dark-900">
            <div className="wrapper mx-auto w-full max-w-screen-lg">
                <div className="flex items-center mb-4 gap-x-4 text-light-900">
                    <a href="http://youtube.com" target="_blank" rel="noopener noreferrer">
                        <GrFacebookOption className="text-2xl" />
                    </a>
                    <a href="http://youtube.com" target="_blank" rel="noopener noreferrer">
                        <GrInstagram className="text-2xl" />
                    </a>
                    <a href="http://youtube.com" target="_blank" rel="noopener noreferrer">
                        <GrTwitter className="text-2xl" />
                    </a>
                    <a href="http://youtube.com" target="_blank" rel="noopener noreferrer">
                        <GrYoutube className="text-2xl" />
                    </a>
                </div>
                <ul className="flex flex-wrap mb-4 gap-y-4">
                    <li className="w-1/2 lg:w-1/4">
                        <p className="footer-link">Audio and subtitles</p>
                        <p className="footer-link">Media Center</p>
                        <p className="footer-link">Privacy</p>
                        <p className="footer-link">Contact Us</p>
                    </li>
                    <li className="w-1/2 lg:w-1/4">
                        <p className="footer-link">Audio description</p>
                        <p className="footer-link">Investor Relations</p>
                        <p className="footer-link">Legal Notices</p>
                    </li>
                    <li className="w-1/2 lg:w-1/4">
                        <p className="footer-link">Help Center</p>
                        <p className="footer-link">Job</p>
                        <p className="footer-link">Cookie Preference</p>
                    </li>
                    <li className="w-1/2 lg:w-1/4">
                        <p className="footer-link">Girf Cards</p>
                        <p className="footer-link">Term Of Use</p>
                        <p className="footer-link">Corporate Infomation</p>
                    </li>
                </ul>
                <div className="inline-block p-1.5 mb-4 border border-light-100 hover:border-light-900 hover:text-light-900">Service code</div>
                <div className="text-[10px]">
                    <span className="mr-2">© 1997-2022 Netflix, Inc.</span>
                    <span>6a082e7e-467f-4cdc-b3d7-37d99f094df2</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
