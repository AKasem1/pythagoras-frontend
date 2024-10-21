import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import {
    FiInstagram,
    FiFacebook,
} from "react-icons/fi";


const socialLinks = [
    {
        id: 1,
        icon: <FiFacebook />,
        url: "https://www.facebook.com/",
        className: "facebook",
    },
    {
        id: 2,
        icon: <FiInstagram />,
        url: "https://instagram.com/",
        className: "instagram",
    },
    {
        id: 3,
        icon: <FontAwesomeIcon icon={faWhatsapp} />,
        url: "https://whatsapp.com/",
        className: "whatsapp",
    },
    {
        id: 4,
        icon: <FontAwesomeIcon icon={faXTwitter} />,
        url: "https://twitter.com/",
        className: "twitter",
    }
];

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-container">
                <div className="font-general-regular flex flex-col justify-center items-center mb-12 sm:mb-28">
                    <p className="powered-by">
                        <a href="https://www.facebook.com/DotCom.Print" target="_blank" rel="noopener noreferrer"
                        style={{textDecoration: "none"}}>
                        <h2 style={{fontSize: "22px", textDecoration: "none", color:"white", marginTop:"12px"}}>Branding Media</h2>
                        </a>
                        Powered by
                    </p>
                    <p className="contact-us">
                            تواصل معنا
                    </p>
                    <ul className="social-links flex gap-4 sm:gap-8">
                        {socialLinks.map((link) => (
                            <a
                                href={link.url}
                                target="__blank"
                                key={link.id}
                                className={link.className}
                            >
                                <i >{link.icon}</i>
                            </a>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Footer;
