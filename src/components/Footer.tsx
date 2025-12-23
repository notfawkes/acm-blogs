import { MapPin, Mail, Phone } from "lucide-react";
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";


export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border/30 py-12 px-8">
      {/* Map Section */}
      <div className="mapcontainer w-full flex justify-center py-10 bg-background">
        <div className="w-[90%] md:w-[80%] lg:w-[70%] overflow-hidden rounded-2xl shadow-lg border border-border">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2685.807415056768!2d72.87278298331742!3d19.20637003525048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b0e57647569d%3A0xc0aec329c82d3555!2sThakur%20College%20of%20Engineering%20and%20Technology!5e0!3m2!1sen!2sin!4v1725606742168!5m2!1sen!2sin"
            className="w-full h-[250px] sm:h-[300px] md:h-[350px] border-0 hover:scale-105 duration-500 transition-transform"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Thakur College of Engineering and Technology Map"
          ></iframe>
        </div>
      </div>

      {/* Footer Columns */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1: ACM SIGAI TCET */}
        <div>
          <h3 className="text-lg font-bold mb-4">ACM SIGAI TCET</h3>
          <p className="text-sm text-foreground/70 leading-relaxed">
            Special Interest Group on Artificial Intelligence at Thakur College of Engineering and Technology
          </p>
        </div>

        {/* Column 2: Pages */}
        <div>
          <h3 className="text-lg font-bold mb-4">Pages</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="https://acmsigai.tcetmumbai.in/" className="text-foreground/70 hover:text-accent transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="https://acmsigai.tcetmumbai.in/Events" className="text-foreground/70 hover:text-accent transition-colors">
                Events
              </a>
            </li>
            <li>
              <a href="https://acmsigai.tcetmumbai.in/Our-Team" className="text-foreground/70 hover:text-accent transition-colors">
                Team
              </a>
            </li>
            <li>
              <a href="https://acmsigai.tcetmumbai.in/Publications" className="text-foreground/70 hover:text-accent transition-colors">
                Publications
              </a>
            </li>
            <li>
              <a href="https://acmsigai.tcetmumbai.in/Blogs" className="text-foreground/70 hover:text-accent transition-colors">
                Blogs
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div>
          <h3 className="text-lg font-bold mb-4">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span className="text-foreground/70">Thakur College, Mumbai</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 flex-shrink-0" />
              <span className="text-foreground/70">acmsigai10@gmail.com</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span className="text-foreground/70">+91 93265 90260</span>
            </li>
          </ul>
        </div>

        {/* Column 4: Social Media */}
        <div>
          <h3 className="text-lg font-bold mb-4">Follow Us</h3>
          <div className="flex gap-3">
            <a
              href="https://www.instagram.com/tcet_acm.sigai?igsh=aHI0aXh4emQ4dmNp"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-accent transition-colors hover:bg-pink-500"
            >
              <FaInstagram className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/SIG-AI-OpenSource"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-accent transition-colors hover:bg-gray-700"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/company/tcet-acm-sigai/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-accent transition-colors hover:bg-blue-600"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};
