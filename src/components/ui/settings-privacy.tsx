"use client";

import { useState } from "react";

export function SettingsPrivacy() {
  const [improveAI, setImproveAI] = useState(true);
  const [locationMetadata, setLocationMetadata] = useState(false);

  return (
    <div className="flex-1 py-8 px-4 md:px-12 md:py-10 overflow-y-auto w-full max-w-[896px]">
      <div className="mb-12">
        <p className="text-text-secondary">Manage how Oni handles your data and personalizes your experience.</p>
      </div>

      <div className="flex flex-col gap-16">
        {/* Data Usage Section */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b border-surface-container-high pb-4">
            <span className="material-symbols-outlined text-text-tertiary text-[24px]">database</span>
            <h3 className="text-xl font-serif text-text-primary tracking-wide">Data Usage</h3>
          </div>

          <div className="flex items-start justify-between gap-8 p-6 rounded-2xl bg-surface border border-outline-variant hover:border-surface-container-highest transition-colors">
            <div className="space-y-2">
              <h4 className="text-base font-medium text-primary">Improve AI models</h4>
              <p className="text-xs text-text-secondary leading-relaxed font-normal normal-case">
                Allow Oni to use your conversation history to train and improve our models. This helps us provide better,
                more accurate responses over time. Your data is anonymized before use.
              </p>
            </div>
            <div className="flex-shrink-0 mt-1">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={improveAI}
                  onChange={(e) => setImproveAI(e.target.checked)}
                  className="sr-only peer cursor-pointer"
                />
                <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-text-secondary after:border-text-secondary after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-outline-variant peer-checked:after:bg-primary"></div>
              </label>
            </div>
          </div>
        </section>

        {/* Personalization Section */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b border-surface-container-high pb-4">
            <span className="material-symbols-outlined text-text-tertiary text-[24px]">person</span>
            <h3 className="text-xl font-serif text-text-primary tracking-wide">Personalization</h3>
          </div>

          <div className="flex items-start justify-between gap-8 p-6 rounded-2xl bg-surface border border-outline-variant hover:border-surface-container-highest transition-colors">
            <div className="space-y-2">
              <h4 className="text-base font-medium text-primary">Course location metadata</h4>
              <p className="text-xs text-text-secondary leading-relaxed font-normal normal-case">
                Permit Oni to analyze your geographic location data (city/region) to provide contextually relevant answers,
                local time conversions, and location-aware formatting.
              </p>
            </div>
            <div className="flex-shrink-0 mt-1">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={locationMetadata}
                  onChange={(e) => setLocationMetadata(e.target.checked)}
                  className="sr-only peer cursor-pointer"
                />
                <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-text-secondary after:border-text-secondary after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-outline-variant peer-checked:after:bg-primary"></div>
              </label>
            </div>
          </div>
        </section>

        {/* Data Export Section */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b border-surface-container-high pb-4">
            <span className="material-symbols-outlined text-text-tertiary text-[24px]">download</span>
            <h3 className="text-xl font-serif text-text-primary tracking-wide">Data Export</h3>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 rounded-2xl bg-surface-container-low border border-surface-container-high">
            <div className="space-y-2">
              <h4 className="text-base font-medium text-primary">Export Workspace Data</h4>
              <p className="text-xs text-text-secondary leading-relaxed font-normal normal-case max-w-md">
                Request an archive of your account information, chat history, and uploaded files. The export process may
                take several hours depending on your usage.
              </p>
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-surface border border-outline-variant hover:border-primary text-primary rounded-xl transition-colors shrink-0 group focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer">
              <span className="material-symbols-outlined text-[18px] group-hover:text-primary transition-colors">
                cloud_download
              </span>
              <span className="text-xs font-semibold tracking-wider uppercase">Download your data</span>
            </button>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="space-y-6 pt-8 mt-12 border-t border-error-container/30">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 rounded-2xl bg-[#1a0a0b] border border-error-container/50">
            <div className="space-y-2">
              <h4 className="text-base font-medium text-error">Delete Account</h4>
              <p className="text-xs text-text-tertiary leading-relaxed font-normal normal-case max-w-md">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-transparent border border-error/30 hover:border-error hover:bg-error/10 text-error rounded-xl transition-all shrink-0 focus:outline-none focus:ring-1 focus:ring-error cursor-pointer">
              <span className="text-xs font-semibold tracking-wider uppercase">Delete Account</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
