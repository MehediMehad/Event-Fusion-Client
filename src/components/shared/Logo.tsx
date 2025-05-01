import Image from "next/image";
import logo from '../../assets/logo.png'

export default function Logo() {
  return (
    <div className="group flex justify-center items-center gap-2">
      {/* Logo with gradient effect */}
      <div className="flex h-14 w-14 items-center justify-center rounded-lg p-2 transition-all duration-300 group-hover:rotate-12">
        <Image
          src={logo} // Use a simple SVG icon
          alt="Event Fusion Logo"
          width={50}
          height={50}
          className="h-14 w-14 object-contain"
        />
      </div>
      
      {/* Text with gradient */}
      <div className="flex flex-col mt-3">
        <span className="text-primary text-xl font-bold">
          Event Fusion
        </span>
        <span className="text-xs text-[#2f2166] dark:text-[#C4B6FF]">
          Uniting Experiences
        </span>
      </div>
    </div>
  );
}