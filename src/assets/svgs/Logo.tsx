import Image from "next/image";
import logo from '../logo.png'

export default function Logo() {
  return (
    <div className="group flex justify-center items-center gap-2">
      {/* Logo with gradient effect */}
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-2 transition-all duration-300 group-hover:rotate-12">
        <Image
          src={logo} // Use a simple SVG icon
          alt="Event Fusion Logo"
          width={50}
          height={50}
          className="h-12 w-12 object-contain invert"
        />
      </div>
      
      {/* Text with gradient */}
      <div className="flex flex-col mt-3">
        <span className="text-primary text-xl font-bold">
          Event Fusion
        </span>
        <span className="text-xs text-[#C4B6FF] dark:text-[#C4B6FF]">
          Uniting Experiences
        </span>
      </div>
    </div>
  );
}