"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import NMImageUploader from "@/components/ui/core/NMImageUploader";
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer";
import { Plus } from "lucide-react";
import Logo from "@/assets/svgs/Logo";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IBrand, ICategory } from "@/types";
import { getAllCategories } from "@/services/Category";
import { getAllBrands } from "@/services/Brand";
import { addProduct } from "@/services/Product";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AddProductsForm() {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const [categories, setCategories] = useState<ICategory[] | []>([]);
  const [brands, setBrands] = useState<IBrand[] | []>([]);

  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      category: "",
      brand: "",
      stock: "",
      weight: "",
      availableColors: [{ value: "" }],
      keyFeatures: [{ value: "" }],
      specification: [{ key: "", value: "" }],
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const { append: appendColor, fields: colorFields } = useFieldArray({
    control: form.control,
    name: "availableColors",
  });

  const addColor = () => {
    appendColor({ value: "" });
  };

  const { append: appendFeatures, fields: featureFields } = useFieldArray({
    control: form.control,
    name: "keyFeatures",
  });

  const addFeatures = () => {
    appendFeatures({ value: "" });
  };

  const { append: appendSpec, fields: specFields } = useFieldArray({
    control: form.control,
    name: "specification",
  });

  const addSpec = () => {
    appendSpec({ key: "", value: "" });
  };

  // console.log(specFields);

  useEffect(() => {
    const fetchData = async () => {
      const [categoriesData, brandsData] = await Promise.all([
        getAllCategories(),
        getAllBrands(),
      ]);

      setCategories(categoriesData?.data);
      setBrands(brandsData?.data);
    };

    fetchData();
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const availableColors = data.availableColors.map(
      (color: { value: string }) => color.value
    );

    const keyFeatures = data.keyFeatures.map(
      (feature: { value: string }) => feature.value
    );

    const specification: { [key: string]: string } = {};
    data.specification.forEach(
      (item: { key: string; value: string }) =>
        (specification[item.key] = item.value)
    );

    // console.log({ availableColors, keyFeatures, specification });

    const modifiedData = {
      ...data,
      availableColors,
      keyFeatures,
      specification,
      price: parseFloat(data.price),
      stock: parseInt(data.stock),
      weight: parseFloat(data.stock),
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(modifiedData));

    for (const file of imageFiles) {
      formData.append("images", file);
    }
    try {
      const res = await addProduct(formData);

      if (res.success) {
        toast.success(res.message);
        router.push("/user/shop/products");
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-2xl p-5 ">
      <div className="flex items-center space-x-4 mb-5 ">
        <Logo />

        <h1 className="text-xl font-bold">Add Product</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center border-t border-b py-3 my-5">
            <p className="text-primary font-bold text-xl">Basic Information</p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Product Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category?._id} value={category?._id}>
                          {category?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Product Brand" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {brands.map((brand) => (
                        <SelectItem key={brand?._id} value={brand?._id}>
                          {brand?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="my-5">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-36 resize-none"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <div className="flex justify-between items-center border-t border-b py-3 my-5">
              <p className="text-primary font-bold text-xl">Images</p>
            </div>
            <div className="flex gap-4 ">
              <NMImageUploader
                setImageFiles={setImageFiles}
                setImagePreview={setImagePreview}
                label="Upload Image"
                className="w-fit mt-0"
              />
              <ImagePreviewer
                className="flex flex-wrap gap-4"
                setImageFiles={setImageFiles}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center border-t border-b py-3 my-5">
              <p className="text-primary font-bold text-xl">Available Colors</p>
              <Button
                variant="outline"
                className="size-10"
                onClick={addColor}
                type="button"
              >
                <Plus className="text-primary" />
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {colorFields.map((colorField, index) => (
                <div key={colorField.id}>
                  <FormField
                    control={form.control}
                    name={`availableColors.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Color {index + 1}</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center border-t border-b py-3 my-5">
              <p className="text-primary font-bold text-xl">Key Features</p>
              <Button
                onClick={addFeatures}
                variant="outline"
                className="size-10"
                type="button"
              >
                <Plus className="text-primary" />
              </Button>
            </div>

            <div className="my-5">
              {featureFields.map((featureField, index) => (
                <div key={featureField.id}>
                  <FormField
                    control={form.control}
                    name={`keyFeatures.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Key Feature {index + 1}</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center border-t border-b py-3 my-5">
              <p className="text-primary font-bold text-xl">Specification</p>
              <Button
                onClick={addSpec}
                variant="outline"
                className="size-10"
                type="button"
              >
                <Plus className="text-primary" />
              </Button>
            </div>

            {specFields.map((specField, index) => (
              <div
                key={specField.id}
                className="grid grid-cols-1 gap-4 md:grid-cols-2 my-5"
              >
                <FormField
                  control={form.control}
                  name={`specification.${index}.key`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Feature name {index + 1}</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`specification.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Feature Description {index + 1}</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>

          <Button type="submit" className="mt-5 w-full" disabled={isSubmitting}>
            {isSubmitting ? "Adding Product....." : "Add Product"}
          </Button>
        </form>
      </Form>
    </div>
  );
}



// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { DollarSign, Calendar1Icon } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
// import { Switch } from "@/components/ui/switch";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Calendar } from "@/components/ui/calendar";
// import { cn } from "@/lib/utils";
// import { format } from "date-fns";
// import NMProfileUploader from "@/components/modules/auth/register/NMProfileUploader";
// import ProfilePreviewer from "@/components/modules/auth/register/ProfilePreviewer";

// const eventFormSchema = z.object({
//   title: z.string().min(3, {
//     message: "Title must be at least 3 characters.",
//   }),
//   description: z.string().min(10, {
//     message: "Description must be at least 10 characters.",
//   }),
//   date: z.date({
//     required_error: "Event date is required.",
//   }),
//   time: z.date({
//     required_error: "Event time is required.",
//   }),
//   venue: z.string().min(3, {
//     message: "Venue must be at least 3 characters.",
//   }),
//   location: z.string().min(3, {
//     message: "Location must be at least 3 characters.",
//   }),
//   is_public: z.boolean().default(true),
//   is_paid: z.boolean().default(false),
//   registration_fee: z.string().optional(),
// });

// type EventFormValues = z.infer<typeof eventFormSchema>;

// export default function EventForm() {
//   const [imageFiles, setImageFiles] = useState<File[] | []>([]);
//   console.log(imageFiles);

//   const [imagePreview, setImagePreview] = useState<string[] | []>([]);
//   const router = useRouter();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [notification, setNotification] = useState<{
//     type: "success" | "error";
//     message: string;
//   } | null>(null);

//   const defaultValues: Partial<EventFormValues> = {
//     title: "",
//     description: "",
//     is_public: true,
//     is_paid: false,
//     time: new Date(),
//   };

//   const form = useForm<EventFormValues>({
//     resolver: zodResolver(eventFormSchema),
//     defaultValues,
//   });

//   const isPaid = form.watch("is_paid");

//   async function onSubmit(data: EventFormValues) {
//     setIsSubmitting(true);
//     setNotification(null);
    
//     try {
//       // Format the data to match the required JSON structure
//       const formattedData = {
//         title: data.title,
//         description: data.description,
//         date_time: data.time.toISOString(),
//         venue: data.venue,
//         location: data.location,
//         is_public: data.is_public,
//         is_paid: data.is_paid,
//         registration_fee: data.is_paid
//           ? Number.parseInt(data.registration_fee || "0")
//           : 0,
//       };

//       console.log({formattedData});

//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       setNotification({
//         type: "success",
//         message: "Event created successfully!",
//       });

//       // Redirect to the events page or the newly created event
//       // router.push("/events")
//     } catch (error) {
//       setNotification({
//         type: "error",
//         message: "There was an error creating your event. Please try again.",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   }

//   function handleDateSelect(date: Date | undefined) {
//     if (date) {
//       // Merge with existing time if available
//       const currentTime = form.getValues("time") || new Date();
//       const newDateTime = new Date(date);
//       newDateTime.setHours(
//         currentTime.getHours(),
//         currentTime.getMinutes(),
//         currentTime.getSeconds()
//       );
//       form.setValue("time", newDateTime);
//     }
//   }

//   function handleTimeChange(type: "hour" | "minute" | "ampm", value: string) {
//     const currentTime = form.getValues("time") || new Date();
//     const newTime = new Date(currentTime);

//     if (type === "hour") {
//       const hour = parseInt(value, 10);
//       const isPM = newTime.getHours() >= 12;
//       newTime.setHours(isPM ? hour + 12 : hour);
//     } else if (type === "minute") {
//       newTime.setMinutes(parseInt(value, 10));
//     } else if (type === "ampm") {
//       const hours = newTime.getHours();
//       if (value === "AM" && hours >= 12) {
//         newTime.setHours(hours - 12);
//       } else if (value === "PM" && hours < 12) {
//         newTime.setHours(hours + 12);
//       }
//     }

//     form.setValue("time", newTime);
//   }

//   return (
//     <Card>
//       <CardContent className="pt-6">
//         {notification && (
//           <div
//             className={`mb-6 p-4 rounded-md ${
//               notification.type === "success"
//                 ? "bg-green-50 text-green-800 border border-green-200"
//                 : "bg-red-50 text-red-800 border border-red-200"
//             }`}
//           >
//             {notification.message}
//           </div>
//         )}

//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             <div className="w-full">
//               <div className="flex justify-between items-center border-t border-b py-3">
//                 <FormLabel>Image</FormLabel>
//               </div>
//               <div className="flex gap-4 ">
//                 {imageFiles.length !== 1 && (
//                   <NMProfileUploader
//                     setImageFiles={setImageFiles}
//                     setImagePreview={setImagePreview}
//                     label="Upload Image"
//                     className="mt-1 w-full"
//                   />
//                 )}
//                 <ProfilePreviewer
//                   className="flex flex-wrap gap-4"
//                   setImageFiles={setImageFiles}
//                   imagePreview={imagePreview}
//                   setImagePreview={setImagePreview}
//                 />
//               </div>
//             </div>
//             <FormField
//               control={form.control}
//               name="title"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Event Title</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Enter event title" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
//               <FormField
//                 control={form.control}
//                 name="time"
//                 render={({ field }) => (
//                   <FormItem className="flex flex-col">
//                     <FormLabel>Enter your date & time (12h)</FormLabel>
//                     <Popover>
//                       <PopoverTrigger asChild>
//                         <FormControl>
//                           <Button
//                             variant={"outline"}
//                             className={cn(
//                               "w-full pl-3 text-left font-normal",
//                               !field.value && "text-muted-foreground"
//                             )}
//                           >
//                             {field.value ? (
//                               format(field.value, "MM/dd/yyyy hh:mm aa")
//                             ) : (
//                               <span>MM/DD/YYYY hh:mm aa</span>
//                             )}
//                             <Calendar1Icon className="ml-auto h-4 w-4 opacity-50" />
//                           </Button>
//                         </FormControl>
//                       </PopoverTrigger>
//                       <PopoverContent className="w-auto p-0">
//                         <div className="sm:flex">
//                           <Calendar
//                             mode="single"
//                             selected={field.value}
//                             onSelect={handleDateSelect}
//                             initialFocus
//                           />
//                           <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
//                             <ScrollArea className="w-64 sm:w-auto">
//                               <div className="flex sm:flex-col p-2">
//                                 {Array.from({ length: 12 }, (_, i) => i + 1)
//                                   .reverse()
//                                   .map((hour) => (
//                                     <Button
//                                       key={hour}
//                                       size="icon"
//                                       variant={
//                                         field.value &&
//                                         field.value.getHours() % 12 ===
//                                           hour % 12
//                                           ? "default"
//                                           : "ghost"
//                                       }
//                                       className="sm:w-full shrink-0 aspect-square"
//                                       onClick={() =>
//                                         handleTimeChange(
//                                           "hour",
//                                           hour.toString()
//                                         )
//                                       }
//                                     >
//                                       {hour}
//                                     </Button>
//                                   ))}
//                               </div>
//                               <ScrollBar
//                                 orientation="horizontal"
//                                 className="sm:hidden"
//                               />
//                             </ScrollArea>
//                             <ScrollArea className="w-64 sm:w-auto">
//                               <div className="flex sm:flex-col p-2">
//                                 {Array.from(
//                                   { length: 12 },
//                                   (_, i) => i * 5
//                                 ).map((minute) => (
//                                   <Button
//                                     key={minute}
//                                     size="icon"
//                                     variant={
//                                       field.value &&
//                                       field.value.getMinutes() === minute
//                                         ? "default"
//                                         : "ghost"
//                                     }
//                                     className="sm:w-full shrink-0 aspect-square"
//                                     onClick={() =>
//                                       handleTimeChange(
//                                         "minute",
//                                         minute.toString()
//                                       )
//                                     }
//                                   >
//                                     {minute.toString().padStart(2, "0")}
//                                   </Button>
//                                 ))}
//                               </div>
//                               <ScrollBar
//                                 orientation="horizontal"
//                                 className="sm:hidden"
//                               />
//                             </ScrollArea>
//                             <ScrollArea className="">
//                               <div className="flex sm:flex-col p-2">
//                                 {["AM", "PM"].map((ampm) => (
//                                   <Button
//                                     key={ampm}
//                                     size="icon"
//                                     variant={
//                                       field.value &&
//                                       ((ampm === "AM" &&
//                                         field.value.getHours() < 12) ||
//                                         (ampm === "PM" &&
//                                           field.value.getHours() >= 12))
//                                         ? "default"
//                                         : "ghost"
//                                     }
//                                     className="sm:w-full shrink-0 aspect-square"
//                                     onClick={() =>
//                                       handleTimeChange("ampm", ampm)
//                                     }
//                                   >
//                                     {ampm}
//                                   </Button>
//                                 ))}
//                               </div>
//                             </ScrollArea>
//                           </div>
//                         </div>
//                       </PopoverContent>
//                     </Popover>
//                     <FormDescription>
//                       Please select your preferred date and time.
//                     </FormDescription>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             <FormField
//               control={form.control}
//               name="description"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Event Description</FormLabel>
//                   <FormControl>
//                     <Textarea
//                       placeholder="Describe your event..."
//                       className="min-h-[120px]"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <FormField
//                 control={form.control}
//                 name="venue"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Venue</FormLabel>
//                     <FormControl>
//                       <div className="flex items-center">
//                         <Input placeholder="Enter venue name" {...field} />
//                       </div>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="location"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Location</FormLabel>
//                     <FormControl>
//                       <div className="flex items-center">
//                         <Input
//                           placeholder="Enter location (city, country)"
//                           {...field}
//                         />
//                       </div>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <FormField
//                 control={form.control}
//                 name="is_public"
//                 render={({ field }) => (
//                   <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
//                     <div className="space-y-0.5">
//                       <FormLabel className="text-base">Public Event</FormLabel>
//                       <FormDescription>
//                         Make this event visible to everyone
//                       </FormDescription>
//                     </div>
//                     <FormControl>
//                       <Switch
//                         checked={field.value}
//                         onCheckedChange={field.onChange}
//                       />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="is_paid"
//                 render={({ field }) => (
//                   <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
//                     <div className="space-y-0.5">
//                       <FormLabel className="text-base">Paid Event</FormLabel>
//                       <FormDescription>
//                         Charge participants to join your event
//                       </FormDescription>
//                     </div>
//                     <FormControl>
//                       <Switch
//                         checked={field.value}
//                         onCheckedChange={field.onChange}
//                       />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />
//             </div>

//             {isPaid && (
//               <FormField
//                 control={form.control}
//                 name="registration_fee"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Registration Fee (BDT)</FormLabel>
//                     <FormControl>
//                       <div className="flex items-center">
//                         <Input
//                           type="number"
//                           placeholder="Enter amount"
//                           {...field}
//                         />
//                         <DollarSign className="ml-2 h-4 w-4 text-muted-foreground" />
//                       </div>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             )}

//             <div className="flex justify-end space-x-4 pt-4">
//               <Button
//                 variant="outline"
//                 type="button"
//                 onClick={() => router.back()}
//               >
//                 Cancel
//               </Button>
//               <Button type="submit" disabled={isSubmitting}>
//                 {isSubmitting ? "Creating..." : "Create Event"}
//               </Button>
//             </div>
//           </form>
//         </Form>
//       </CardContent>
//     </Card>
//   );
// }
