/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import {
  CartonSpec,
  CalculationResult,
  Language,
  Currency,
  PlyCount,
  SavedQuote,
} from './types/carton';
import {
  DEFAULT_SPEC,
  calculateCartonRate,
  generateDefaultLayers,
} from './utils/calculator';
import { Header } from './components/Header';
import { DimensionInputs } from './components/DimensionInputs';
import { BoxVisualizer } from './components/BoxVisualizer';
import { LayerConfigurator } from './components/LayerConfigurator';
import { ProcessingCosts } from './components/ProcessingCosts';
import { CostSummaryCard } from './components/CostSummaryCard';
import { ReelRequirementView } from './components/ReelRequirementView';
import { QuotationView } from './components/QuotationView';
import { SavedQuotesModal } from './components/SavedQuotesModal';
import { FormulaGuideView } from './components/FormulaGuideView';
import { CheckCircle2, RotateCcw } from 'lucide-react';

export default function App() {
  // Language & Currency State
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('carton_rate_lang');
    return (saved as Language) || 'bn';
  });

  const [currency, setCurrency] = useState<Currency>(() => {
    const saved = localStorage.getItem('carton_rate_currency');
    return (saved as Currency) || 'BDT';
  });

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    'calculator' | 'reel_plan' | 'quotation' | 'saved' | 'guide'
  >('calculator');

  // Carton Specification State
  const [spec, setSpec] = useState<CartonSpec>(() => {
    const saved = localStorage.getItem('carton_rate_current_spec');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved spec', e);
      }
    }
    return DEFAULT_SPEC;
  });

  // Saved Quotes List
  const [savedQuotes, setSavedQuotes] = useState<SavedQuote[]>(() => {
    const saved = localStorage.getItem('carton_rate_saved_quotes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved quotes', e);
      }
    }
    return [];
  });

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Persist current spec & settings
  useEffect(() => {
    localStorage.setItem('carton_rate_current_spec', JSON.stringify(spec));
  }, [spec]);

  useEffect(() => {
    localStorage.setItem('carton_rate_lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('carton_rate_currency', currency);
    setSpec((prev) => ({ ...prev, currency }));
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('carton_rate_saved_quotes', JSON.stringify(savedQuotes));
  }, [savedQuotes]);

  // Live Calculation Output
  const calculationResult: CalculationResult = useMemo(() => {
    return calculateCartonRate(spec);
  }, [spec]);

  // Spec Updaters
  const handleUpdateSpec = <K extends keyof CartonSpec>(key: K, value: CartonSpec[K]) => {
    setSpec((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSelectPly = (ply: PlyCount) => {
    setSpec((prev) => ({
      ...prev,
      plyCount: ply,
      layers: generateDefaultLayers(ply),
    }));
    showToast(
      lang === 'bn'
        ? `${ply}-প্লাই কার্টন স্তর লোড করা হয়েছে`
        : `Switched to ${ply}-Ply carton structure`
    );
  };

  const handleUpdateLayer = (index: number, field: string, value: string | number) => {
    setSpec((prev) => {
      const nextLayers = [...prev.layers];
      nextLayers[index] = {
        ...nextLayers[index],
        [field]: value,
      };
      return {
        ...prev,
        layers: nextLayers,
      };
    });
  };

  const handleQuickApplyRates = (linerRate: number, fluteRate: number) => {
    setSpec((prev) => {
      const nextLayers = prev.layers.map((l) => ({
        ...l,
        ratePerKg: l.isFlute ? fluteRate : linerRate,
      }));
      return {
        ...prev,
        layers: nextLayers,
      };
    });
    showToast(
      lang === 'bn'
        ? `পেপার রেট আপডেট: লাইনার ${linerRate}৳, ফ্লুট ${fluteRate}৳`
        : `Updated rates: Liner ${linerRate}, Flute ${fluteRate}`
    );
  };

  const handleLoadPreset = (presetSpec: Partial<CartonSpec>) => {
    setSpec((prev) => {
      const ply = presetSpec.plyCount || prev.plyCount;
      const nextLayers =
        ply !== prev.plyCount ? generateDefaultLayers(ply) : prev.layers;

      return {
        ...prev,
        ...presetSpec,
        layers: nextLayers,
      };
    });
    showToast(
      lang === 'bn' ? 'প্রিসেট লোড সফল হয়েছে' : 'Box preset loaded successfully'
    );
  };

  const handleResetDefaults = () => {
    setSpec(DEFAULT_SPEC);
    showToast(
      lang === 'bn' ? 'ডিফল্ট সেটিংসে রিসেট করা হয়েছে' : 'Reset to default specifications'
    );
  };

  const handleSaveQuote = () => {
    const newQuote: SavedQuote = {
      id: `quote-${Date.now()}`,
      title: spec.projectName || 'Packaging Carton',
      clientName: spec.clientName || 'Unnamed Client',
      projectName: spec.projectName || 'Carton Box',
      createdAt: new Date().toISOString(),
      spec: { ...spec },
      result: calculationResult,
    };

    setSavedQuotes((prev) => [newQuote, ...prev]);
    showToast(
      lang === 'bn'
        ? 'কোটেশন সফলভাবে সংরক্ষণ করা হয়েছে'
        : 'Quotation saved successfully'
    );
  };

  const handleDeleteQuote = (id: string) => {
    setSavedQuotes((prev) => prev.filter((q) => q.id !== id));
    showToast(
      lang === 'bn' ? 'কোটেশন মুছে ফেলা হয়েছে' : 'Quotation removed'
    );
  };

  const handleDuplicateQuote = (quote: SavedQuote) => {
    const dup: SavedQuote = {
      ...quote,
      id: `quote-${Date.now()}`,
      projectName: `${quote.projectName} (Copy)`,
      createdAt: new Date().toISOString(),
    };
    setSavedQuotes((prev) => [dup, ...prev]);
    showToast(
      lang === 'bn' ? 'কোটেশন ডুপ্লিকেট করা হয়েছে' : 'Quotation duplicated'
    );
  };

  const handleLoadSavedQuote = (quote: SavedQuote) => {
    setSpec(quote.spec);
    setActiveTab('calculator');
    showToast(
      lang === 'bn'
        ? `কোটেশন "${quote.projectName}" লোড করা হয়েছে`
        : `Loaded quotation: "${quote.projectName}"`
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        lang={lang}
        onToggleLang={() => setLang((prev) => (prev === 'bn' ? 'en' : 'bn'))}
        currency={currency}
        onToggleCurrency={setCurrency}
        savedCount={savedQuotes.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {/* Toast alert */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 text-xs font-semibold animate-fade-in border border-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Tab 1: Rate Calculator */}
        {activeTab === 'calculator' && (
          <div className="space-y-6">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-slate-200 rounded-xl px-5 py-3 shadow-xs">
              <div className="text-xs text-slate-600">
                <span className="font-bold text-slate-800">CartonRate</span> ·{' '}
                <span>
                  {lang === 'bn'
                    ? 'করোগেটেড কার্টন বক্স রেট ও খরচ হিসাব ইঞ্জিন'
                    : 'Corrugated Carton Box Estimation & Rate Engine'}
                </span>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center">
                <button
                  type="button"
                  onClick={handleResetDefaults}
                  className="px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors flex items-center gap-1.5"
                  title={lang === 'bn' ? 'রিসেট' : 'Reset'}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'রিসেট' : 'Reset'}</span>
                </button>
              </div>
            </div>

            {/* Split Screen Grid: Left Controls, Right Summary & Visualizer */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Form Controls (7 cols on lg) */}
              <div className="lg:col-span-7 space-y-6">
                {/* 1. Box Dimensions & Style */}
                <DimensionInputs
                  spec={spec}
                  lang={lang}
                  onUpdateSpec={handleUpdateSpec}
                  onSelectPly={handleSelectPly}
                  onLoadPreset={handleLoadPreset}
                />

                {/* 2. Paper Layers & GSM */}
                <LayerConfigurator
                  spec={spec}
                  result={calculationResult}
                  lang={lang}
                  onUpdateLayer={handleUpdateLayer}
                  onQuickApplyRates={handleQuickApplyRates}
                />

                {/* 3. Manufacturing, Finishing & Overhead */}
                <ProcessingCosts
                  spec={spec}
                  lang={lang}
                  onUpdateSpec={handleUpdateSpec}
                />
              </div>

              {/* Right Column: Visualizer & Summary Card (5 cols on lg) */}
              <div className="lg:col-span-5 space-y-6">
                {/* Visual 3D Box & Sheet Visualizer */}
                <BoxVisualizer
                  spec={spec}
                  result={calculationResult}
                  lang={lang}
                />

                {/* Sticky Cost Summary & Breakdown */}
                <CostSummaryCard
                  spec={spec}
                  result={calculationResult}
                  lang={lang}
                  onSaveQuote={handleSaveQuote}
                  onGoToQuotation={() => setActiveTab('quotation')}
                  onGoToReelPlan={() => setActiveTab('reel_plan')}
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Paper Reel Requirement Plan */}
        {activeTab === 'reel_plan' && (
          <ReelRequirementView
            spec={spec}
            result={calculationResult}
            lang={lang}
          />
        )}

        {/* Tab 3: Official Printable Quotation */}
        {activeTab === 'quotation' && (
          <QuotationView
            spec={spec}
            result={calculationResult}
            lang={lang}
            onBackToCalculator={() => setActiveTab('calculator')}
          />
        )}

        {/* Tab 4: Saved Quotations & History */}
        {activeTab === 'saved' && (
          <SavedQuotesModal
            savedQuotes={savedQuotes}
            lang={lang}
            onLoadQuote={handleLoadSavedQuote}
            onDeleteQuote={handleDeleteQuote}
            onDuplicateQuote={handleDuplicateQuote}
            onClose={() => setActiveTab('calculator')}
          />
        )}

        {/* Tab 5: Formula & Corrugation Guide */}
        {activeTab === 'guide' && <FormulaGuideView lang={lang} />}
      </main>

      {/* Footer */}
      <footer className="no-print bg-white border-t border-slate-200 mt-12 py-5 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <strong className="text-slate-800">CartonRate</strong> —{' '}
            {lang === 'bn'
              ? 'করোগেটেড কার্টন বক্স রেট ও খরচ ক্যালকুলেটর'
              : 'Corrugated Packaging Rate & Estimation Suite'}
          </div>
          <div className="text-slate-400">
            {lang === 'bn'
              ? 'প্যাকেজিং কারখানা, মার্চেন্ডাইজার ও বায়ারদের জন্য প্রস্তুতকৃত'
              : 'Built for packaging mills, box converters, and export merchandisers'}
          </div>
        </div>
      </footer>
    </div>
  );
}
