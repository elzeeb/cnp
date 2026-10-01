import { Language, Currency } from '../types/carton';
import { translations } from '../utils/i18n';
import { Box, Printer, Globe } from 'lucide-react';

interface HeaderProps {
  activeTab: 'calculator' | 'reel_plan' | 'quotation' | 'saved' | 'guide';
  onSelectTab: (tab: 'calculator' | 'reel_plan' | 'quotation' | 'saved' | 'guide') => void;
  lang: Language;
  onToggleLang: () => void;
  currency: Currency;
  onToggleCurrency: (c: Currency) => void;
  savedCount: number;
}

export function Header({
  activeTab,
  onSelectTab,
  lang,
  onToggleLang,
  currency,
  onToggleCurrency,
  savedCount,
}: HeaderProps) {
  const t = translations[lang];

  return (
    <header className="no-print bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand wordmark */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onSelectTab('calculator')}
            className="flex items-center gap-2.5 text-left focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-700 flex items-center justify-center text-white shadow-xs">
              <Box className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              CartonRate
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => onSelectTab('calculator')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'calculator'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.tabCalculator}
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('reel_plan')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'reel_plan'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.tabReelPlan}
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('quotation')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'quotation'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.tabQuotation}
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('saved')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors relative ${
              activeTab === 'saved'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>{t.tabSaved}</span>
            {savedCount > 0 && (
              <span className="ml-1.5 text-[10px] font-mono-nums bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded-full font-bold">
                {savedCount}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('guide')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'guide'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.tabGuide}
          </button>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2">
          {/* Currency Toggle */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-semibold text-slate-600">
            <button
              type="button"
              onClick={() => onToggleCurrency('BDT')}
              className={`px-2 py-1 rounded-md transition-colors font-mono-nums ${
                currency === 'BDT' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              ৳ BDT
            </button>
            <button
              type="button"
              onClick={() => onToggleCurrency('USD')}
              className={`px-2 py-1 rounded-md transition-colors font-mono-nums ${
                currency === 'USD' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              $ USD
            </button>
          </div>

          {/* Language Toggle */}
          <button
            type="button"
            onClick={onToggleLang}
            className="px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
            title="Toggle Language / ভাষা পরিবর্তন"
          >
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            <span>{lang === 'bn' ? 'বাংলা' : 'EN'}</span>
          </button>

          {/* Print Button */}
          <button
            type="button"
            onClick={() => {
              if (activeTab !== 'quotation') onSelectTab('quotation');
              setTimeout(() => window.print(), 200);
            }}
            className="px-3 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs whitespace-nowrap"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{lang === 'bn' ? 'প্রিন্ট' : 'Print'}</span>
          </button>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="flex md:hidden overflow-x-auto px-4 py-2 border-t border-slate-100 gap-1 bg-slate-50 text-xs">
        <button
          type="button"
          onClick={() => onSelectTab('calculator')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
            activeTab === 'calculator' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600'
          }`}
        >
          {t.tabCalculator}
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('reel_plan')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
            activeTab === 'reel_plan' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600'
          }`}
        >
          {t.tabReelPlan}
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('quotation')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
            activeTab === 'quotation' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600'
          }`}
        >
          {t.tabQuotation}
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('saved')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
            activeTab === 'saved' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600'
          }`}
        >
          {t.tabSaved} {savedCount > 0 && `(${savedCount})`}
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('guide')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
            activeTab === 'guide' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600'
          }`}
        >
          {t.tabGuide}
        </button>
      </div>
    </header>
  );
}
