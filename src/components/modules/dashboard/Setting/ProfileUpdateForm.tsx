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
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import UserImagePreviewer from "@/components/ui/core/UserImageUploder/UserImagePreviewer";
import UserImageUploader from "@/components/ui/core/UserImageUploder/UserImageUploader";
import { updateProfile } from "@/services/User";
import { updateProfileSchema } from "../../auth/register/registerValidation";
import { TGetMyInfo } from "@/types";

export default function H({
  userIfo,
}: {
  userIfo: TGetMyInfo;
}) {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[]>(
    userIfo.profilePhoto ? [userIfo.profilePhoto] : []
  );

  const form = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: userIfo?.name || "",
      email: userIfo?.email || "",
      contactNumber: userIfo?.contactNumber || "",
      gender: userIfo?.gender || undefined,
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const { setIsLoading } = useUser();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {

    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      formData.append("file", imageFiles[0]);
      const res = await updateProfile(formData);

      setIsLoading(true);
      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const genderOptions = [
    { value: "MALE", label: "Male" },
    { value: "FEMALE", label: "Female" },
    { value: "OTHER", label: "Other" },
  ];

  return (
    <Card className="w-full max-w-5xl mx-auto mt-6 shadow-lg rounded-xl overflow-hidden">
      <CardHeader className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Profile Update
        </h1>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-x-4">
              <div className="w-full">
              <div className="flex gap-4">
              {imagePreview.length > 0 ? (
                <UserImagePreviewer
                  imagePreview={imagePreview}
                  setImageFiles={setImageFiles}
                  setImagePreview={setImagePreview}
                  className="mt-1 w-full"
                />
              ) : (
                <UserImageUploader
                  setImagePreview={setImagePreview}
                  setImageFiles={setImageFiles}
                  label="Upload Logo"
                />
              )}
            </div>
              </div>
              <div className="w-full flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                        disabled={true}
                          type="email"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>gender</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {genderOptions.map((gender) => (
                            <SelectItem
                              key={gender?.value}
                              value={gender?.value}
                            >
                              {gender?.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button type="submit" className="mt-5 w-full">
              {isSubmitting ? "Updating...." : "Update"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
