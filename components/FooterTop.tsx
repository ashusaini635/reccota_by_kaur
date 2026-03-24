import { Clock, Mail, MapPin, Phone } from "lucide-react";
import React from "react";

interface ContactItemData {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

const data: ContactItemData[] = [
  {
    title: "Visit Us",
    subtitle: "India",
    icon: (
      <MapPin className="w-5 h-5 text-accent-pink group-hover:text-white transition-colors duration-300" />
    ),
  },
  {
    title: "Call Us",
    subtitle: "+91 9876543210",
    icon: (
      <Phone className="w-5 h-5 text-accent-pink group-hover:text-white transition-colors duration-300" />
    ),
  },
  {
    title: "Working Hours",
    subtitle: "9:00 AM - 6:00 PM, Mon - Sun",
    icon: (
      <Clock className="w-5 h-5 text-accent-pink group-hover:text-white transition-colors duration-300" />
    ),
  },
  {
    title: "Email Us",
    subtitle: "reecota_by_kaur@gmail.com",
    icon: (
      <Mail className="w-5 h-5 text-accent-pink group-hover:text-white transition-colors duration-300" />
    ),
  },
];

const FooterTop = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 border-b border-accent-pink/10">
      {data?.map((item, index) => (
        <div key={index} className="flex items-center gap-4 group p-4 rounded-2xl hover:bg-white hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-accent-pink/20 hover:border-accent-pink/20">
          <div className="w-12 h-12 shrink-0 rounded-full bg-soft-pink/50 flex items-center justify-center group-hover:bg-accent-pink transition-colors duration-300">
            {item?.icon}
          </div>
          <div>
            <h3 className="font-bold text-darkColor text-sm uppercase tracking-widest group-hover:text-accent-pink transition-colors duration-300">
              {item?.title}
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              {item?.subtitle}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FooterTop;
