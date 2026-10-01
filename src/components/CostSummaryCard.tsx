import { CartonSpec, CalculationResult, Language } from '../types/carton';
import { formatCurrency, formatNumber } from '../utils/calculator';
import { translations } from '../utils/i18n';
import {
  FileText,
  Printer,
  BookmarkCheck,
  PackageCheck,
  Scale,
  Maximize2,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

interface CostSummaryCardProps {
  spec: CartonSpec;
  result: CalculationResult;
  lang: Language;
  onSaveQuote: () => void;
  onGoToQuotation: () => void;
  onGoToReelPlan: () => void;
}

export function CostSummaryCard({
  spec,
  result,
  lang,
  onSaveQuote,
  onGoToQuotation,
  onGoToReelPlan,
}: CostSummaryCardProps) {
  const t = translations[lang];

  // Cost proportions for visual bar
  const total = result.finalSellingPricePerBox || 1;
  const paperPct = Math.round((result.paperCostPerBox / total) * 100);
  const convPct = Math.round(((result.conversionCostPerBox + result.wastageCostPerBox) / total) * 100);
  const finPct = Math.round(
    ((result.printingCostPerBox + result.stitchingCostPerBox + result.dieCostPerBox + result.transportCostPerBox) / total) * 100
  );
  const marginPct = Math.round((result.profitMarginPerBox / total) * 100);

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden sticky top-4">
      {/* Primary Price Header */}
      <div className="bg-slate-900 text-white p-5">
        <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
          <span>{t.sellingPricePerBox}</span>
          <span className="font-mono-nums text-slate-400">
            {formatNumber(spec.orderQuantity, 0)} {lang === 'bn' ? 'টি কার্টন' : 'Pcs'}
          </span>
        </div>

        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-3xl font-extrabold font-mono-nums text-amber-400 tracking-tight">
            {formatCurrency(result.finalSellingPricePerBox, spec.currency)}
          </span>
          <span className="text-xs text-slate-400">/ {lang === 'bn' ? 'কার্টন' : 'box'}</span>
        </div>

        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-300">{t.totalOrderValue}:</span>
          <span className="font-mono-nums font-bold text-base text-white">
            {formatCurrency(result.totalOrderAmount, spec.currency)}
          </span>
        </div>
      </div>

      {/* Quick Specs Grid */}
      <div className="grid grid-cols-2 gap-px bg-slate-200 text-xs">
        <div className="bg-slate-50 p-3 flex items-start gap-2">
          <Maximize2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <div className="text-[11px] text-slate-500">{t.sheetCuttingSize}</div>
            <div className="font-mono-nums font-bold text-slate-900">
              {result.sheetLengthInches}&quot; × {result.sheetWidthInches}&quot;
            </div>
            <div className="text-[10px] text-slate-400 font-mono-nums">
              {result.sheetLengthMm} × {result.sheetWidthMm} mm
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-3 flex items-start gap-2">
          <Scale className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <div className="text-[11px] text-slate-500">{t.weightPerBox}</div>
            <div className="font-mono-nums font-bold text-slate-900">
              ~{result.weightPerBoxGram} g
            </div>
            <div className="text-[10px] text-slate-400 font-mono-nums">
              ({result.weightPerBoxKg} kg)
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-3 flex items-start gap-2">
          <PackageCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <div className="text-[11px] text-slate-500">{t.totalOrderWeight}</div>
            <div className="font-mono-nums font-bold text-slate-900">
              {formatNumber(result.totalOrderWeightKg, 0)} kg
            </div>
            <div className="text-[10px] text-slate-400 font-mono-nums">
              ({result.totalOrderWeightTon} {lang === 'bn' ? 'টন পেপার' : 'Tons'})
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-3 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <div className="text-[11px] text-slate-500">{t.estimatedBurst}</div>
            <div className="font-mono-nums font-bold text-emerald-800">
              ~{result.estimatedBurstingStrength} kg/cm²
            </div>
            <div className="text-[10px] text-slate-400 font-mono-nums">
              {result.totalEffectiveGsm} Eff. GSM
            </div>
          </div>
        </div>
      </div>

      {/* Visual Cost Allocation Bar */}
      <div className="p-4 border-b border-slate-100">
        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 mb-1.5">
          <span>{lang === 'bn' ? 'খরচের অংশীদারি বিন্যাস' : 'Cost Distribution'}</span>
          <span className="text-[10px] text-slate-400">
            {lang === 'bn' ? 'কাগজ ' + paperPct + '%' : 'Paper ' + paperPct + '%'}
          </span>
        </div>

        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex">
          <div
            style={{ width: `${paperPct}%` }}
            className="bg-amber-600 h-full"
            title={`Paper: ${paperPct}%`}
          />
          <div
            style={{ width: `${convPct}%` }}
            className="bg-sky-600 h-full"
            title={`Conversion: ${convPct}%`}
          />
          <div
            style={{ width: `${finPct}%` }}
            className="bg-indigo-600 h-full"
            title={`Finishing: ${finPct}%`}
          />
          <div
            style={{ width: `${marginPct}%` }}
            className="bg-emerald-600 h-full"
            title={`Margin: ${marginPct}%`}
          />
        </div>

        <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
            {lang === 'bn' ? 'কাগজ' : 'Paper'}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
            {lang === 'bn' ? 'কনভার্সন' : 'Conv.'}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
            {lang === 'bn' ? 'ফিনিশিং' : 'Finishing'}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            {lang === 'bn' ? 'মুনাফা' : 'Margin'}
          </span>
        </div>
      </div>

      {/* Itemized Cost Breakdown Table */}
      <div className="p-4 space-y-2 text-xs">
        <div className="flex justify-between text-slate-600">
          <span>{t.rawPaperCost}:</span>
          <span className="font-mono-nums font-semibold text-slate-900">
            {formatCurrency(result.paperCostPerBox, spec.currency)}
          </span>
        </div>

        <div className="flex justify-between text-slate-600">
          <span>{t.paperWastage} ({spec.wastagePercent}%):</span>
          <span className="font-mono-nums text-slate-700">
            {formatCurrency(result.wastageCostPerBox, spec.currency)}
          </span>
        </div>

        <div className="flex justify-between text-slate-600">
          <span>{t.conversionCostItem}:</span>
          <span className="font-mono-nums text-slate-700">
            {formatCurrency(result.conversionCostPerBox, spec.currency)}
          </span>
        </div>

        {result.printingCostPerBox > 0 && (
          <div className="flex justify-between text-slate-600">
            <span>{t.printingCostItem}:</span>
            <span className="font-mono-nums text-slate-700">
              {formatCurrency(result.printingCostPerBox, spec.currency)}
            </span>
          </div>
        )}

        {result.stitchingCostPerBox > 0 && (
          <div className="flex justify-between text-slate-600">
            <span>{t.stitchingCostItem}:</span>
            <span className="font-mono-nums text-slate-700">
              {formatCurrency(result.stitchingCostPerBox, spec.currency)}
            </span>
          </div>
        )}

        {result.dieCostPerBox > 0 && (
          <div className="flex justify-between text-slate-600">
            <span>{t.dieCostItem}:</span>
            <span className="font-mono-nums text-slate-700">
              {formatCurrency(result.dieCostPerBox, spec.currency)}
            </span>
          </div>
        )}

        {result.transportCostPerBox > 0 && (
          <div className="flex justify-between text-slate-600">
            <span>{t.transportCostItem}:</span>
            <span className="font-mono-nums text-slate-700">
              {formatCurrency(result.transportCostPerBox, spec.currency)}
            </span>
          </div>
        )}

        {result.overheadCostPerBox > 0 && (
          <div className="flex justify-between text-slate-600">
            <span>{t.factoryOverheadItem} ({spec.overheadPercent}%):</span>
            <span className="font-mono-nums text-slate-700">
              {formatCurrency(result.overheadCostPerBox, spec.currency)}
            </span>
          </div>
        )}

        <div className="pt-2 border-t border-slate-200 flex justify-between text-slate-800 font-medium">
          <span>{t.netCost}:</span>
          <span className="font-mono-nums">
            {formatCurrency(result.subtotalCostPerBox, spec.currency)}
          </span>
        </div>

        <div className="flex justify-between text-emerald-800 font-semibold bg-emerald-50/70 p-1.5 rounded-md">
          <span>{t.profitMarginItem} ({spec.profitMarginPercent}%):</span>
          <span className="font-mono-nums">
            + {formatCurrency(result.profitMarginPerBox, spec.currency)}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 pt-1 bg-slate-50 border-t border-slate-100 space-y-2">
        <button
          type="button"
          onClick={onGoToQuotation}
          className="w-full py-2 px-3 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Printer className="w-4 h-4" />
          <span>{lang === 'bn' ? 'কোটেশন পত্র প্রিন্ট / দেখুন' : 'View & Print Quotation'}</span>
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={onGoToReelPlan}
            className="py-2 px-2.5 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors flex items-center justify-center gap-1.5"
          >
            <TrendingUp className="w-3.5 h-3.5 text-amber-700" />
            <span>{lang === 'bn' ? 'রিল প্রয়োজন' : 'Reel Plan'}</span>
          </button>

          <button
            type="button"
            onClick={onSaveQuote}
            className="py-2 px-2.5 text-xs font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-lg transition-colors flex items-center justify-center gap-1.5"
          >
            <BookmarkCheck className="w-3.5 h-3.5 text-amber-700" />
            <span>{lang === 'bn' ? 'কোটেশন সেভ' : 'Save Quote'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
