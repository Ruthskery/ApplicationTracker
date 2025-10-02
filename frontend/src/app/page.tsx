import React from "react";
import { Briefcase, ListChecks, History, Bell } from "lucide-react";
import GoToSiteButton from "@/components/GoToSiteButton";

export default function JobTrackingSystem() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 p-6">
      <div className="p-8 max-w-3xl w-full bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Job Tracker
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
            Keep track of your job applications, stay organized, and never miss a follow-up.
          </p>
        </div>

        {/* Features Section */}
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Key Features
        </h2>
        <ul className="grid gap-4 md:grid-cols-2 text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
            <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0" />
            <span>Add and manage job applications</span>
          </li>
          <li className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
            <ListChecks className="w-6 h-6 text-green-600 dark:text-green-400 shrink-0" />
            <span>Track application status easily</span>
          </li>
          <li className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
            <Bell className="w-6 h-6 text-yellow-600 dark:text-yellow-400 shrink-0" />
            <span>Set reminders for follow-ups</span>
          </li>
          <li className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
            <History className="w-6 h-6 text-purple-600 dark:text-purple-400 shrink-0" />
            <span>View your full application history</span>
          </li>
        </ul>

        {/* Call to Action */}
        <div className="mt-8 flex flex-col items-center">
          <p className="mb-4 text-gray-700 dark:text-gray-300 text-center">
            Start by navigating to the <strong>Applications</strong> section and add your first job application!
          </p>
          <GoToSiteButton />
        </div>

        {/* Footer Note */}
        <p className="mt-8 text-sm text-center text-gray-500 dark:text-gray-400">
          ⚠️ Note: This is a demo application. All data is stored locally in your browser.
        </p>
      </div>
    </div>
  );
}
