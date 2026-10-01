import { CartonSpec, UnitType, BoxType, PlyCount, Language } from '../types/carton';
import { PRESET_BOXES, generateDefaultLayers } from '../utils/calculator';
import { translations } from '../utils/i18n';
import { Ruler, Sparkles, SlidersHorizontal } from 'lucide-react';

interface DimensionInputsProps {
  spec: CartonSpec;
  lang: Language;
  onUpdateSpec: <K extends keyof CartonSpec>(key: K, value: CartonSpec[K]) => void;
  onSelectPly: (ply: PlyCount) => void;
  onLoadPreset: (presetSpec: Partial<CartonSpec>) => void;
}

export function DimensionInputs({
  spec,
  lang,
  onUpdateSpec,
  onSelectPly,
  onLoadPreset,
}: DimensionInputsProps) {
  const t = translations[lang];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-5">
      {/* Header and Quick Presets */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Ruler className="w-5 h-5 text-amber-700" />
            <span>
              {lang === 'bn' ? 'কার্টনের সাইজ ও ধরন' : 'Box Dimensions & Carton Style'}
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {lang === 'bn'
              ? 'বক্সের ভেতরের দৈর্ঘ্য, প্রস্থ ও উচ্চতা দিন'
              : 'Enter internal dimensions and choose carton construction'}
          </p>
        </div>

        {/* Unit Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-600">
            {lang === 'bn' ? 'একক:' : 'Unit:'}
          </span>
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-semibold text-slate-600">
            {(['inch', 'mm', 'cm'] as UnitType[]).map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => onUpdateSpec('unit', u)}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  spec.unit === u
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'hover:text-slate-900'
                }`}
              >
                {u === 'inch'
                  ? (lang === 'bn' ? 'ইঞ্চি' : 'Inch')
                  : u === 'mm'
                  ? 'mm'
                  : 'cm'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Preset Buttons Horizontal Carousel */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs text-slate-600">
          <span className="font-semibold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            {t.presets}:
          </span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
          {PRESET_BOXES.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => onLoadPreset(preset.spec)}
              className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 text-slate-800 transition-all shrink-0 text-left"
            >
              <div className="font-bold text-slate-900">
                {lang === 'bn' ? preset.nameBn : preset.nameEn}
              </div>
              <div className="text-[11px] text-slate-500 font-mono-nums">
                {preset.spec.length}&quot;×{preset.spec.width}&quot;×{preset.spec.height}&quot; · {preset.spec.plyCount} Ply
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Carton Construction & Wall Thickness (Ply) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Box Style */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            {t.boxStyle}
          </label>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => onUpdateSpec('boxType', 'rsc')}
              className={`p-2.5 rounded-lg border text-left transition-all ${
                spec.boxType === 'rsc'
                  ? 'bg-amber-50/70 border-amber-500 font-bold text-amber-950'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="font-semibold">{t.rscTitle}</div>
              <div className="text-[10px] text-slate-500 font-normal">
                {lang === 'bn' ? 'স্ট্যান্ডার্ড ৪ ফ্ল্যাপযুক্ত কার্টন' : 'Standard 4-flap shipper'}
              </div>
            </button>

            <button
              type="button"
              onClick={() => onUpdateSpec('boxType', 'die_cut')}
              className={`p-2.5 rounded-lg border text-left transition-all ${
                spec.boxType === 'die_cut'
                  ? 'bg-amber-50/70 border-amber-500 font-bold text-amber-950'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="font-semibold">{t.dieCutTitle}</div>
              <div className="text-[10px] text-slate-500 font-normal">
                {lang === 'bn' ? 'মেইলার / টাক টপ পার্সেল' : 'Tuck top / Mailer box'}
              </div>
            </button>

            <button
              type="button"
              onClick={() => onUpdateSpec('boxType', 'fol')}
              className={`p-2.5 rounded-lg border text-left transition-all ${
                spec.boxType === 'fol'
                  ? 'bg-amber-50/70 border-amber-500 font-bold text-amber-950'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="font-semibold">{t.folTitle}</div>
              <div className="text-[10px] text-slate-500 font-normal">
                {lang === 'bn' ? 'অতিরিক্ত মজবুত ফ্ল্যাপ' : 'Full overlap flaps'}
              </div>
            </button>

            <button
              type="button"
              onClick={() => onUpdateSpec('boxType', 'top_bottom')}
              className={`p-2.5 rounded-lg border text-left transition-all ${
                spec.boxType === 'top_bottom'
                  ? 'bg-amber-50/70 border-amber-500 font-bold text-amber-950'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="font-semibold">{t.topBottomTitle}</div>
              <div className="text-[10px] text-slate-500 font-normal">
                {lang === 'bn' ? 'ক্যাপ ও বটম আলাদা ২ খণ্ড' : 'Telescope 2-piece box'}
              </div>
            </button>
          </div>
        </div>

        {/* Ply Count Selector */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            {t.plyCount}
          </label>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <button
              type="button"
              onClick={() => onSelectPly(3)}
              className={`p-2.5 rounded-lg border text-center transition-all ${
                spec.plyCount === 3
                  ? 'bg-amber-50/70 border-amber-500 font-bold text-amber-950 ring-1 ring-amber-500'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="text-sm font-bold">{t.ply3}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                {lang === 'bn' ? '৩ স্তর · ১টি ফ্লুট' : '3 Layers · 1 Flute'}
              </div>
            </button>

            <button
              type="button"
              onClick={() => onSelectPly(5)}
              className={`p-2.5 rounded-lg border text-center transition-all ${
                spec.plyCount === 5
                  ? 'bg-amber-50/70 border-amber-500 font-bold text-amber-950 ring-1 ring-amber-500'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="text-sm font-bold">{t.ply5}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                {lang === 'bn' ? '৫ স্তর · ২টি ফ্লুট' : '5 Layers · 2 Flutes'}
              </div>
            </button>

            <button
              type="button"
              onClick={() => onSelectPly(7)}
              className={`p-2.5 rounded-lg border text-center transition-all ${
                spec.plyCount === 7
                  ? 'bg-amber-50/70 border-amber-500 font-bold text-amber-950 ring-1 ring-amber-500'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="text-sm font-bold">{t.ply7}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                {lang === 'bn' ? '৭ স্তর · ৩টি ফ্লুট' : '7 Layers · 3 Flutes'}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Dimension Inputs: L, W, H */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          {t.dimensions} ({spec.unit})
        </label>
        <div className="grid grid-cols-3 gap-3">
          {/* Length */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              {t.length}
            </label>
            <div className="relative">
              <input
                type="number"
                min="1"
                step="0.5"
                value={spec.length || ''}
                onChange={(e) => onUpdateSpec('length', Math.max(0.1, Number(e.target.value)))}
                className="w-full text-sm font-mono-nums font-bold bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-mono-nums">
                {spec.unit}
              </span>
            </div>
          </div>

          {/* Width */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              {t.width}
            </label>
            <div className="relative">
              <input
                type="number"
                min="1"
                step="0.5"
                value={spec.width || ''}
                onChange={(e) => onUpdateSpec('width', Math.max(0.1, Number(e.target.value)))}
                className="w-full text-sm font-mono-nums font-bold bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-mono-nums">
                {spec.unit}
              </span>
            </div>
          </div>

          {/* Height */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              {t.height}
            </label>
            <div className="relative">
              <input
                type="number"
                min="1"
                step="0.5"
                value={spec.height || ''}
                onChange={(e) => onUpdateSpec('height', Math.max(0.1, Number(e.target.value)))}
                className="w-full text-sm font-mono-nums font-bold bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-mono-nums">
                {spec.unit}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Flap Allowances Accordion / Settings */}
      <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-700">
            {lang === 'bn' ? 'ফ্ল্যাপ এলাউন্স (জয়েন্ট ও ক্রিজিং):' : 'Flap Allowances:'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-slate-500">{t.flapAllowance}:</span>
            <input
              type="number"
              min="0.5"
              max="5"
              step="0.25"
              value={spec.jointFlapAllowance || ''}
              onChange={(e) => onUpdateSpec('jointFlapAllowance', Number(e.target.value))}
              className="w-16 text-xs font-mono-nums font-semibold bg-slate-50 border border-slate-300 rounded px-2 py-1 text-center text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-600"
            />
            <span className="text-[11px] text-slate-400 font-mono-nums">{spec.unit}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-slate-500">{t.creasingAllowance}:</span>
            <input
              type="number"
              min="0"
              max="2"
              step="0.1"
              value={spec.topBottomFlapAllowance || ''}
              onChange={(e) => onUpdateSpec('topBottomFlapAllowance', Number(e.target.value))}
              className="w-16 text-xs font-mono-nums font-semibold bg-slate-50 border border-slate-300 rounded px-2 py-1 text-center text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-600"
            />
            <span className="text-[11px] text-slate-400 font-mono-nums">{spec.unit}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
