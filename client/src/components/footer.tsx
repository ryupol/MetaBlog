import { Fragment } from "react";
import { Link } from "react-router-dom";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import Logo from "./ui/logo";
import Button from "./ui/button";
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
  const policys = ["Terms of Use", "Privary Policy", "Cookie Policy"];
  return (
    <section className="flex flex-col items-center justify-center gap-16 border-t border-theme-border bg-theme-fbg pt-12 font-jakarta">
      <div className="max-container text-sans flex w-[100%] justify-between gap-12 max-md:flex-col max-md:items-center max-md:text-center">
        <div id="contract" className="max-w-[300px] max-md:max-w-[100%]">
          <h3 id="about" className="font-semibold">
            About
          </h3>
          <p className="mb-6 mt-3 text-theme-subtext2">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima
            iure qui doloremque deserunt expedita non ipsa nihil ipsam, ex
            ducimus animi.
          </p>
          <p className="mb-1">
            <b className="font-semibold">Email : </b>
            <span className="text-theme-subtext1">info@jstemplate.net</span>
          </p>
          <p>
            <b className="font-semibold">Phone : </b>
            <span className="text-theme-subtext1">088 123 4567</span>
          </p>
        </div>
        <div>
          <ul>
            <h3 className="mb-6 font-semibold">Quick Link</h3>
            {quickLink.map((link) => (
              <li className="mb-[6px] text-theme-subtext1" key={link}>
                {link === "Home" ? (
                  <Link to="/">{link}</Link>
                ) : (
                  <a href={`#${link.toLowerCase()} `}>{link}</a>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <ul>
            <h3 className="mb-6 font-semibold">Category</h3>
            {category.map((cat) => (
              <li className="mb-[6px] text-theme-subtext1" key={cat}>
                <a href="/">{cat}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex w-[392px] flex-col gap-2 rounded-xl bg-theme-fcard px-[30px] py-8 text-center font-work">
          <h2 className="font-semibold">Weekly Newsletter</h2>
          <p className="mb-[22px] text-theme-subtext2">
            Get blog articles and offers via email
          </p>
          <div className="relative flex items-center">
            <input className="footer-input" placeholder="Your Email" />
            <EnvelopeIcon className="pointer-events-none absolute inset-y-0 right-4 top-1/2 flex h-5 w-5 -translate-y-1/2 text-[#696A75]" />
          </div>
          <Button className="bg-blue w-full text-center" aria-disabled>
            Subscribe
          </Button>
        </div>
      </div>
      <div className="max-container border-theme-fborder flex w-[100%] justify-between gap-6 border-t py-8 max-md:flex-col max-md:items-center">
        <Logo footer={true} />
        <ul className="flex items-center gap-4 text-theme-subtext1">
          {policys.map((policy, index) => (
            <Fragment key={index}>
              <li>{policy}</li>
              {index < policys.length - 1 && (
                <hr className="h-6 w-px bg-secondary-100" />
              )}
            </Fragment>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Footer;
