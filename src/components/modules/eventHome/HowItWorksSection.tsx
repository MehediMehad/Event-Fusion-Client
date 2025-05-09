import { Calendar, MapPin, Users } from "lucide-react";

const HowItWorksSection = () => {
  return (
    <section className="w-full py-12 md:py-24 bg-gray-50 dark:bg-gray-900 my-20">
    <div className="container mx-auto px-4 md:px-6">
      <div className="flex flex-col items-center justify-between space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
          <p className="max-w-[700px] text-gray-500 dark:text-gray-400">
            Our platform makes event planning and participation simple
          </p>
        </div>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
            <Calendar className="h-8 w-8 text-purple-600 dark:text-purple-300" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Create Events</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Create public or private events with optional registration fees
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
            <MapPin className="h-8 w-8 text-blue-600 dark:text-blue-300" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Discover Events</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Browse and search for events that match your interests
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
            <Users className="h-8 w-8 text-green-600 dark:text-green-300" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Join & Participate</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Join public events instantly or request access to private events
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default HowItWorksSection;