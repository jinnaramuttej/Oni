"use client";

import { useState } from "react";

export function SettingsCapabilities() {
  const [longTermContext, setLongTermContext] = useState(true);
  const [webSearch, setWebSearch] = useState(true);
  const [codeInterpreter, setCodeInterpreter] = useState(true);
  const [imageGen, setImageGen] = useState(false);
  const [defaultModel, setDefaultModel] = useState("oni-pro");

  return (
    <div className="flex-1 py-8 px-4 md:px-12 md:py-10 overflow-y-auto w-full max-w-[896px]">
      <div className="mb-12">
        <p className="text-text-secondary">
          Configure AI behavior, tool access, and underlying models to tailor Oni to your specific workflow.
        </p>
      </div>

      <div className="flex flex-col gap-12">
        {/* AI Memory Section */}
        <section className="border border-outline-variant rounded-2xl bg-surface-container-low p-6 md:p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center shrink-0 border border-outline-variant">
              <span className="material-symbols-outlined text-primary">memory</span>
            </div>
            <div>
              <h3 className="font-serif text-[22px] leading-tight text-primary mb-1">AI Memory</h3>
              <p className="text-text-tertiary text-sm">Control how Oni retains context across sessions.</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-t border-outline-variant/50">
              <div className="pr-4">
                <h4 className="text-xs font-semibold tracking-wider text-primary uppercase mb-1">
                  Long-term context
                </h4>
                <p className="text-text-tertiary text-xs">
                  Allow Oni to remember preferences, project details, and recurring themes across different chats.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={longTermContext}
                  onChange={(e) => setLongTermContext(e.target.checked)}
                  className="sr-only peer cursor-pointer"
                />
                <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-text-secondary after:border-text-secondary after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-outline-variant peer-checked:after:bg-primary"></div>
              </label>
            </div>
            <div className="pt-2">
              <button className="text-xs text-text-tertiary hover:text-primary transition-colors flex items-center gap-1 group cursor-pointer bg-transparent border-none">
                <span>Manage Memory Details</span>
                <span className="material-symbols-outlined text-[14px] group-hover:translate-x-0.5 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Tool Access Section */}
        <section className="border border-outline-variant rounded-2xl bg-surface-container-low p-6 md:p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center shrink-0 border border-outline-variant">
              <span className="material-symbols-outlined text-primary">construction</span>
            </div>
            <div>
              <h3 className="font-serif text-[22px] leading-tight text-primary mb-1">Tool Access</h3>
              <p className="text-text-tertiary text-sm">Enable specialized capabilities for complex tasks.</p>
            </div>
          </div>
          <div className="space-y-1">
            {/* Toggle Item: Web Search */}
            <div className="flex items-center justify-between py-4 border-t border-outline-variant/50">
              <div className="flex items-center gap-3 pr-4">
                <span className="material-symbols-outlined text-text-secondary text-[20px]">language</span>
                <div>
                  <h4 className="text-xs font-semibold tracking-wider text-primary uppercase mb-0.5">
                    Web Search
                  </h4>
                  <p className="text-text-tertiary text-xs">Access real-time information and current events.</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={webSearch}
                  onChange={(e) => setWebSearch(e.target.checked)}
                  className="sr-only peer cursor-pointer"
                />
                <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-text-secondary after:border-text-secondary after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-outline-variant peer-checked:after:bg-primary"></div>
              </label>
            </div>

            {/* Toggle Item: Code Interpreter */}
            <div className="flex items-center justify-between py-4 border-t border-outline-variant/50">
              <div className="flex items-center gap-3 pr-4">
                <span className="material-symbols-outlined text-text-secondary text-[20px]">code</span>
                <div>
                  <h4 className="text-xs font-semibold tracking-wider text-primary uppercase mb-0.5">
                    Code Interpreter
                  </h4>
                  <p className="text-text-tertiary text-xs">Execute Python code, analyze data, and generate charts.</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={codeInterpreter}
                  onChange={(e) => setCodeInterpreter(e.target.checked)}
                  className="sr-only peer cursor-pointer"
                />
                <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-text-secondary after:border-text-secondary after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-outline-variant peer-checked:after:bg-primary"></div>
              </label>
            </div>

            {/* Toggle Item: Image Gen */}
            <div className="flex items-center justify-between py-4 border-t border-outline-variant/50">
              <div className="flex items-center gap-3 pr-4">
                <span className="material-symbols-outlined text-text-secondary text-[20px]">image</span>
                <div>
                  <h4 className="text-xs font-semibold tracking-wider text-primary uppercase mb-0.5">
                    Image Generation
                  </h4>
                  <p className="text-text-tertiary text-xs">Create visuals and concept art directly in chat.</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={imageGen}
                  onChange={(e) => setImageGen(e.target.checked)}
                  className="sr-only peer cursor-pointer"
                />
                <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-text-secondary after:border-text-secondary after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-outline-variant peer-checked:after:bg-primary"></div>
              </label>
            </div>
          </div>
        </section>

        {/* Model Selection Section */}
        <section className="border border-outline-variant rounded-2xl bg-surface-container-low p-6 md:p-8 mb-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center shrink-0 border border-outline-variant">
              <span className="material-symbols-outlined text-primary">psychology</span>
            </div>
            <div>
              <h3 className="font-serif text-[22px] leading-tight text-primary mb-1">Model Selection</h3>
              <p className="text-text-tertiary text-sm">
                Choose the underlying intelligence powering your workspace.
              </p>
            </div>
          </div>
          <div className="relative max-w-md">
            <label className="block text-[11px] font-semibold text-text-secondary mb-2 uppercase tracking-wider" htmlFor="model_select">
              Default Model
            </label>
            <div className="relative">
              <select
                value={defaultModel}
                onChange={(e) => setDefaultModel(e.target.value)}
                className="w-full appearance-none bg-surface border border-outline-variant text-primary py-3 pl-4 pr-10 rounded-xl focus:outline-none focus:border-text-secondary focus:ring-1 focus:ring-text-secondary transition-colors cursor-pointer"
                id="model_select"
              >
                <option value="oni-pro">Oni Pro (Recommended)</option>
                <option value="oni-flash">Oni Flash (Speed-optimized)</option>
                <option value="oni-creative">Oni Creative (Expanded Context)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-text-secondary">
                <span className="material-symbols-outlined text-[20px]">expand_more</span>
              </div>
            </div>
            <p className="mt-3 text-xs text-text-tertiary flex items-center gap-1.5 font-normal tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
              Pro plan models are currently active.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
