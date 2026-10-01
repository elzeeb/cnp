import { useState } from 'react';
import { SavedQuote, Language } from '../types/carton';
import { formatCurrency, formatNumber } from '../utils/calculator';
import { Bookmark, Search, Trash2, ArrowUpRight, Copy, Calendar, Layers, Box } from 'lucide-react';

interface SavedQuotesModalProps {
  savedQuotes: SavedQuote[];
  lang: Language;
  onLoadQuote: (quote: SavedQuote) => void;
  onDeleteQuote: (id: string) => void;
  onDuplicateQuote: (quote: SavedQuote) => void;
  onClose: () => void;
}

export function SavedQuotesModal({
  savedQuotes,
  lang,
  onLoadQuote,
  onDeleteQuote,
  onDuplicateQuote,
  onClose,
}: SavedQuotesModalProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredQuotes = savedQuotes.filter((q) => {
    const term = searchTerm.toLowerCase();
    return (
      q.clientName.toLowerCase().includes(term) ||
      q.projectName.toLowerCase().includes(term) ||
      q.spec.poNumber.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-4">
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-amber-700" />
              <span>
                {lang === 'bn' ? 'সংরক্ষিত কোটেশন ও হিস্ট্রি' : 'Saved Quotations & Order History'}
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {lang === 'bn'
                ? 'পূর্বে তৈরিকৃত কোটেশনগুলো দেখুন, পুনরায় লোড করুন বা ডুপ্লিকেট করুন'
                : 'Browse, re-open or duplicate previously saved carton calculations'}
            </p>
          </div>

          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={lang === 'bn' ? 'ক্লায়েন্ট বা প্রজেক্ট খুঁজুন...' : 'Search client, project...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-600 focus:bg-white"
            />
          </div>
        </div>

        {filteredQuotes.length === 0 ? (
          <div className="py-12 text-center text-slate-500 space-y-2">
            <Box className="w-10 h-10 text-slate-300 mx-auto" />
            <div className="text-sm font-semibold text-slate-700">
              {lang === 'bn' ? 'কোন সংরক্ষিত কোটেশন পাওয়া যায়নি' : 'No Saved Quotations Found'}
            </div>
            <p className="text-xs max-w-sm mx-auto text-slate-400">
              {lang === 'bn'
                ? 'ক্যালকুলেটরে হিসাব করার পর "কোটেশন সেভ" বাটনে ক্লিক করে এখানে জমা রাখুন।'
                : 'After calculating box rates, click "Save Quote" to keep records here.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-4">
            {filteredQuotes.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-slate-50/70 border border-slate-200 hover:border-amber-300 rounded-xl transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-sm font-bold text-slate-900 line-clamp-1">
                      {item.projectName || item.spec.projectName || 'Packaging Box'}
                    </div>
                    <div className="text-xs font-semibold text-amber-900 line-clamp-1">
                      {item.clientName || item.spec.clientName || 'Unnamed Client'}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-base font-extrabold font-mono-nums text-slate-950">
                      {formatCurrency(item.result.finalSellingPricePerBox, item.spec.currency)}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      / {lang === 'bn' ? 'কার্টন' : 'box'}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600">
                  <span className="flex items-center gap-1">
                    <Box className="w-3.5 h-3.5 text-slate-400" />
                    <span>
                      {item.spec.length}&quot;×{item.spec.width}&quot;×{item.spec.height}&quot;
                    </span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.spec.plyCount} Ply</span>
                  </span>
                  <span>·</span>
                  <span className="font-mono-nums">
                    {formatNumber(item.spec.orderQuantity, 0)} Pcs
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                  </span>
                </div>

                <div className="pt-2.5 border-t border-slate-200/70 flex items-center justify-between">
                  <div className="text-xs text-slate-500">
                    {lang === 'bn' ? 'মোট:' : 'Total:'}{' '}
                    <strong className="font-mono-nums text-slate-800">
                      {formatCurrency(item.result.totalOrderAmount, item.spec.currency)}
                    </strong>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => onDuplicateQuote(item)}
                      title={lang === 'bn' ? 'কপি বা ডুপ্লিকেট করুন' : 'Duplicate'}
                      className="p-1.5 text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-md transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteQuote(item.id)}
                      title={lang === 'bn' ? 'ডিলিট করুন' : 'Delete'}
                      className="p-1.5 text-rose-600 hover:text-rose-700 bg-white hover:bg-rose-50 border border-slate-200 rounded-md transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onLoadQuote(item);
                        onClose();
                      }}
                      className="px-3 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors flex items-center gap-1 shadow-2xs"
                    >
                      <span>{lang === 'bn' ? 'লোড করুন' : 'Load'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
