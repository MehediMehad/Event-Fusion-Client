"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";

type TImageUploader = {
  label?: string;
  className?: string;
  setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setImagePreview: React.Dispatch<React.SetStateAction<string[]>>;
};

const UpdateImageUploader = ({
  label = "Upload Images",
  className,
  setImageFiles,
  setImagePreview,
}: TImageUploader) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];

    setImageFiles((prev) => [...prev, file]);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview((prev) => [...prev, reader.result as string]);
      };

      reader.readAsDataURL(file);
    }

    event.target.value = "";
  };

  return (
<div className={cn("flex flex-col items-center justify-center gap-4 h-[300px] w-full", className)}>
      <Input
        id="image-upload"
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleImageChange}
      />
      <label
        htmlFor="image-upload"
        className="w-full h-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer text-center text-sm text-gray-500 hover:bg-gray-50 transition"
      >
        <div className="text-center flex items-center gap-2">
          <span className="block">Add Image</span>
          <ImageIcon className="mx-auto h-4 w-4" />
        </div>
      </label>
    </div>
  );
};

export default UpdateImageUploader;