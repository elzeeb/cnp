import { CartonSpec, Language } from '../types/carton';
import { Cog, Truck, Printer, Scissors, DollarSign, Building } from 'lucide-react';

interface ProcessingCostsProps {
  spec: CartonSpec;
  lang: Language;
  onUpdateSpec: <K extends keyof CartonSpec>(key: K, value: CartonSpec[K]) => void;
}

export function ProcessingCosts({ spec, lang, onUpdateSpec }: ProcessingCostsProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-5">
      <div>
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Cog className="w-5 h-5 text-amber-700" />
          <span>
            {lang === 'bn'
              ? 'ম্যানুফ্যাকচারিং, ফিনিশিং ও প্রফিট মার্জিন'
              : 'Manufacturing, Finishing & Margin'}
          </span>
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          {lang === 'bn'
            ? 'কনভার্সন, প্রিন্টিং, পিন স্টিচিং, পরিবহন ও প্রফিট মার্জিন নির্ধারণ করুন'
            : 'Set conversion, printing, wire stitching, freight and profit margin'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Conversion & Wastage */}
        <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200/80 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 border-b border-slate-200 pb-2">
            <Cog className="w-4 h-4 text-amber-700" />
            <span>{lang === 'bn' ? 'কনভার্সন ও অপচয় (Wastage)' : 'Conversion & Wastage'}</span>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1 flex items-center justify-between">
              <span>{lang === 'bn' ? 'কনভার্সন চার্জ (আঠা/স্টার্চ, বিদ্যুৎ)' : 'Conversion Cost'}</span>
              <span className="text-[10px] text-slate-400">{spec.currency}/kg paper</span>
            </label>
            <input
              type="number"
              min="0"
              step="0.5"
              value={spec.conversionCostPerKg || ''}
              onChange={(e) => onUpdateSpec('conversionCostPerKg', Number(e.target.value))}
              className="w-full text-xs font-mono-nums font-semibold bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-600"
            />
            <span className="text-[10px] text-slate-400 mt-0.5 block">
              {lang === 'bn' ? 'সাধারণত ১০-১৫ ৳ প্রতি কেজি কাগজে' : 'Typically ৳10-15 per kg'}
            </span>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1 flex items-center justify-between">
              <span>{lang === 'bn' ? 'কাগজ ওয়েস্টেজ / অপচয় (%)' : 'Paper Wastage (%)'}</span>
              <span className="text-[10px] text-slate-400">%</span>
            </label>
            <input
              type="number"
              min="0"
              max="20"
              step="0.5"
              value={spec.wastagePercent || ''}
              onChange={(e) => onUpdateSpec('wastagePercent', Number(e.target.value))}
              className="w-full text-xs font-mono-nums font-semibold bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-600"
            />
            <span className="text-[10px] text-slate-400 mt-0.5 block">
              {lang === 'bn' ? 'স্ট্যান্ডার্ড শিল্প অপচয় ৩% থেকে ৬%' : 'Standard industrial 3% - 6%'}
            </span>
          </div>
        </div>

        {/* Printing Charges */}
        <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200/80 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 border-b border-slate-200 pb-2">
            <Printer className="w-4 h-4 text-amber-700" />
            <span>{lang === 'bn' ? 'প্রিন্টিং ও মুদ্রণ' : 'Printing Specification'}</span>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              {lang === 'bn' ? 'প্রিন্টিং ধরন' : 'Printing Type'}
            </label>
            <select
              value={spec.printingType}
              onChange={(e) => {
                const type = e.target.value as CartonSpec['printingType'];
                onUpdateSpec('printingType', type);
                if (type === 'none') onUpdateSpec('printingCostPerBox', 0);
                else if (type === '1_color' && spec.printingCostPerBox === 0) onUpdateSpec('printingCostPerBox', 1.5);
                else if (type === '2_color' && spec.printingCostPerBox <= 1.5) onUpdateSpec('printingCostPerBox', 2.5);
                else if (type === '4_color' && spec.printingCostPerBox <= 2.5) onUpdateSpec('printingCostPerBox', 4.5);
              }}
              className="w-full text-xs bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-600"
            >
              <option value="none">{lang === 'bn' ? 'প্রিন্টিং ছাড়া (Plain)' : 'Plain (No Print)'}</option>
              <option value="1_color">{lang === 'bn' ? '১-রঙা ফ্লেক্সো প্রিন্টিং' : '1-Color Flexo'}</option>
              <option value="2_color">{lang === 'bn' ? '২-রঙা ফ্লেক্সো প্রিন্টিং' : '2-Color Flexo'}</option>
              <option value="4_color">{lang === 'bn' ? '৪-রঙা / মাল্টিকালার' : '4-Color / Multi'}</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1 flex items-center justify-between">
              <span>{lang === 'bn' ? 'প্রিন্টিং খরচ (প্রতি বক্স)' : 'Print Rate (per box)'}</span>
              <span className="text-[10px] text-slate-400">{spec.currency}/box</span>
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              disabled={spec.printingType === 'none'}
              value={spec.printingCostPerBox || ''}
              onChange={(e) => onUpdateSpec('printingCostPerBox', Number(e.target.value))}
              className={`w-full text-xs font-mono-nums font-semibold rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-600 ${
                spec.printingType === 'none'
                  ? 'bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-white border border-slate-300 text-slate-900'
              }`}
            />
          </div>
        </div>

        {/* Stitching / Pasting */}
        <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200/80 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 border-b border-slate-200 pb-2">
            <Scissors className="w-4 h-4 text-amber-700" />
            <span>{lang === 'bn' ? 'জয়েন্ট পদ্ধতি (স্টিচিং/পেস্টিং)' : 'Joint Method'}</span>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              {lang === 'bn' ? 'পদ্ধতি' : 'Method'}
            </label>
            <select
              value={spec.stitchingPastingType}
              onChange={(e) =>
                onUpdateSpec(
                  'stitchingPastingType',
                  e.target.value as CartonSpec['stitchingPastingType']
                )
              }
              className="w-full text-xs bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-600"
            >
              <option value="stitching">{lang === 'bn' ? 'ওয়্যার পিন স্টিচিং' : 'Wire Stitching (Pins)'}</option>
              <option value="pasting">{lang === 'bn' ? 'গ্লু পেস্টিং' : 'Glue Pasting'}</option>
              <option value="both">{lang === 'bn' ? 'পিন ও গ্লু দুটোই' : 'Both Stitching & Glue'}</option>
              <option value="none">{lang === 'bn' ? 'কোনোটিই না' : 'None'}</option>
            </select>
          </div>

          {(spec.stitchingPastingType === 'stitching' || spec.stitchingPastingType === 'both') && (
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-semibold text-slate-600 mb-1">
                  {lang === 'bn' ? 'পিনের সংখ্যা' : 'Pins'}
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={spec.stitchingPins || ''}
                  onChange={(e) => onUpdateSpec('stitchingPins', Number(e.target.value))}
                  className="w-full text-xs font-mono-nums font-semibold bg-white border border-slate-300 rounded-md px-2 py-1.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-600"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-600 mb-1">
                  {lang === 'bn' ? 'প্রতি পিন দর' : 'Rate/Pin'}
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.05"
                  value={spec.stitchingRatePerPin || ''}
                  onChange={(e) => onUpdateSpec('stitchingRatePerPin', Number(e.target.value))}
                  className="w-full text-xs font-mono-nums font-semibold bg-white border border-slate-300 rounded-md px-2 py-1.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-600"
                />
              </div>
            </div>
          )}
        </div>

        {/* Die cutting (if applicable) */}
        {spec.boxType === 'die_cut' && (
          <div className="p-3.5 bg-amber-50/50 rounded-lg border border-amber-200 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 border-b border-amber-200 pb-2">
              <Scissors className="w-4 h-4 text-amber-700" />
              <span>{lang === 'bn' ? 'ডাই-কাটিং চার্জ ও ব্লক' : 'Die-Cutting & Block'}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-semibold text-slate-600 mb-1">
                  {lang === 'bn' ? 'ডাই কাঠের ব্লক' : 'Die Block Cost'}
                </label>
                <input
                  type="number"
                  min="0"
                  step="100"
                  value={spec.dieBlockCost || ''}
                  onChange={(e) => onUpdateSpec('dieBlockCost', Number(e.target.value))}
                  className="w-full text-xs font-mono-nums font-semibold bg-white border border-slate-300 rounded-md px-2 py-1.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-600"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-600 mb-1">
                  {lang === 'bn' ? 'কাটিং ফি/বক্স' : 'Fee/Box'}
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={spec.dieCutChargePerBox || ''}
                  onChange={(e) => onUpdateSpec('dieCutChargePerBox', Number(e.target.value))}
                  className="w-full text-xs font-mono-nums font-semibold bg-white border border-slate-300 rounded-md px-2 py-1.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-600"
                />
              </div>
            </div>
          </div>
        )}

        {/* Transport & Delivery */}
        <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200/80 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 border-b border-slate-200 pb-2">
            <Truck className="w-4 h-4 text-amber-700" />
            <span>{lang === 'bn' ? 'পরিবহন ও ডেলিভারি' : 'Freight & Delivery'}</span>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1 flex items-center justify-between">
              <span>{lang === 'bn' ? 'প্রতি কার্টন ডেলিভারি খরচ' : 'Delivery per box'}</span>
              <span className="text-[10px] text-slate-400">{spec.currency}/box</span>
            </label>
            <input
              type="number"
              min="0"
              step="0.25"
              value={spec.transportCostPerBox || ''}
              onChange={(e) => onUpdateSpec('transportCostPerBox', Number(e.target.value))}
              className="w-full text-xs font-mono-nums font-semibold bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-600"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1 flex items-center justify-between">
              <span>{lang === 'bn' ? 'ফ্যাক্টরি ওভারহেড (%)' : 'Overhead (%)'}</span>
              <span className="text-[10px] text-slate-400">%</span>
            </label>
            <input
              type="number"
              min="0"
              max="30"
              step="1"
              value={spec.overheadPercent || ''}
              onChange={(e) => onUpdateSpec('overheadPercent', Number(e.target.value))}
              className="w-full text-xs font-mono-nums font-semibold bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-600"
            />
          </div>
        </div>

        {/* Quantity & Profit Margin */}
        <div className="p-3.5 bg-amber-50/60 rounded-lg border border-amber-200/90 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 border-b border-amber-200 pb-2">
            <DollarSign className="w-4 h-4 text-amber-700" />
            <span>{lang === 'bn' ? 'অর্ডার পরিমাণ ও লাভ (Margin)' : 'Quantity & Profit Margin'}</span>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-amber-950 mb-1 flex items-center justify-between">
              <span>{lang === 'bn' ? 'অর্ডারের পরিমাণ (কার্টন)' : 'Order Quantity (Boxes)'}</span>
              <span className="text-[10px] text-amber-700 font-bold">Pcs</span>
            </label>
            <input
              type="number"
              min="100"
              step="500"
              value={spec.orderQuantity || ''}
              onChange={(e) => onUpdateSpec('orderQuantity', Math.max(1, Number(e.target.value)))}
              className="w-full text-sm font-mono-nums font-bold bg-white border border-amber-300 rounded-md px-2.5 py-1.5 text-amber-950 focus:outline-none focus:ring-1 focus:ring-amber-600"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-amber-950 mb-1 flex items-center justify-between">
              <span>{lang === 'bn' ? 'প্রফিট মার্জিন / মুনাফা (%)' : 'Profit Margin (%)'}</span>
              <span className="text-[10px] text-amber-700 font-bold">%</span>
            </label>
            <input
              type="number"
              min="0"
              max="100"
              step="1"
              value={spec.profitMarginPercent || ''}
              onChange={(e) => onUpdateSpec('profitMarginPercent', Number(e.target.value))}
              className="w-full text-sm font-mono-nums font-bold bg-white border border-amber-300 rounded-md px-2.5 py-1.5 text-emerald-800 focus:outline-none focus:ring-1 focus:ring-amber-600"
            />
          </div>
        </div>

        {/* Client & PO Header Details */}
        <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200/80 space-y-3 md:col-span-2 lg:col-span-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 border-b border-slate-200 pb-2">
            <Building className="w-4 h-4 text-amber-700" />
            <span>{lang === 'bn' ? 'ক্লায়েন্ট ও কোটেশনের পরিচিতি' : 'Client & Reference Info'}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                {lang === 'bn' ? 'ক্লায়েন্ট / বায়ারে নাম' : 'Client Name'}
              </label>
              <input
                type="text"
                value={spec.clientName}
                onChange={(e) => onUpdateSpec('clientName', e.target.value)}
                placeholder="e.g. Apex Textiles Ltd."
                className="w-full text-xs bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-600"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                {lang === 'bn' ? 'প্রজেক্ট / আইটেম বিবরণ' : 'Project / Box Title'}
              </label>
              <input
                type="text"
                value={spec.projectName}
                onChange={(e) => onUpdateSpec('projectName', e.target.value)}
                placeholder="e.g. Garments Export Master Box"
                className="w-full text-xs bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-600"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                {lang === 'bn' ? 'পিও বা রেফারেন্স নম্বর' : 'PO / Ref Number'}
              </label>
              <input
                type="text"
                value={spec.poNumber}
                onChange={(e) => onUpdateSpec('poNumber', e.target.value)}
                placeholder="e.g. PO-2026-901"
                className="w-full text-xs font-mono-nums bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-600"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
