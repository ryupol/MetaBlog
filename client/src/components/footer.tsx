import { Link } from "react-router-dom";
import Logo from "./ui/logo";
function Footer() {
  const quickLink = ["Home", "About", "Blog", "Contact"];
  const category = [
    "Lifestyle",
    "Technology",
    "Travel",
    "Business",
    "Economy",
    "Sports",
  ];
  return (
    <section className="flex flex-col border-t border-slate-200 bg-gray-100 pt-12">
      <div className="max-container text-sans flex w-[100%] justify-between gap-12 max-md:flex-col max-md:text-center">
        <div id="contract" className="max-w-[300px] max-md:max-w-[100%]">
          <h3 id="about" className="footer-header">
            About
          </h3>
          <p className="my-4">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima
            iure qui doloremque deserunt expedita non ipsa nihil ipsam, ex
            ducimus animi.
          </p>
          <p className="leading-8">
            <b className="footer-header">Email : </b>
            <span>info@jstemplate.net</span>
          </p>
          <p>
            <b className="footer-header">Phone : </b>
            <span>088 123 4567</span>
          </p>
        </div>
        <div>
          <ul>
            <h3 className="footer-header mb-6">Quick Link</h3>
            {quickLink.map((link) => (
              <li className="leading-8" key={link}>
                {link === "Home" ? (
                  <Link to="/">{link}</Link>
                ) : (
                  <a href={`#${link.toLowerCase()}`}>{link}</a>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <ul>
            <h3 className="footer-header mb-6">Category</h3>
            {category.map((cat) => (
              <li className="leading-8" key={cat}>
                <a href="/">{cat}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="footer-header">Weekly Newsletter</h3>
        </div>
      </div>
      <div className="max-container flex w-[100%] justify-between gap-6 border-t border-slate-300 py-8 max-md:flex-col max-md:items-center">
        <Logo footer={true} />
        <ul className="flex items-center gap-4">
          <li>Terms of Use</li>
          <li>Privacy Policy</li>
          <li>Cookie Policy</li>
        </ul>
      </div>
    </section>
  );
}

export default Footer;
