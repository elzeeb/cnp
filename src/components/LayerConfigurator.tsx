import { CartonSpec, CalculationResult, Language, PAPER_TYPES, GSM_PRESETS, FLUTE_TAKE_UP, FluteType } from '../types/carton';
import { Layers, Sparkles, TrendingUp } from 'lucide-react';

interface LayerConfiguratorProps {
  spec: CartonSpec;
  result: CalculationResult;
  lang: Language;
  onUpdateLayer: (index: number, field: string, value: string | number) => void;
  onQuickApplyRates: (linerRate: number, fluteRate: number) => void;
}

export function LayerConfigurator({
  spec,
  result,
  lang,
  onUpdateLayer,
  onQuickApplyRates,
}: LayerConfiguratorProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-700" />
            <span>
              {lang === 'bn'
                ? 'কাগজের স্তর ও জিএসএম স্পেসিফিকেশন'
                : 'Paper Layers & GSM Specifications'}
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {lang === 'bn'
              ? 'প্রতিটি স্তরের কাগজের ধরন, জিএসএম এবং কেজি প্রতি রেট সেট করুন'
              : 'Configure paper type, GSM, flute take-up ratio and paper rate per kg'}
          </p>
        </div>

        {/* Quick bulk paper rate actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onQuickApplyRates(85, 65)}
            className="text-xs font-medium text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
            title={lang === 'bn' ? 'স্ট্যান্ডার্ড বাজার রেট (লাইনার ৮৫৳, ফ্লুট ৬৫৳)' : 'Standard Market Rate (Liner ৳85, Flute ৳65)'}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>{lang === 'bn' ? 'স্ট্যান্ডার্ড পেপার রেট' : 'Default Paper Rates'}</span>
          </button>
        </div>
      </div>

      {/* Layer rows list */}
      <div className="space-y-3">
        {spec.layers.map((layer, index) => {
          const calc = result.layers.find((l) => l.id === layer.id);

          return (
            <div
              key={layer.id}
              className={`p-3.5 rounded-lg border transition-all ${
                layer.isFlute
                  ? 'bg-amber-50/40 border-amber-200/70 hover:border-amber-300'
                  : 'bg-slate-50/70 border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                {/* Layer Title & Badge */}
                <div className="min-w-[170px]">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        layer.isFlute ? 'bg-amber-600' : 'bg-slate-700'
                      }`}
                    />
                    <span className="text-xs font-bold text-slate-900">
                      {lang === 'bn' ? layer.nameBn : layer.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1 pl-4">
                    <span>
                      {layer.isFlute
                        ? (lang === 'bn' ? 'তরঙ্গায়িত ফ্লুটিং' : 'Corrugated Flute')
                        : (lang === 'bn' ? 'সমতল লাইনার' : 'Flat Liner')}
                    </span>
                    {layer.isFlute && (
                      <>
                        <span>·</span>
                        <span className="font-mono-nums font-semibold text-amber-800">
                          {layer.takeUpFactor}x {lang === 'bn' ? 'কাগজ' : 'take-up'}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Layer Form Controls */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 flex-1">
                  {/* Paper Type */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      {lang === 'bn' ? 'কাগজের ধরন' : 'Paper Type'}
                    </label>
                    <select
                      value={layer.paperType}
                      onChange={(e) => {
                        const selected = PAPER_TYPES.find((p) => p.value === e.target.value);
                        onUpdateLayer(index, 'paperType', e.target.value);
                        if (selected) {
                          onUpdateLayer(index, 'paperTypeBn', selected.labelBn);
                        }
                      }}
                      className="w-full text-xs bg-white border border-slate-300 rounded-md px-2 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-600"
                    >
                      {PAPER_TYPES.map((pt) => (
                        <option key={pt.value} value={pt.value}>
                          {lang === 'bn' ? pt.labelBn : pt.labelEn}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* GSM */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1 flex items-center justify-between">
                      <span>{lang === 'bn' ? 'জিএসএম (GSM)' : 'GSM'}</span>
                      <span className="text-[10px] text-slate-400 font-normal">g/m²</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="80"
                        max="400"
                        step="5"
                        value={layer.gsm || ''}
                        onChange={(e) => onUpdateLayer(index, 'gsm', Number(e.target.value))}
                        className="w-full text-xs font-mono-nums font-semibold bg-white border border-slate-300 rounded-md px-2 py-1.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-600"
                      />
                    </div>
                  </div>

                  {/* Take-up Factor (for Flutes) or Sub-layer spec */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      {layer.isFlute
                        ? (lang === 'bn' ? 'ফ্লুট রেশিও' : 'Flute Ratio')
                        : (lang === 'bn' ? 'ফ্যাক্টর' : 'Factor')}
                    </label>
                    {layer.isFlute ? (
                      <select
                        value={layer.takeUpFactor}
                        onChange={(e) => onUpdateLayer(index, 'takeUpFactor', Number(e.target.value))}
                        className="w-full text-xs font-mono-nums bg-white border border-slate-300 rounded-md px-2 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-600"
                      >
                        <option value={FLUTE_TAKE_UP.B}>B Flute (1.35x)</option>
                        <option value={FLUTE_TAKE_UP.C}>C Flute (1.42x)</option>
                        <option value={FLUTE_TAKE_UP.E}>E Flute (1.28x)</option>
                        <option value={FLUTE_TAKE_UP.BC}>BC Double (1.38x)</option>
                        <option value={1.4}>Standard (1.40x)</option>
                      </select>
                    ) : (
                      <input
                        type="text"
                        disabled
                        value="1.00 (Flat)"
                        className="w-full text-xs font-mono-nums bg-slate-100 border border-slate-200 rounded-md px-2 py-1.5 text-slate-500 cursor-not-allowed"
                      />
                    )}
                  </div>

                  {/* Rate per KG */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1 flex items-center justify-between">
                      <span>{lang === 'bn' ? 'কাগজের দর' : 'Paper Rate'}</span>
                      <span className="text-[10px] text-slate-400 font-normal">
                        {spec.currency}/kg
                      </span>
                    </label>
                    <input
                      type="number"
                      min="10"
                      max="300"
                      step="0.5"
                      value={layer.ratePerKg || ''}
                      onChange={(e) => onUpdateLayer(index, 'ratePerKg', Number(e.target.value))}
                      className="w-full text-xs font-mono-nums font-semibold bg-white border border-slate-300 rounded-md px-2 py-1.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-600"
                    />
                  </div>
                </div>

                {/* Calculated output for this layer */}
                <div className="flex lg:flex-col justify-between items-end bg-white/80 border border-slate-200/60 rounded-md px-3 py-1.5 min-w-[130px] shrink-0 text-right">
                  <div className="text-[11px] text-slate-500">
                    <span className="font-mono-nums font-medium text-slate-700">
                      {calc ? Math.round(calc.weightPerBoxGram) : 0}g
                    </span>{' '}
                    / {lang === 'bn' ? 'বক্স' : 'box'}
                  </div>
                  <div className="text-xs font-bold text-amber-900 font-mono-nums">
                    {spec.currency === 'BDT' ? '৳' : '$'}{' '}
                    {calc ? calc.costPerBox.toFixed(2) : '0.00'}
                  </div>
                </div>
              </div>

              {/* Quick GSM Pills */}
              <div className="flex items-center gap-1 mt-2.5 pt-2 border-t border-slate-200/50 overflow-x-auto text-[10px]">
                <span className="text-slate-400 font-medium shrink-0 mr-1">
                  {lang === 'bn' ? 'দ্রুত জিএসএম:' : 'Quick GSM:'}
                </span>
                {GSM_PRESETS.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => onUpdateLayer(index, 'gsm', g)}
                    className={`px-2 py-0.5 rounded-sm font-mono-nums transition-colors shrink-0 ${
                      layer.gsm === g
                        ? 'bg-amber-700 text-white font-bold'
                        : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Aggregate Paper Summary footer */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-4 h-4 text-amber-700" />
          <span className="font-semibold text-slate-800">
            {lang === 'bn' ? 'মোট কাঁচা পেপারের হিসাব:' : 'Total Paper Summary:'}
          </span>
          <span className="text-slate-600">
            {lang === 'bn' ? 'মোট ইফেক্টিভ জিএসএম' : 'Effective GSM'}:{' '}
            <strong className="font-mono-nums text-slate-900">{result.totalEffectiveGsm}</strong>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-slate-600">
            {lang === 'bn' ? 'পেপার ওজন' : 'Weight'}:{' '}
            <strong className="font-mono-nums text-slate-900">{result.weightPerBoxGram}g</strong>
          </span>
          <span className="text-slate-900 font-bold">
            {lang === 'bn' ? 'কাগজের খরচ' : 'Paper Cost'}:{' '}
            <strong className="font-mono-nums text-amber-900">
              {spec.currency === 'BDT' ? '৳' : '$'} {result.paperCostPerBox.toFixed(2)}
            </strong>
          </span>
        </div>
      </div>
    </div>
  );
}
