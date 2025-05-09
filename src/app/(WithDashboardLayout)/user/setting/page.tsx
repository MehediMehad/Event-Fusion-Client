'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useUser } from '@/context/UserContext';
import { toast } from 'sonner';

const settingsSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters long',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

export default function DashboardSettingsPage() {
  const router = useRouter();
  const { user } = useUser()


  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      emailNotifications: true,
      pushNotifications: true,
    },
  });



  const onSubmit = (data: SettingsFormValues) => {
    // In a real app, make API call to update settings
    toast.success("Your settings have been successfully updated.");
  };

  return (
      <div className="grid gap-6 mx-10 mt-10">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>

        <div className="space-y-6">
          {/* <div>
            <h3 className="text-lg font-medium">Profile Settings</h3>
            <p className="text-sm text-muted-foreground">
              Update your personal information and how others see you on the site.
            </p>
          </div>
          <Separator /> */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
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
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Your email address is used for notifications and login.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              <div>
                <h3 className="text-lg font-medium">Notification Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Choose how you want to receive notifications.
                </p>
              </div>
              {/* <Separator /> */}

              <FormField
                control={form.control}
                name="emailNotifications"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Email Notifications
                      </FormLabel>
                      <FormDescription>
                        Receive email notifications about your events and
                        invitations.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pushNotifications"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Push Notifications
                      </FormLabel>
                      <FormDescription>
                        Receive push notifications in your browser.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="submit">Save Changes</Button>
            </form>
          </Form>
        </div>
      </div>
  );
}