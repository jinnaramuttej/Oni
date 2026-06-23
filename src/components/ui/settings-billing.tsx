"use client";

import { useState, useEffect } from "react";

export function SettingsBilling() {
  const [billingPlan, setBillingPlan] = useState("pro"); // free, pro, enterprise
  const [paymentCard, setPaymentCard] = useState("Mastercard ending in 4242");
  const [paymentExpiry, setPaymentExpiry] = useState("12/2025");
  
  // Interactive UI states
  const [isManagingSub, setIsManagingSub] = useState(false);
  const [isUpdatingCard, setIsUpdatingCard] = useState(false);
  
  // Card form states
  const [cardBrand, setCardBrand] = useState("Visa");
  const [cardLast4, setCardLast4] = useState("4242");
  const [cardExpiry, setCardExpiry] = useState("12/2025");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("oni_settings");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.billingPlan) setBillingPlan(parsed.billingPlan);
        if (parsed.paymentCard) setPaymentCard(parsed.paymentCard);
        if (parsed.paymentExpiry) setPaymentExpiry(parsed.paymentExpiry);
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

  const handlePlanChange = (plan: string) => {
    setBillingPlan(plan);
    setIsManagingSub(false);
    
    let label = "Pro Plan";
    if (plan === "free") label = "Free Plan";
    if (plan === "enterprise") label = "Enterprise Plan";
    
    // Save to settings
    try {
      const saved = localStorage.getItem("oni_settings") || "{}";
      const parsed = JSON.parse(saved);
      parsed.billingPlan = plan;
      localStorage.setItem("oni_settings", JSON.stringify(parsed));
      window.dispatchEvent(new Event("oni_settings_change"));
      window.dispatchEvent(new CustomEvent("oni_toast", { detail: `Successfully subscribed to ${label}!` }));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveCard = () => {
    if (!/^\d{4}$/.test(cardLast4)) {
      window.dispatchEvent(new CustomEvent("oni_toast", { detail: "Card ending digits must be exactly 4 numbers" }));
      return;
    }
    const newCard = `${cardBrand} ending in ${cardLast4}`;
    setPaymentCard(newCard);
    setPaymentExpiry(cardExpiry);
    setIsUpdatingCard(false);
    
    try {
      const saved = localStorage.getItem("oni_settings") || "{}";
      const parsed = JSON.parse(saved);
      parsed.paymentCard = newCard;
      parsed.paymentExpiry = cardExpiry;
      localStorage.setItem("oni_settings", JSON.stringify(parsed));
      window.dispatchEvent(new Event("oni_settings_change"));
      window.dispatchEvent(new CustomEvent("oni_toast", { detail: "Payment details updated successfully" }));
    } catch (e) {
      console.error(e);
    }
  };

  const handleDownloadReceipt = (invoice: { date: string; amount: string; plan: string }) => {
    window.dispatchEvent(new CustomEvent("oni_toast", { detail: `Generating receipt for ${invoice.date}...` }));
    
    setTimeout(() => {
      try {
        const receiptText = `
=========================================
          ONI SYSTEM INVOICE
=========================================
Date:         ${invoice.date}
Plan:         ${invoice.plan}
Amount:       ${invoice.amount}
Status:       PAID / SETTLED
Payment:      ${paymentCard}
Expires:      ${paymentExpiry}
=========================================
Thank you for building with Oni!
        `;
        const blob = new Blob([receiptText], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `oni_receipt_${invoice.date.replace(/,?\s+/g, "_")}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        window.dispatchEvent(new CustomEvent("oni_toast", { detail: "Receipt downloaded!" }));
      } catch (err) {
        console.error(err);
        window.dispatchEvent(new CustomEvent("oni_toast", { detail: "Failed to download receipt" }));
      }
    }, 800);
  };

  const billingHistory = [
    { date: "Oct 15, 2023", amount: billingPlan === "free" ? "$0.00" : billingPlan === "enterprise" ? "$120.00" : "$20.00", plan: billingPlan === "free" ? "Free Plan" : billingPlan === "enterprise" ? "Enterprise Plan" : "Pro Plan" },
    { date: "Sep 15, 2023", amount: "$20.00", plan: "Pro Plan" },
    { date: "Aug 15, 2023", amount: "$20.00", plan: "Pro Plan" },
  ];

  return (
    <div className="w-full max-w-[896px]">
      <div className="mb-6">
        <p className="text-text-secondary text-sm">Manage your subscription, payment methods, and billing history.</p>
      </div>

      <div className="flex flex-col gap-8">
        {/* Current Plan Section */}
        <section className="border border-outline-variant rounded-xl p-5 bg-surface-container-lowest flex flex-col justify-between gap-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <p className="text-[10px] font-semibold tracking-widest text-text-tertiary uppercase mb-1">Current Plan</p>
              <div className="flex items-end gap-2">
                <h3 className="text-lg font-semibold text-primary capitalize">{billingPlan} Plan</h3>
                <span className="text-xs text-text-secondary mb-0.5">
                  / {billingPlan === "free" ? "$0" : billingPlan === "enterprise" ? "$120" : "$20"} per month
                </span>
              </div>
              <p className="text-xs text-text-secondary mt-1">
                Your next billing date is <span className="text-primary font-medium">Nov 15, 2023</span>.
              </p>
            </div>
            <button
              onClick={() => setIsManagingSub(!isManagingSub)}
              className="bg-primary text-on-primary px-4 py-2 rounded-lg text-xs font-semibold hover:bg-surface-tint transition-colors whitespace-nowrap cursor-pointer"
            >
              {isManagingSub ? "Close Plan Manager" : "Manage subscription"}
            </button>
          </div>

          {/* Subscriptions Options */}
          {isManagingSub && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 border-t border-outline-variant/50 animate-in fade-in slide-in-from-top-4 duration-200">
              {/* Free Plan Option */}
              <div className={`p-3 rounded-lg border flex flex-col justify-between gap-3 ${billingPlan === "free" ? "border-primary bg-surface" : "border-outline-variant bg-surface-container-low"}`}>
                <div>
                  <h4 className="font-semibold text-sm text-primary">Free Plan</h4>
                  <p className="text-[10px] text-text-secondary mt-0.5">Perfect for trying out Oni.</p>
                  <p className="text-base font-bold text-primary mt-1.5">$0</p>
                </div>
                <button
                  onClick={() => handlePlanChange("free")}
                  disabled={billingPlan === "free"}
                  className="w-full py-1.5 bg-surface-container border border-surface-container-high hover:border-outline-variant hover:text-primary disabled:opacity-50 text-xs font-semibold rounded-md transition-colors cursor-pointer"
                >
                  {billingPlan === "free" ? "Current Plan" : "Switch to Free"}
                </button>
              </div>

              {/* Pro Plan Option */}
              <div className={`p-3 rounded-lg border flex flex-col justify-between gap-3 ${billingPlan === "pro" ? "border-primary bg-surface" : "border-outline-variant bg-surface-container-low"}`}>
                <div>
                  <h4 className="font-semibold text-sm text-primary">Pro Plan</h4>
                  <p className="text-[10px] text-text-secondary mt-0.5">For professional creators.</p>
                  <p className="text-base font-bold text-primary mt-1.5">$20/mo</p>
                </div>
                <button
                  onClick={() => handlePlanChange("pro")}
                  disabled={billingPlan === "pro"}
                  className="w-full py-1.5 bg-primary text-on-primary hover:bg-surface-tint disabled:opacity-50 text-xs font-semibold rounded-md transition-colors cursor-pointer"
                >
                  {billingPlan === "pro" ? "Current Plan" : "Upgrade to Pro"}
                </button>
              </div>

              {/* Enterprise Plan Option */}
              <div className={`p-3 rounded-lg border flex flex-col justify-between gap-3 ${billingPlan === "enterprise" ? "border-primary bg-surface" : "border-outline-variant bg-surface-container-low"}`}>
                <div>
                  <h4 className="font-semibold text-sm text-primary">Enterprise Plan</h4>
                  <p className="text-[10px] text-text-secondary mt-0.5">High limits & dedicated assets.</p>
                  <p className="text-base font-bold text-primary mt-1.5">$120/mo</p>
                </div>
                <button
                  onClick={() => handlePlanChange("enterprise")}
                  disabled={billingPlan === "enterprise"}
                  className="w-full py-1.5 bg-surface-container border border-surface-container-high hover:border-outline-variant hover:text-primary disabled:opacity-50 text-xs font-semibold rounded-md transition-colors cursor-pointer"
                >
                  {billingPlan === "enterprise" ? "Current Plan" : "Upgrade to Enterprise"}
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Payment Method Section */}
        <section className="border border-outline-variant rounded-xl p-5 bg-surface flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-surface-container-high pb-3">
            <h4 className="text-sm font-semibold text-primary">Payment Method</h4>
            <button
              onClick={() => {
                if (!isUpdatingCard) {
                  // Pre-populate card form details
                  const parts = paymentCard.split(" ending in ");
                  setCardBrand(parts[0] || "Visa");
                  setCardLast4(parts[1] || "4242");
                  setCardExpiry(paymentExpiry);
                }
                setIsUpdatingCard(!isUpdatingCard);
              }}
              className="text-[10px] font-semibold text-text-secondary hover:text-primary transition-colors px-2.5 py-1.5 border border-outline-variant rounded hover:bg-surface-container cursor-pointer"
            >
              {isUpdatingCard ? "Cancel" : "Update"}
            </button>
          </div>
          
          {isUpdatingCard ? (
            <div className="flex flex-col gap-3 max-w-md animate-in fade-in slide-in-from-top-4 duration-200">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-semibold text-text-secondary mb-1 uppercase tracking-wider" htmlFor="card_brand">
                    Card Provider
                  </label>
                  <select
                    id="card_brand"
                    value={cardBrand}
                    onChange={(e) => setCardBrand(e.target.value)}
                    className="w-full bg-surface-container border border-outline-variant text-primary p-2 rounded-lg text-xs focus:outline-none"
                  >
                    <option value="Visa">Visa</option>
                    <option value="Mastercard">Mastercard</option>
                    <option value="American Express">American Express</option>
                    <option value="Discover">Discover</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-text-secondary mb-1 uppercase tracking-wider" htmlFor="card_last_4">
                    Last 4 Digits
                  </label>
                  <input
                    id="card_last_4"
                    type="text"
                    maxLength={4}
                    value={cardLast4}
                    onChange={(e) => setCardLast4(e.target.value.replace(/\D/g, ""))}
                    className="w-full bg-surface-container border border-outline-variant text-primary p-2 rounded-lg text-xs focus:outline-none"
                    placeholder="4242"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-text-secondary mb-1 uppercase tracking-wider" htmlFor="card_expiry">
                  Expiry Date (MM/YYYY)
                </label>
                <input
                  id="card_expiry"
                  type="text"
                  placeholder="12/2025"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  className="w-full bg-surface-container border border-outline-variant text-primary p-2 rounded-lg text-xs focus:outline-none"
                />
              </div>
              <button
                onClick={handleSaveCard}
                className="w-fit px-3 py-1.5 bg-primary text-on-primary hover:bg-surface-tint text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Save Payment Method
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-10 h-7 bg-surface-container-high border border-outline-variant rounded flex items-center justify-center">
                <span className="material-symbols-outlined text-text-secondary text-[18px]">credit_card</span>
              </div>
              <div>
                <p className="text-xs text-primary font-medium">{paymentCard}</p>
                <p className="text-[10px] text-text-tertiary mt-0.5">Expires {paymentExpiry}</p>
              </div>
            </div>
          )}
        </section>

        {/* Billing History Section */}
        <section className="border border-outline-variant rounded-xl overflow-hidden bg-surface flex flex-col">
          <div className="p-4 border-b border-surface-container-high">
            <h4 className="text-sm font-semibold text-primary">Billing History</h4>
          </div>
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-surface-container-high bg-surface-container-lowest/50">
                  <th className="py-2.5 px-4 text-[10px] font-semibold text-text-tertiary uppercase tracking-wider">
                    Date
                  </th>
                  <th className="py-2.5 px-4 text-[10px] font-semibold text-text-tertiary uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="py-2.5 px-4 text-[10px] font-semibold text-text-tertiary uppercase tracking-wider hidden sm:table-cell">
                    Plan
                  </th>
                  <th className="py-2.5 px-4 text-[10px] font-semibold text-text-tertiary uppercase tracking-wider text-right animate-none">
                    Receipt
                  </th>
                </tr>
              </thead>
              <tbody className="text-xs text-text-secondary">
                {billingHistory.map((invoice, index) => (
                  <tr
                    key={index}
                    className={`border-b border-surface-container-high hover:bg-surface-container/50 transition-colors ${
                      index === billingHistory.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    <td className="py-3 px-4 text-primary">{invoice.date}</td>
                    <td className="py-3 px-4">{invoice.amount}</td>
                    <td className="py-3 px-4 hidden sm:table-cell">{invoice.plan}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleDownloadReceipt(invoice)}
                        className="text-text-tertiary hover:text-primary transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">download</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
