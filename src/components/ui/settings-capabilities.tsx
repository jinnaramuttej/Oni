"use client";

import { useState, useEffect } from "react";

export function SettingsCapabilities() {
  const [longTermContext, setLongTermContext] = useState(true);
  const [webSearch, setWebSearch] = useState(true);
  const [codeInterpreter, setCodeInterpreter] = useState(true);
  const [imageGen, setImageGen] = useState(false);
  const [defaultModel, setDefaultModel] = useState("oni-pro");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("oni_settings");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.longTermContext !== undefined) setLongTermContext(!!parsed.longTermContext);
        if (parsed.webSearch !== undefined) setWebSearch(!!parsed.webSearch);
        if (parsed.codeInterpreter !== undefined) setCodeInterpreter(!!parsed.codeInterpreter);
        if (parsed.imageGen !== undefined) setImageGen(!!parsed.imageGen);
        if (parsed.defaultModel) setDefaultModel(parsed.defaultModel);
      }
    } catch {
      // ignore
    }
  }, []);

  const updateSetting = (key: string, value: any, successMessage?: string) => {
    try {
      const saved = localStorage.getItem("oni_settings") || "{}";
      const parsed = JSON.parse(saved);
      parsed[key] = value;
      localStorage.setItem("oni_settings", JSON.stringify(parsed));
      
      window.dispatchEvent(new Event("oni_settings_change"));
      
      if (successMessage) {
        window.dispatchEvent(new CustomEvent("oni_toast", { detail: successMessage }));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleLongTermContextChange = (checked: boolean) => {
    setLongTermContext(checked);
    updateSetting("longTermContext", checked, checked ? "AI Memory / Long-term context enabled" : "AI Memory / Long-term context disabled");
  };

  const handleWebSearchChange = (checked: boolean) => {
    setWebSearch(checked);
    updateSetting("webSearch", checked, checked ? "Web Search capability enabled" : "Web Search capability disabled");
  };

  const handleCodeInterpreterChange = (checked: boolean) => {
    setCodeInterpreter(checked);
    updateSetting("codeInterpreter", checked, checked ? "Code Interpreter capability enabled" : "Code Interpreter capability disabled");
  };

  const handleImageGenChange = (checked: boolean) => {
    setImageGen(checked);
    updateSetting("imageGen", checked, checked ? "Image Generation capability enabled" : "Image Generation capability disabled");
  };

  const handleDefaultModelChange = (model: string) => {
    setDefaultModel(model);
    let label = "Oni Pro";
    if (model === "oni-flash") label = "Oni Flash";
    if (model === "oni-creative") label = "Oni Creative";
    
    updateSetting("defaultModel", model, `Default model changed to ${label}`);
  };

  const handleManageMemory = () => {
    window.dispatchEvent(new CustomEvent("oni_toast", { detail: "Memory details loaded (0 items stored)" }));
  };

  return (
    <div className="w-full max-w-[896px]">
      <div className="mb-6">
        <p className="text-text-secondary text-sm">
          Configure AI behavior, tool access, and underlying models to tailor Oni to your specific workflow.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {/* AI Memory Section */}
        <section className="border border-outline-variant rounded-xl bg-surface-container-low p-5 md:p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-surface-container-highest flex items-center justify-center shrink-0 border border-outline-variant">
              <span className="material-symbols-outlined text-primary text-[20px]">memory</span>
            </div>
            <div>
              <h3 className="font-semibold text-lg leading-tight text-primary mb-1">AI Memory</h3>
              <p className="text-text-tertiary text-xs">Control how Oni retains context across sessions.</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2.5 border-t border-outline-variant/50">
              <div className="pr-4">
                <h4 className="text-[10px] font-semibold tracking-wider text-primary uppercase mb-1">
                  Long-term context
                </h4>
                <p className="text-text-tertiary text-xs leading-normal">
                  Allow Oni to remember preferences, project details, and recurring themes across different chats.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={longTermContext}
                  onChange={(e) => handleLongTermContextChange(e.target.checked)}
                  className="sr-only peer cursor-pointer"
                />
                <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-text-secondary after:border-text-secondary after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-outline-variant peer-checked:after:bg-primary"></div>
              </label>
            </div>
            <div className="pt-1">
              <button
                onClick={handleManageMemory}
                className="text-xs text-text-tertiary hover:text-primary transition-colors flex items-center gap-1 group cursor-pointer bg-transparent border-none"
              >
                <span>Manage Memory Details</span>
                <span className="material-symbols-outlined text-[12px] group-hover:translate-x-0.5 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Tool Access Section */}
        <section className="border border-outline-variant rounded-xl bg-surface-container-low p-5 md:p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-surface-container-highest flex items-center justify-center shrink-0 border border-outline-variant">
              <span className="material-symbols-outlined text-primary text-[20px]">construction</span>
            </div>
            <div>
              <h3 className="font-semibold text-lg leading-tight text-primary mb-1">Tool Access</h3>
              <p className="text-text-tertiary text-xs">Enable specialized capabilities for complex tasks.</p>
            </div>
          </div>
          <div className="space-y-0.5">
            {/* Toggle Item: Web Search */}
            <div className="flex items-center justify-between py-3 border-t border-outline-variant/50">
              <div className="flex items-center gap-3 pr-4">
                <span className="material-symbols-outlined text-text-secondary text-[18px]">language</span>
                <div>
                  <h4 className="text-[10px] font-semibold tracking-wider text-primary uppercase mb-0.5">
                    Web Search
                  </h4>
                  <p className="text-text-tertiary text-xs">Access real-time information and current events.</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={webSearch}
                  onChange={(e) => handleWebSearchChange(e.target.checked)}
                  className="sr-only peer cursor-pointer"
                />
                <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-text-secondary after:border-text-secondary after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-outline-variant peer-checked:after:bg-primary"></div>
              </label>
            </div>

            {/* Toggle Item: Code Interpreter */}
            <div className="flex items-center justify-between py-3 border-t border-outline-variant/50">
              <div className="flex items-center gap-3 pr-4">
                <span className="material-symbols-outlined text-text-secondary text-[18px]">code</span>
                <div>
                  <h4 className="text-[10px] font-semibold tracking-wider text-primary uppercase mb-0.5">
                    Code Interpreter
                  </h4>
                  <p className="text-text-tertiary text-xs">Execute Python code, analyze data, and generate charts.</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={codeInterpreter}
                  onChange={(e) => handleCodeInterpreterChange(e.target.checked)}
                  className="sr-only peer cursor-pointer"
                />
                <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-text-secondary after:border-text-secondary after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-outline-variant peer-checked:after:bg-primary"></div>
              </label>
            </div>

            {/* Toggle Item: Image Gen */}
            <div className="flex items-center justify-between py-3 border-t border-outline-variant/50">
              <div className="flex items-center gap-3 pr-4">
                <span className="material-symbols-outlined text-text-secondary text-[18px]">image</span>
                <div>
                  <h4 className="text-[10px] font-semibold tracking-wider text-primary uppercase mb-0.5">
                    Image Generation
                  </h4>
                  <p className="text-text-tertiary text-xs">Create visuals and concept art directly in chat.</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={imageGen}
                  onChange={(e) => handleImageGenChange(e.target.checked)}
                  className="sr-only peer cursor-pointer"
                />
                <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-text-secondary after:border-text-secondary after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-outline-variant peer-checked:after:bg-primary"></div>
              </label>
            </div>
          </div>
        </section>

        {/* Model Selection Section */}
        <section className="border border-outline-variant rounded-xl bg-surface-container-low p-5 md:p-6 mb-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-surface-container-highest flex items-center justify-center shrink-0 border border-outline-variant">
              <span className="material-symbols-outlined text-primary text-[20px]">psychology</span>
            </div>
            <div>
              <h3 className="font-semibold text-lg leading-tight text-primary mb-1">Model Selection</h3>
              <p className="text-text-tertiary text-xs">
                Choose the underlying intelligence powering your workspace.
              </p>
            </div>
          </div>
          <div className="relative max-w-md">
            <label className="block text-[10px] font-semibold text-text-secondary mb-1.5 uppercase tracking-wider" htmlFor="model_select">
              Default Model
            </label>
            <div className="relative">
              <select
                value={defaultModel}
                onChange={(e) => handleDefaultModelChange(e.target.value)}
                className="w-full appearance-none bg-surface border border-outline-variant text-primary py-2 pl-3.5 pr-8 rounded-lg text-sm focus:outline-none focus:border-text-secondary focus:ring-1 focus:ring-text-secondary transition-colors cursor-pointer"
                id="model_select"
              >
                <option value="oni-pro">Oni Pro (Recommended)</option>
                <option value="oni-flash">Oni Flash (Speed-optimized)</option>
                <option value="oni-creative">Oni Creative (Expanded Context)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-text-secondary">
                <span className="material-symbols-outlined text-[18px]">expand_more</span>
              </div>
            </div>
            <p className="mt-2 text-xs text-text-tertiary flex items-center gap-1.5 font-normal tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
              {defaultModel === "oni-flash" ? "Speed-optimized model is currently active." : "Pro plan models are currently active."}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
