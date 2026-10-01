import { CartonSpec, CalculationResult, Language } from '../types/carton';
import { formatCurrency, formatNumber } from '../utils/calculator';
import { translations } from '../utils/i18n';
import { Package, Truck, Printer, Info, CheckCircle2 } from 'lucide-react';

interface ReelRequirementViewProps {
  spec: CartonSpec;
  result: CalculationResult;
  lang: Language;
}

export function ReelRequirementView({ spec, result, lang }: ReelRequirementViewProps) {
  const t = translations[lang];

  // Group layer requirements by Paper Grade & GSM to combine identical paper rolls
  const groupedReels: Record<
    string,
    {
      paperType: string;
      paperTypeBn: string;
      gsm: number;
      roles: string[];
      netWeightKg: number;
      grossWeightKgWithWastage: number;
      grossWeightTon: number;
      totalCost: number;
      ratePerKg: number;
    }
  > = {};

  result.layers.forEach((layer) => {
    const key = `${layer.paperType}_${layer.gsm}`;
    // Account for wastage on raw paper rolls
    const wastageMult = 1 + spec.wastagePercent / 100;
    const grossKg = layer.totalOrderWeightKg * wastageMult;

    if (!groupedReels[key]) {
      groupedReels[key] = {
        paperType: layer.paperType,
        paperTypeBn: layer.paperTypeBn,
        gsm: layer.gsm,
        roles: [lang === 'bn' ? layer.nameBn : layer.name],
        netWeightKg: layer.totalOrderWeightKg,
        grossWeightKgWithWastage: grossKg,
        grossWeightTon: grossKg / 1000,
        totalCost: layer.totalOrderCost * wastageMult,
        ratePerKg: layer.costPerBox > 0 ? (layer.totalOrderCost / layer.totalOrderWeightKg) : 0,
      };
    } else {
      groupedReels[key].roles.push(lang === 'bn' ? layer.nameBn : layer.name);
      groupedReels[key].netWeightKg += layer.totalOrderWeightKg;
      groupedReels[key].grossWeightKgWithWastage += grossKg;
      groupedReels[key].grossWeightTon = groupedReels[key].grossWeightKgWithWastage / 1000;
      groupedReels[key].totalCost += layer.totalOrderCost * wastageMult;
    }
  });

  const reelList = Object.values(groupedReels);
  const totalGrossKg = reelList.reduce((acc, curr) => acc + curr.grossWeightKgWithWastage, 0);
  const totalGrossTons = totalGrossKg / 1000;
  const totalPaperCostWithWastage = reelList.reduce((acc, curr) => acc + curr.totalCost, 0);

  // Deckle suggestions (Standard paper reel roll widths e.g. 36", 40", 44", 48", 52", 60")
  const requiredDeckleInches = result.sheetWidthInches;
  const recommendedReelDeckle = Math.ceil(requiredDeckleInches / 2) * 2; // nearest even inch

  return (
    <div className="space-y-6">
      {/* Banner Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Package className="w-6 h-6 text-amber-700" />
              <span>{t.reelTitle}</span>
            </h1>
            <p className="text-sm text-slate-500 mt-1">{t.reelSubtitle}</p>
          </div>

          <button
            type="button"
            onClick={() => window.print()}
            className="no-print self-start sm:self-center px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors flex items-center gap-2"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span>{lang === 'bn' ? 'রিল রিকুইজিশন প্রিন্ট করুন' : 'Print Requisition Slip'}</span>
          </button>
        </div>

        {/* Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
          <div className="bg-amber-50/60 border border-amber-200/80 rounded-lg p-3.5">
            <div className="text-xs text-amber-900 font-medium">{t.totalPaperSum} (Gross)</div>
            <div className="text-2xl font-bold font-mono-nums text-amber-950 mt-1">
              {formatNumber(totalGrossKg, 0)} kg
            </div>
            <div className="text-xs text-amber-700 font-mono-nums mt-0.5">
              = {formatNumber(totalGrossTons, 2)} {lang === 'bn' ? 'মেট্রিক টন' : 'Metric Tons'}
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5">
            <div className="text-xs text-slate-500 font-medium">
              {lang === 'bn' ? 'অর্ডার কোয়ান্টিটি' : 'Order Quantity'}
            </div>
            <div className="text-2xl font-bold font-mono-nums text-slate-900 mt-1">
              {formatNumber(spec.orderQuantity, 0)}
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              {lang === 'bn' ? 'টি কার্টন বক্স' : 'Carton Boxes'}
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5">
            <div className="text-xs text-slate-500 font-medium">
              {lang === 'bn' ? 'প্রস্তাবিত রিল ডেকোল' : 'Suggested Deckle Width'}
            </div>
            <div className="text-2xl font-bold font-mono-nums text-slate-900 mt-1">
              {recommendedReelDeckle}&quot;
            </div>
            <div className="text-xs text-slate-500 font-mono-nums mt-0.5">
              {lang === 'bn' ? 'প্রয়োজন' : 'Needed'}: {result.sheetWidthInches}&quot; ({result.sheetWidthMm} mm)
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5">
            <div className="text-xs text-slate-500 font-medium">{t.totalPaperCost}</div>
            <div className="text-2xl font-bold font-mono-nums text-emerald-800 mt-1">
              {formatCurrency(totalPaperCostWithWastage, spec.currency)}
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              {lang === 'bn' ? `(+${spec.wastagePercent}% অপচয় সহ)` : `(incl. ${spec.wastagePercent}% wastage)`}
            </div>
          </div>
        </div>
      </div>

      {/* Reel Breakdown Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">
            {lang === 'bn' ? 'কাগজ গ্রেড ও রিল তালিকা' : 'Paper Grade & Reel Allocation Table'}
          </h2>
          <span className="text-xs text-slate-500">
            {reelList.length} {lang === 'bn' ? 'টি ভিন্ন পেপার গ্রেড' : 'Paper Grades Required'}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
              <tr>
                <th className="py-3 px-4">{t.paperTypeHeader}</th>
                <th className="py-3 px-4">{t.roleHeader}</th>
                <th className="py-3 px-4 text-center">{t.gsmHeader}</th>
                <th className="py-3 px-4 text-right">
                  {lang === 'bn' ? 'নিট ওজন (কেজি)' : 'Net Weight (kg)'}
                </th>
                <th className="py-3 px-4 text-right">
                  {lang === 'bn' ? 'অপচয় সহ মোট প্রয়োজন (কেজি)' : 'Total Gross (kg)'}
                </th>
                <th className="py-3 px-4 text-right">{t.totalTonRequired}</th>
                <th className="py-3 px-4 text-right">
                  {lang === 'bn' ? 'কাগজ বাজেট' : 'Estimated Cost'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {reelList.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    {lang === 'bn' ? item.paperTypeBn : item.paperType}
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    <span className="inline-flex items-center gap-1">
                      {item.roles.join(', ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center font-mono-nums font-bold text-slate-800">
                    {item.gsm} GSM
                  </td>
                  <td className="py-3 px-4 text-right font-mono-nums text-slate-600">
                    {formatNumber(item.netWeightKg, 1)} kg
                  </td>
                  <td className="py-3 px-4 text-right font-mono-nums font-bold text-amber-900">
                    {formatNumber(item.grossWeightKgWithWastage, 1)} kg
                  </td>
                  <td className="py-3 px-4 text-right font-mono-nums font-bold text-slate-900">
                    {formatNumber(item.grossWeightTon, 3)} Ton
                  </td>
                  <td className="py-3 px-4 text-right font-mono-nums font-semibold text-emerald-800">
                    {formatCurrency(item.totalCost, spec.currency)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-slate-50 font-bold border-t border-slate-200 text-slate-900">
              <tr>
                <td colSpan={3} className="py-3 px-4">
                  {lang === 'bn' ? 'সর্বমোট (Total Requirements)' : 'Total Requirements'}
                </td>
                <td className="py-3 px-4 text-right font-mono-nums text-slate-700">
                  {formatNumber(result.totalOrderWeightKg, 0)} kg
                </td>
                <td className="py-3 px-4 text-right font-mono-nums text-amber-950">
                  {formatNumber(totalGrossKg, 0)} kg
                </td>
                <td className="py-3 px-4 text-right font-mono-nums text-slate-950">
                  {formatNumber(totalGrossTons, 2)} Ton
                </td>
                <td className="py-3 px-4 text-right font-mono-nums text-emerald-900">
                  {formatCurrency(totalPaperCostWithWastage, spec.currency)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Production & Procurement Guidance */}
      <div className="bg-blue-50/50 border border-blue-200/80 rounded-xl p-4 flex items-start gap-3 text-xs text-blue-900">
        <Info className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold">
            {lang === 'bn' ? 'ফ্যাক্টরি প্রোডাকশন ও রিল কাটিং নোট:' : 'Production & Reel Slitting Note:'}
          </span>
          <p className="text-blue-800 leading-relaxed">
            {lang === 'bn'
              ? `এই কার্টনের জন্য ডেকোল সাইজ হচ্ছে ${result.sheetWidthInches} ইঞ্চি (${result.sheetWidthMm} মিমি)। করোগেটর মেশিনে কাগজ বাঁচানোর জন্য ${recommendedReelDeckle} ইঞ্চি রিল পেপার ব্যবহার করা সুবিধাজনক। ফ্লুটিং কাগজের জন্য স্বয়ংক্রিয়ভাবে টেক-আপ অনুপাত হিসাবভুক্ত করা হয়েছে।`
              : `The cutting deckle width is ${result.sheetWidthInches}" (${result.sheetWidthMm} mm). A paper roll with ${recommendedReelDeckle}" width minimizes edge trim wastage on corrugators. Fluting take-up consumption is accounted for.`}
          </p>
        </div>
      </div>
    </div>
  );
}
