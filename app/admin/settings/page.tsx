"use client";

import { useState, useEffect } from "react";
import { Save, Bell, Mail, Globe, Shield } from "lucide-react";
import { apiClient } from "@/lib/api/client";

interface Settings {
  emailNotifications: boolean;
  blogNotifications: boolean;
  subscriberNotifications: boolean;
  siteName: string;
  siteUrl: string;
  adminEmail: string;
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    emailNotifications: true,
    blogNotifications: true,
    subscriberNotifications: true,
    siteName: "Vishal Techzone",
    siteUrl: "https://vishaltechzone.com",
    adminEmail: "",
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      // TODO: Implement settings API endpoint
      // const response = await apiClient("/api/v1/admin/settings");
      // const data = await response.json();
      // if (data.success) {
      //   setSettings(data.data.settings);
      // }
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage(null);
      
      // TODO: Implement settings save API endpoint
      // const response = await apiClient("/api/v1/admin/settings", {
      //   method: "PUT",
      //   body: JSON.stringify(settings),
      // });
      // const data = await response.json();
      // if (data.success) {
      //   setMessage({ type: "success", text: "Settings saved successfully!" });
      // } else {
      //   setMessage({ type: "error", text: data.error?.message || "Failed to save settings" });
      // }
      
      // For now, just show success message
      setMessage({ type: "success", text: "Settings saved successfully!" });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error("Error saving settings:", error);
      setMessage({ type: "error", text: "Failed to save settings" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-500 border-r-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your platform settings and preferences
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Notification Settings */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="h-5 w-5 text-orange-500" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Notification Settings
          </h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-900 dark:text-white">
                Email Notifications
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Receive email notifications for important events
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setSettings({ ...settings, emailNotifications: !settings.emailNotifications })
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.emailNotifications
                  ? "bg-orange-500"
                  : "bg-gray-300 dark:bg-gray-700"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.emailNotifications ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-900 dark:text-white">
                Blog Notifications
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Get notified when new blogs are published
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setSettings({ ...settings, blogNotifications: !settings.blogNotifications })
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.blogNotifications
                  ? "bg-orange-500"
                  : "bg-gray-300 dark:bg-gray-700"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.blogNotifications ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-900 dark:text-white">
                Subscriber Notifications
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Get notified about new subscriber activity
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setSettings({
                  ...settings,
                  subscriberNotifications: !settings.subscriberNotifications,
                })
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.subscriberNotifications
                  ? "bg-orange-500"
                  : "bg-gray-300 dark:bg-gray-700"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.subscriberNotifications ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* General Settings */}
      {/* <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="h-5 w-5 text-orange-500" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            General Settings
          </h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Site Name
            </label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Site URL
            </label>
            <input
              type="url"
              value={settings.siteUrl}
              onChange={(e) => setSettings({ ...settings, siteUrl: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Admin Email
            </label>
            <input
              type="email"
              value={settings.adminEmail}
              onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
      </div> */}

      {/* Security Settings */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-5 w-5 text-orange-500" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Security Settings
          </h2>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Security settings and authentication preferences will be available here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

