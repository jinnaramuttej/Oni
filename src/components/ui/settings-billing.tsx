"use client";

export function SettingsBilling() {
  const billingHistory = [
    { date: "Oct 15, 2023", amount: "$20.00", plan: "Pro Plan" },
    { date: "Sep 15, 2023", amount: "$20.00", plan: "Pro Plan" },
    { date: "Aug 15, 2023", amount: "$20.00", plan: "Pro Plan" },
  ];

  return (
    <div className="flex-1 py-8 px-4 md:px-12 md:py-10 overflow-y-auto w-full max-w-[896px]">
      <div className="mb-12">
        <p className="text-text-secondary">Manage your subscription, payment methods, and billing history.</p>
      </div>

      <div className="flex flex-col gap-12">
        {/* Current Plan Section */}
        <section className="border border-outline-variant rounded-2xl p-6 bg-surface-container-lowest flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <p className="text-xs font-semibold tracking-widest text-text-tertiary uppercase mb-1">Current Plan</p>
            <div className="flex items-end gap-3">
              <h3 className="text-xl font-serif text-primary">Pro Plan</h3>
              <span className="text-sm text-text-secondary mb-1">/ $20 per month</span>
            </div>
            <p className="text-sm text-text-secondary mt-2">
              Your next billing date is <span className="text-primary font-medium">Nov 15, 2023</span>.
            </p>
          </div>
          <button className="bg-primary text-on-primary px-6 py-2.5 rounded-xl text-xs font-semibold hover:bg-surface-tint transition-colors whitespace-nowrap cursor-pointer">
            Manage subscription
          </button>
        </section>

        {/* Payment Method Section */}
        <section className="border border-outline-variant rounded-2xl p-6 bg-surface flex flex-col gap-6">
          <div className="flex justify-between items-center border-b border-surface-container-high pb-4">
            <h4 className="text-base font-serif text-primary">Payment Method</h4>
            <button className="text-xs font-semibold text-text-secondary hover:text-primary transition-colors px-3 py-1.5 border border-outline-variant rounded-md hover:bg-surface-container cursor-pointer">
              Update
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-8 bg-surface-container-high border border-outline-variant rounded-md flex items-center justify-center">
              <span className="material-symbols-outlined text-text-secondary">credit_card</span>
            </div>
            <div>
              <p className="text-sm text-primary font-medium">Mastercard ending in 4242</p>
              <p className="text-xs text-text-tertiary mt-0.5">Expires 12/2025</p>
            </div>
          </div>
        </section>

        {/* Billing History Section */}
        <section className="border border-outline-variant rounded-2xl overflow-hidden bg-surface flex flex-col">
          <div className="p-6 border-b border-surface-container-high">
            <h4 className="text-base font-serif text-primary">Billing History</h4>
          </div>
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-surface-container-high bg-surface-container-lowest/50">
                  <th className="py-3 px-6 text-[11px] font-semibold text-text-tertiary uppercase tracking-wider">
                    Date
                  </th>
                  <th className="py-3 px-6 text-[11px] font-semibold text-text-tertiary uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="py-3 px-6 text-[11px] font-semibold text-text-tertiary uppercase tracking-wider hidden sm:table-cell">
                    Plan
                  </th>
                  <th className="py-3 px-6 text-[11px] font-semibold text-text-tertiary uppercase tracking-wider text-right animate-none">
                    Receipt
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm text-text-secondary">
                {billingHistory.map((invoice, index) => (
                  <tr
                    key={index}
                    className={`border-b border-surface-container-high hover:bg-surface-container/50 transition-colors ${
                      index === billingHistory.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    <td className="py-4 px-6 text-primary">{invoice.date}</td>
                    <td className="py-4 px-6">{invoice.amount}</td>
                    <td className="py-4 px-6 hidden sm:table-cell">{invoice.plan}</td>
                    <td className="py-4 px-6 text-right">
                      <button className="text-text-tertiary hover:text-primary transition-colors cursor-pointer">
                        <span className="material-symbols-outlined text-[20px]">download</span>
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
