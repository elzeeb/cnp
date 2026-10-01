import { Language } from '../types/carton';
import { BookOpen, Calculator, Check, Layers, ShieldCheck, Ruler } from 'lucide-react';

interface FormulaGuideViewProps {
  lang: Language;
}

export function FormulaGuideView({ lang }: FormulaGuideViewProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <BookOpen className="w-6 h-6 text-amber-700" />
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              {lang === 'bn'
                ? 'করোগেটেড কার্টন রেট ও পরিমাপের ইন্ডাস্ট্রিয়াল ফর্মুলা'
                : 'Corrugated Carton Estimation & Sizing Formula Guide'}
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              {lang === 'bn'
                ? 'বাংলাদেশের প্যাকেজিং শিল্পে ব্যবহৃত আন্তর্জাতিক মানসম্মত সূত্র ও হিসাব'
                : 'Standard industrial packaging mathematical formulas for corrugators and box converters'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* 1. Sheet Size Formula */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <Ruler className="w-4 h-4 text-amber-700" />
              <span>
                {lang === 'bn' ? '১. কার্টন শিট কাটিং সাইজ (Sheet Sizing)' : '1. Sheet Cutting Dimensions'}
              </span>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-lg text-xs font-mono-nums text-slate-800 space-y-2">
              <div>
                <span className="font-bold text-amber-900">Sheet Length:</span>
                <div>= (Length + Width) × 2 + Joint / Flap</div>
                <div className="text-[11px] text-slate-500 font-sans">
                  {lang === 'bn'
                    ? 'সাধারণত পিন স্টিচিং বা পেস্টিংয়ের জন্য ১.৫" থেকে ২" জয়েন্ট এলাউন্স যোগ হয়।'
                    : '1.5" to 2" flap is added for wire stitching or glue lap joint.'}
                </div>
              </div>
              <div className="pt-2 border-t border-slate-100">
                <span className="font-bold text-amber-900">Sheet Width (Deckle):</span>
                <div>= Width + Height + Creasing Allowance</div>
                <div className="text-[11px] text-slate-500 font-sans">
                  {lang === 'bn'
                    ? 'উপরের ফ্ল্যাপ (W/2) + উচ্চতা (H) + নিচের ফ্ল্যাপ (W/2) = Width + Height + ~0.5"'
                    : 'Top flap (W/2) + Height (H) + Bottom flap (W/2) = Width + Height + ~0.5" creasing.'}
                </div>
              </div>
            </div>
          </div>

          {/* 2. Weight Formula */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <Calculator className="w-4 h-4 text-amber-700" />
              <span>
                {lang === 'bn' ? '২. প্রতি কার্টনের ওজন নির্ণয় (Carton Net Weight)' : '2. Box Net Weight Formula'}
              </span>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-lg text-xs font-mono-nums text-slate-800 space-y-2">
              <div>
                <span className="font-bold text-amber-900">Sheet Area (m²):</span>
                <div>= (Sheet Length in mm / 1000) × (Sheet Width in mm / 1000)</div>
              </div>
              <div className="pt-2 border-t border-slate-100">
                <span className="font-bold text-amber-900">Layer Weight (Grams):</span>
                <div>= Sheet Area (m²) × GSM × Take-Up Factor</div>
              </div>
              <div className="pt-2 border-t border-slate-100">
                <span className="font-bold text-amber-900">Total Weight (kg):</span>
                <div>= Sum of all layers weight in grams / 1000</div>
              </div>
            </div>
          </div>

          {/* 3. Fluting Take-up Ratio */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <Layers className="w-4 h-4 text-amber-700" />
              <span>
                {lang === 'bn' ? '৩. ফ্লুটিং টেক-আপ ফ্যাক্টর (Take-Up Ratio)' : '3. Fluting Take-Up Factor'}
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === 'bn'
                ? 'করোগেটেড কার্টনের মাঝখানের ঢেউখেলানো বা তরঙ্গায়িত কাগজ সাধারণ সমতল কাগজের চেয়ে বেশি লাগে। একে Take-up Factor বা ড্র-রেশিও বলা হয়:'
                : 'Corrugation fluting waves require extra paper length compared to flat liners:'}
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <div className="font-bold text-slate-900">B Flute (~3.0 mm)</div>
                <div className="font-mono-nums text-amber-800 font-semibold">Factor: 1.32 - 1.35x</div>
                <div className="text-[11px] text-slate-500">
                  {lang === 'bn' ? 'মজবুত ক্রাশ রেসিস্ট্যান্স' : 'High crush resistance'}
                </div>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <div className="font-bold text-slate-900">C Flute (~4.0 mm)</div>
                <div className="font-mono-nums text-amber-800 font-semibold">Factor: 1.40 - 1.45x</div>
                <div className="text-[11px] text-slate-500">
                  {lang === 'bn' ? 'সর্বোচ্চ কুশনিং ও স্ট্যাকিং' : 'Excellent stacking'}
                </div>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <div className="font-bold text-slate-900">E Flute (~1.5 mm)</div>
                <div className="font-mono-nums text-amber-800 font-semibold">Factor: 1.25 - 1.30x</div>
                <div className="text-[11px] text-slate-500">
                  {lang === 'bn' ? 'ডাই-কাট ও প্রিন্টিং' : 'Micro-flute & mailers'}
                </div>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <div className="font-bold text-slate-900">BC Double Wall</div>
                <div className="font-mono-nums text-amber-800 font-semibold">Factor: ~1.38x avg</div>
                <div className="text-[11px] text-slate-500">
                  {lang === 'bn' ? 'হেভি ডিউটি এক্সপোর্ট' : 'Heavy export boxes'}
                </div>
              </div>
            </div>
          </div>

          {/* 4. Bursting Strength & Quality */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span>
                {lang === 'bn' ? '৪. বাস্টিং স্ট্রেন্থ ও বাস্ট ফ্যাক্টর (BS & BF)' : '4. Bursting Strength (BS/BF)'}
              </span>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-lg text-xs font-mono-nums text-slate-800 space-y-2">
              <div>
                <span className="font-bold text-amber-900">BS (Bursting Strength in kg/cm²):</span>
                <div>= (GSM × Burst Factor [BF]) / 1000</div>
              </div>
              <div className="pt-2 border-t border-slate-100 font-sans text-slate-600 text-[11px] space-y-1">
                <div>
                  <span className="font-semibold text-slate-900">আমদানি ক্রাফট পেপার (Virgin Kraft):</span>{' '}
                  ১৮ থেকে ২৪ BF
                </div>
                <div>
                  <span className="font-semibold text-slate-900">সেমি ক্রাফট / টেস্ট লাইনার:</span>{' '}
                  ১৪ থেকে ১৮ BF
                </div>
                <div>
                  <span className="font-semibold text-slate-900">লোকাল বা মিডিয়াম পেপার:</span>{' '}
                  ১০ থেকে ১২ BF
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
