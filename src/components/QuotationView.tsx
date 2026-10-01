import { useState } from 'react';
import { CartonSpec, CalculationResult, Language } from '../types/carton';
import { formatCurrency, formatNumber } from '../utils/calculator';
import { translations } from '../utils/i18n';
import { Printer, Download, ArrowLeft, Building2, Phone, Mail, MapPin } from 'lucide-react';

interface QuotationViewProps {
  spec: CartonSpec;
  result: CalculationResult;
  lang: Language;
  onBackToCalculator: () => void;
}

export function QuotationView({
  spec,
  result,
  lang,
  onBackToCalculator,
}: QuotationViewProps) {
  const t = translations[lang];

  // Editable company info
  const [supplierName, setSupplierName] = useState('প্যাকার্স কার্টন ইন্ডাস্ট্রিজ লিঃ (Packers Carton Industries Ltd.)');
  const [supplierAddress, setSupplierAddress] = useState('প্লট # ১২, বিসিক শিল্পনগরী, টঙ্গী, গাজীপুর, বাংলাদেশ');
  const [supplierContact, setSupplierContact] = useState('+880 1712-345678 | info@packerscarton.com');
  const [quoteNo, setQuoteNo] = useState(`QT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
  const [quoteDate, setQuoteDate] = useState(new Date().toISOString().split('T')[0]);
  const [validDays, setValidDays] = useState('15');

  const todayStr = new Date(quoteDate).toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="space-y-6">
      {/* Top action bar (hidden on print) */}
      <div className="no-print bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <button
          type="button"
          onClick={onBackToCalculator}
          className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{lang === 'bn' ? 'ক্যালকুলেটরে ফিরে যান' : 'Back to Calculator'}</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-2 shadow-xs"
          >
            <Printer className="w-4 h-4" />
            <span>{t.printQuote}</span>
          </button>
        </div>
      </div>

      {/* Official Printable Quotation Document */}
      <div className="bg-white border border-slate-300 rounded-xl p-8 sm:p-12 shadow-sm max-w-4xl mx-auto text-slate-900 print:border-none print:shadow-none print:p-0">
        {/* Header with Supplier Logo & Info */}
        <div className="border-b-2 border-slate-900 pb-6 flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight text-slate-900">
                {supplierName}
              </span>
            </div>
            <div className="text-xs text-slate-600 mt-1 flex flex-col gap-0.5">
              <span>{supplierAddress}</span>
              <span>{supplierContact}</span>
            </div>
          </div>

          <div className="text-right sm:self-start">
            <span className="inline-block text-xs uppercase tracking-wider font-extrabold bg-slate-900 text-white px-3 py-1 rounded-sm">
              {lang === 'bn' ? 'মূল্য কোটেশন' : 'PRICE QUOTATION'}
            </span>
            <div className="text-xs text-slate-600 mt-2 space-y-0.5">
              <div>
                <span className="text-slate-500 font-medium">Ref No: </span>
                <span className="font-mono-nums font-bold text-slate-900">{quoteNo}</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Date: </span>
                <span className="font-mono-nums text-slate-900">{todayStr}</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Validity: </span>
                <span className="text-slate-900">{validDays} {lang === 'bn' ? 'দিন' : 'Days'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Client & Buyer Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6 p-4 bg-slate-50/70 border border-slate-200 rounded-lg text-xs">
          <div>
            <span className="font-bold text-slate-800 uppercase tracking-wide block mb-1 text-[11px]">
              {lang === 'bn' ? 'প্রাপক / বায়ারের তথ্য' : 'Quotation Issued To:'}
            </span>
            <div className="text-sm font-bold text-slate-900">{spec.clientName || 'N/A'}</div>
            <div className="text-slate-600 mt-1">
              <span className="font-medium text-slate-500">Project / Description: </span>
              {spec.projectName || 'Corrugated Packaging Carton'}
            </div>
            {spec.poNumber && (
              <div className="text-slate-600 mt-0.5">
                <span className="font-medium text-slate-500">PO / Reference: </span>
                <span className="font-mono-nums font-medium text-slate-900">{spec.poNumber}</span>
              </div>
            )}
          </div>

          <div>
            <span className="font-bold text-slate-800 uppercase tracking-wide block mb-1 text-[11px]">
              {lang === 'bn' ? 'স্পেসিফিকেশন সারসংক্ষেপ' : 'Packaging Specifications:'}
            </span>
            <div className="space-y-1 text-slate-700">
              <div>
                <span className="font-medium text-slate-500">Box Style: </span>
                <span className="font-semibold text-slate-900 uppercase">{spec.boxType}</span>
                <span> ({spec.plyCount} Ply)</span>
              </div>
              <div>
                <span className="font-medium text-slate-500">Inner Dimensions (L×W×H): </span>
                <span className="font-mono-nums font-bold text-slate-900">
                  {spec.length}&quot; × {spec.width}&quot; × {spec.height}&quot; {spec.unit}
                </span>
              </div>
              <div>
                <span className="font-medium text-slate-500">Sheet Cutting Size: </span>
                <span className="font-mono-nums">
                  {result.sheetLengthInches}&quot; × {result.sheetWidthInches}&quot; ({result.sheetLengthMm} × {result.sheetWidthMm} mm)
                </span>
              </div>
              <div>
                <span className="font-medium text-slate-500">Net Weight & Strength: </span>
                <span className="font-mono-nums font-semibold">
                  ~{result.weightPerBoxGram} g / box · BS ~{result.estimatedBurstingStrength} kg/cm²
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Paper Layer Breakdown Table in Quotation */}
        <div className="mb-6">
          <span className="text-xs font-bold text-slate-900 block mb-2">
            {lang === 'bn' ? 'কাগজের বিস্তারিত গঠন ও জিএসএম' : 'Detailed Paper Composition & GSM:'}
          </span>
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100/90 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">{lang === 'bn' ? 'স্তর' : 'Layer'}</th>
                  <th className="py-2.5 px-3">{lang === 'bn' ? 'কাগজের গ্রেড' : 'Paper Grade'}</th>
                  <th className="py-2.5 px-3 text-center">{lang === 'bn' ? 'জিএসএম' : 'GSM'}</th>
                  <th className="py-2.5 px-3 text-center">{lang === 'bn' ? 'ফ্লুট গঠন' : 'Wave Structure'}</th>
                  <th className="py-2.5 px-3 text-right">{lang === 'bn' ? 'প্রতি কার্টন পেপার' : 'Paper / Box'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {result.layers.map((l) => (
                  <tr key={l.id}>
                    <td className="py-2 px-3 font-medium text-slate-900">
                      {lang === 'bn' ? l.nameBn : l.name}
                    </td>
                    <td className="py-2 px-3">
                      {lang === 'bn' ? l.paperTypeBn : l.paperType}
                    </td>
                    <td className="py-2 px-3 text-center font-mono-nums font-semibold">
                      {l.gsm}
                    </td>
                    <td className="py-2 px-3 text-center font-mono-nums">
                      {l.isFlute ? `${l.takeUpFactor}x Flute Wave` : 'Flat Liner'}
                    </td>
                    <td className="py-2 px-3 text-right font-mono-nums">
                      {Math.round(l.weightPerBoxGram)} g
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Price & Quantity Table */}
        <div className="mb-6">
          <span className="text-xs font-bold text-slate-900 block mb-2">
            {lang === 'bn' ? 'দর ও মোট মূল্য তালিকা' : 'Commercial Offer & Rate:'}
          </span>
          <div className="border border-slate-300 rounded-lg overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-900 text-white font-semibold">
                <tr>
                  <th className="py-3 px-4">{lang === 'bn' ? 'আইটেম বিবরণ' : 'Description'}</th>
                  <th className="py-3 px-4 text-center">{lang === 'bn' ? 'পরিমাণ' : 'Quantity'}</th>
                  <th className="py-3 px-4 text-right">{lang === 'bn' ? 'দর (প্রতি কার্টন)' : 'Rate / Carton'}</th>
                  <th className="py-3 px-4 text-right">{lang === 'bn' ? 'মোট মূল্য' : 'Total Amount'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    <div>{spec.projectName || 'Corrugated Packaging Carton'}</div>
                    <div className="text-[11px] text-slate-500 font-normal mt-0.5">
                      {spec.plyCount} Ply {spec.boxType.toUpperCase()} · {spec.length}&quot;×{spec.width}&quot;×{spec.height}&quot; · {spec.printingType !== 'none' ? spec.printingType.replace('_', ' ') + ' Flexo' : 'Plain'} · {spec.stitchingPastingType}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono-nums font-bold text-slate-800">
                    {formatNumber(spec.orderQuantity, 0)} Pcs
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono-nums font-bold text-slate-900 text-sm">
                    {formatCurrency(result.finalSellingPricePerBox, spec.currency)}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono-nums font-extrabold text-slate-950 text-base">
                    {formatCurrency(result.totalOrderAmount, spec.currency)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Notes & Terms */}
        <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50 mb-8 text-xs space-y-2">
          <span className="font-bold text-slate-900 block">
            {t.termsAndConditions}:
          </span>
          <ul className="space-y-1 text-slate-600 list-disc list-inside">
            <li>{t.term1}</li>
            <li>{t.term2}</li>
            <li>{t.term3}</li>
            <li>{t.term4}</li>
            {spec.notes && (
              <li className="text-slate-800 font-medium">
                {lang === 'bn' ? 'বিশেষ দ্রষ্টব্য: ' : 'Special Note: '}
                {spec.notes}
              </li>
            )}
          </ul>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-2 gap-12 pt-8 border-t border-slate-200 text-xs">
          <div>
            <div className="border-t border-slate-400 w-44 pt-1 text-center font-semibold text-slate-800">
              {t.authorizedSignature}
            </div>
            <div className="text-[11px] text-slate-500 text-center w-44">
              {supplierName}
            </div>
          </div>

          <div className="flex flex-col items-end">
            <div className="border-t border-slate-400 w-44 pt-1 text-center font-semibold text-slate-800">
              {t.acceptedByCustomer}
            </div>
            <div className="text-[11px] text-slate-500 text-center w-44">
              {spec.clientName || 'Buyer Signatory'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
