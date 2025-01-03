import { Fragment } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import Logo from "./logo";
import Button from "./button";
import { advertiseId } from "../global";
function Footer() {
  const quickLink = ["Home", "Blog", "Single Post", "Contact"];
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
    <footer
      data-cy="footer"
      className="flex flex-col items-center justify-center gap-16 border-t border-theme-border bg-theme-fbg pt-12 font-jakarta"
    >
      <div className="max-container text-sans flex w-[100%] justify-between gap-12 max-md:flex-col max-md:items-center max-md:text-center">
        {/* About Section */}
        <section id="contract" className="max-w-[300px] max-md:max-w-[100%]">
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
        </section>

        {/* Quick Links Section */}
        <nav aria-label="Quick Links">
          <ul>
            <h3 className="mb-6 font-semibold">Quick Link</h3>
            {quickLink.map((link) => (
              <li className="mb-[6px] text-theme-subtext1" key={link}>
                {link === "Home" ? (
                  <a href="/">{link}</a>
                ) : link === "Single Post" ? (
                  <a href={`/blog/${advertiseId}`}>{link}</a>
                ) : (
                  <a href={`#${link.toLowerCase()}`}>{link}</a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Categories Section */}
        <nav aria-label="Categories">
          <ul>
            <h3 className="mb-6 font-semibold">Category</h3>
            {category.map((cat) => (
              <li className="mb-[6px] text-theme-subtext1" key={cat}>
                {cat}
              </li>
            ))}
          </ul>
        </nav>

        {/* Newsletter Section */}
        <section className="flex w-[392px] flex-col gap-2 rounded-xl bg-theme-fcard px-[30px] py-8 text-center font-work">
          <h2 className="font-semibold">Weekly Newsletter</h2>
          <p className="mb-[22px] text-theme-subtext2">
            Get blog articles and offers via email
          </p>
          <div className="relative flex items-center">
            <input
              className="form-input py-3 pl-4 pr-9"
              placeholder="Your Email"
              type="email"
              aria-label="Enter your email"
            />
            <EnvelopeIcon className="pointer-events-none absolute inset-y-0 right-4 top-1/2 flex h-5 w-5 -translate-y-1/2 text-[#696A75]" />
          </div>
          <Button className="bg-blue w-full text-center" aria-disabled>
            Subscribe
          </Button>
        </section>
      </div>

      {/* Footer Bottom Section */}
      <div className="max-container flex w-[100%] justify-between gap-6 border-t border-theme-fborder py-8 max-md:flex-col max-md:items-center">
        <Logo footer={true} />
        <nav
          aria-label="Policies"
          className="flex list-none items-center gap-4 text-theme-subtext1"
        >
          {policys.map((policy, index) => (
            <Fragment key={index}>
              <li>{policy}</li>
              {index < policys.length - 1 && (
                <hr className="h-6 w-px bg-secondary-100" />
              )}
            </Fragment>
          ))}
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
