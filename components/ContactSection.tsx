import { Github, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import signDocIllustration from "../assets/img/svg/Signdoc Illustration 3.svg";

const ContactSection = () => {
  const socials = [
    {
      name: "github",
      icon: <Github className="icon" />,
      url: "https://github.com/Dropbox-API-Team",
    },
    {
      name: "twitter",
      icon: <Twitter className="icon" />,
      url: "https://twitter.com/DropboxAPI",
    },
    {
      name: "linkedin",
      icon: <Linkedin className="icon" />,
      url: "https://www.linkedin.com/company/dropbox-api",
    },
  ];
  return (
    <section className="contact-section site-section">
      <div className="wrapper ">
        <div className="contact-section__text-cont">
          <header className="site-section__header">
            <h2 className="site-section__title">Get In Touch</h2>
          </header>

          <h3 className="site-section__description mb-4">Reach out to us.</h3>
          <ul className="socials ">
            {socials.map((social) => (
              <li key={social.name} className="socials__item">
                <a
                  className="btn"
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="contact-section__media-cont ">
          <Image
            src={signDocIllustration}
            alt="logo"
            width={500}
            height={48}
            className=""
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
