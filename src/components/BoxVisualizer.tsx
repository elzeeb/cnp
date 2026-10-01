import { useState } from 'react';
import { CartonSpec, CalculationResult, Language } from '../types/carton';
import { Box, Layers, Scissors } from 'lucide-react';

interface BoxVisualizerProps {
  spec: CartonSpec;
  result: CalculationResult;
  lang: Language;
}

export function BoxVisualizer({ spec, result, lang }: BoxVisualizerProps) {
  const [viewMode, setViewMode] = useState<'3d' | 'flutes' | 'sheet'>('3d');

  // Normalized scaling for 3D box projection
  const maxDim = Math.max(spec.length, spec.width, spec.height, 1);
  const scale = 140 / maxDim;
  const l = Math.min(Math.max(spec.length * scale, 45), 180);
  const w = Math.min(Math.max(spec.width * scale, 35), 130);
  const h = Math.min(Math.max(spec.height * scale, 35), 130);

  // Isometric angle projection coordinates
  const originX = 140;
  const originY = 175;

  // Front corner bottom:
  const frontBottom = { x: originX, y: originY };
  // Front corner top:
  const frontTop = { x: originX, y: originY - h };
  // Left corner bottom:
  const leftBottom = { x: originX - l * 0.866, y: originY - l * 0.5 };
  // Left corner top:
  const leftTop = { x: originX - l * 0.866, y: originY - h - l * 0.5 };
  // Right corner bottom:
  const rightBottom = { x: originX + w * 0.866, y: originY - w * 0.5 };
  // Right corner top:
  const rightTop = { x: originX + w * 0.866, y: originY - h - w * 0.5 };
  // Back corner top:
  const backTop = {
    x: originX - l * 0.866 + w * 0.866,
    y: originY - h - l * 0.5 - w * 0.5,
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <Box className="w-4 h-4 text-amber-700" />
          <span className="text-sm font-semibold text-slate-800">
            {lang === 'bn' ? 'বক্স ও শিট ভিজ্যুয়ালাইজার' : 'Box & Sheet Visualizer'}
          </span>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-medium text-slate-600">
          <button
            type="button"
            onClick={() => setViewMode('3d')}
            className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 ${
              viewMode === '3d' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            <Box className="w-3 h-3" />
            <span>{lang === 'bn' ? '৩ডি বক্স' : '3D Box'}</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('flutes')}
            className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 ${
              viewMode === 'flutes' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            <Layers className="w-3 h-3" />
            <span>{lang === 'bn' ? 'প্লাই স্তর' : 'Ply Layers'}</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('sheet')}
            className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 ${
              viewMode === 'sheet' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            <Scissors className="w-3 h-3" />
            <span>{lang === 'bn' ? 'কাটিং শিট' : 'Sheet Cut'}</span>
          </button>
        </div>
      </div>

      {viewMode === '3d' && (
        <div className="relative flex flex-col items-center justify-center bg-radial from-amber-50/50 via-slate-50 to-slate-100/70 rounded-lg p-2 overflow-hidden border border-slate-100">
          <svg
            viewBox="0 0 280 220"
            className="w-full max-w-[280px] h-[210px] drop-shadow-sm select-none"
          >
            <defs>
              <linearGradient id="kraftFront" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d99b5e" />
                <stop offset="100%" stopColor="#bd7d3e" />
              </linearGradient>
              <linearGradient id="kraftSide" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#bf8145" />
                <stop offset="100%" stopColor="#9a5f27" />
              </linearGradient>
              <linearGradient id="kraftTop" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#eec18e" />
                <stop offset="100%" stopColor="#d99b5e" />
              </linearGradient>
            </defs>

            {/* Left face */}
            <polygon
              points={`${frontBottom.x},${frontBottom.y} ${leftBottom.x},${leftBottom.y} ${leftTop.x},${leftTop.y} ${frontTop.x},${frontTop.y}`}
              fill="url(#kraftFront)"
              stroke="#8a4f1a"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />

            {/* Right face */}
            <polygon
              points={`${frontBottom.x},${frontBottom.y} ${rightBottom.x},${rightBottom.y} ${rightTop.x},${rightTop.y} ${frontTop.x},${frontTop.y}`}
              fill="url(#kraftSide)"
              stroke="#8a4f1a"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />

            {/* Top face / flaps */}
            <polygon
              points={`${frontTop.x},${frontTop.y} ${leftTop.x},${leftTop.y} ${backTop.x},${backTop.y} ${rightTop.x},${rightTop.y}`}
              fill="url(#kraftTop)"
              stroke="#8a4f1a"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />

            {/* Center seam / tape line on top flaps */}
            <line
              x1={frontTop.x}
              y1={frontTop.y}
              x2={backTop.x}
              y2={backTop.y}
              stroke="#754314"
              strokeWidth="1.5"
              strokeDasharray="4 2"
            />

            {/* Stitching or print marks representation */}
            {spec.stitchingPastingType === 'stitching' && (
              <g stroke="#334155" strokeWidth="2" strokeLinecap="round">
                <line x1={frontBottom.x - 4} y1={frontBottom.y - 12} x2={frontBottom.x + 3} y2={frontBottom.y - 15} />
                <line x1={frontBottom.x - 4} y1={frontBottom.y - 28} x2={frontBottom.x + 3} y2={frontBottom.y - 31} />
                <line x1={frontBottom.x - 4} y1={frontBottom.y - 44} x2={frontBottom.x + 3} y2={frontBottom.y - 47} />
              </g>
            )}

            {/* Dimension Lines & Labels */}
            {/* Height (H) */}
            <line
              x1={frontBottom.x + 8}
              y1={frontBottom.y}
              x2={frontTop.x + 8}
              y2={frontTop.y}
              stroke="#0f172a"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
            <text
              x={frontBottom.x + 14}
              y={frontBottom.y - h / 2}
              className="text-[10px] font-mono-nums font-semibold fill-slate-900"
            >
              H: {spec.height}{spec.unit}
            </text>

            {/* Length (L) */}
            <text
              x={(frontBottom.x + leftBottom.x) / 2 - 14}
              y={(frontBottom.y + leftBottom.y) / 2 + 15}
              className="text-[10px] font-mono-nums font-semibold fill-slate-900"
            >
              L: {spec.length}{spec.unit}
            </text>

            {/* Width (W) */}
            <text
              x={(frontBottom.x + rightBottom.x) / 2 + 6}
              y={(frontBottom.y + rightBottom.y) / 2 + 15}
              className="text-[10px] font-mono-nums font-semibold fill-slate-900"
            >
              W: {spec.width}{spec.unit}
            </text>
          </svg>

          {/* Quick badge info */}
          <div className="flex items-center gap-2 text-xs text-slate-600 mt-1">
            <span className="font-semibold text-amber-900">
              {spec.plyCount} {lang === 'bn' ? 'প্লাই কার্টন' : 'Ply Box'}
            </span>
            <span>·</span>
            <span>
              {result.sheetLengthInches}&quot; × {result.sheetWidthInches}&quot;{' '}
              {lang === 'bn' ? 'শিট' : 'Sheet'}
            </span>
            <span>·</span>
            <span className="font-mono-nums font-medium text-slate-900">
              ~{result.weightPerBoxGram}g
            </span>
          </div>
        </div>
      )}

      {viewMode === 'flutes' && (
        <div className="bg-slate-50/80 rounded-lg p-3 border border-slate-100 space-y-2">
          <div className="text-xs font-semibold text-slate-700 flex items-center justify-between">
            <span>
              {lang === 'bn'
                ? `${spec.plyCount}-প্লাই স্তরের গঠন ক্রস-সেকশন`
                : `${spec.plyCount}-Ply Wall Cross-Section`}
            </span>
            <span className="font-mono-nums text-slate-500">
              {result.totalEffectiveGsm} {lang === 'bn' ? 'মোট জিএসএম' : 'Total GSM'}
            </span>
          </div>

          <div className="bg-white p-3 rounded-md border border-slate-200 space-y-2">
            {spec.layers.map((layer, index) => {
              const calc = result.layers.find((l) => l.id === layer.id);
              if (layer.isFlute) {
                return (
                  <div key={layer.id} className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-amber-900 font-medium px-1">
                      <span>{lang === 'bn' ? layer.nameBn : layer.name}</span>
                      <span className="font-mono-nums text-slate-500">
                        {layer.gsm} GSM × {layer.takeUpFactor} = {Math.round(layer.gsm * layer.takeUpFactor)} GSM
                      </span>
                    </div>
                    {/* SVG Fluting Wave representation */}
                    <div className="h-6 w-full bg-amber-50/50 rounded flex items-center px-1 overflow-hidden">
                      <svg className="w-full h-5 text-amber-700" preserveAspectRatio="none" viewBox="0 0 400 20">
                        <path
                          d="M0,18 Q10,2 20,18 T40,18 T60,18 T80,18 T100,18 T120,18 T140,18 T160,18 T180,18 T200,18 T220,18 T240,18 T260,18 T280,18 T300,18 T320,18 T340,18 T360,18 T380,18 T400,18"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        />
                      </svg>
                    </div>
                  </div>
                );
              }

              return (
                <div key={layer.id} className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-700 font-medium px-1">
                    <span>{lang === 'bn' ? layer.nameBn : layer.name}</span>
                    <span className="font-mono-nums text-slate-900 font-semibold">
                      {layer.gsm} GSM ({calc?.paperTypeBn || layer.paperType})
                    </span>
                  </div>
                  <div className="h-3 w-full bg-amber-800/80 rounded-xs shadow-2xs" />
                </div>
              );
            })}
          </div>

          <div className="text-[11px] text-slate-500 text-center">
            {lang === 'bn'
              ? 'ফ্লুটিং কাগজের তরঙ্গায়িত গঠনের কারণে স্বাভাবিকের চেয়ে ~৩৫%-৪২% বেশি কাগজ প্রয়োজন হয়।'
              : 'Fluting wave increases paper consumption by ~35%-42% due to corrugation take-up factor.'}
          </div>
        </div>
      )}

      {viewMode === 'sheet' && (
        <div className="bg-slate-50/80 rounded-lg p-3 border border-slate-100 space-y-2">
          <div className="text-xs font-semibold text-slate-700 flex items-center justify-between">
            <span>
              {lang === 'bn' ? 'ফ্ল্যাট শিট কাটিং ড্রয়িং' : 'Flat Sheet Cutting Diagram'}
            </span>
            <span className="font-mono-nums text-slate-900 font-semibold">
              {result.sheetLengthInches}&quot; × {result.sheetWidthInches}&quot; (
              {result.sheetLengthMm} × {result.sheetWidthMm} mm)
            </span>
          </div>

          <div className="bg-white p-3 rounded-md border border-slate-200 flex flex-col items-center">
            <svg viewBox="0 0 320 180" className="w-full max-w-[320px] h-[160px] text-slate-700">
              {/* Outer sheet rectangle */}
              <rect
                x="20"
                y="20"
                width="280"
                height="130"
                fill="#fef3c7"
                stroke="#d97706"
                strokeWidth="1.5"
                rx="2"
              />

              {/* Creasing & Flap lines */}
              {/* Top flap line */}
              <line x1="20" y1="50" x2="300" y2="50" stroke="#b45309" strokeDasharray="3 3" strokeWidth="1" />
              {/* Bottom flap line */}
              <line x1="20" y1="120" x2="300" y2="120" stroke="#b45309" strokeDasharray="3 3" strokeWidth="1" />

              {/* Vertical panel creases: Panel 1 (L), Panel 2 (W), Panel 3 (L), Panel 4 (W), Flap */}
              <line x1="90" y1="20" x2="90" y2="150" stroke="#b45309" strokeDasharray="3 3" strokeWidth="1" />
              <line x1="150" y1="20" x2="150" y2="150" stroke="#b45309" strokeDasharray="3 3" strokeWidth="1" />
              <line x1="220" y1="20" x2="220" y2="150" stroke="#b45309" strokeDasharray="3 3" strokeWidth="1" />
              <line x1="280" y1="20" x2="280" y2="150" stroke="#b45309" strokeWidth="1.2" />

              {/* Slot cuts on top and bottom */}
              <line x1="90" y1="20" x2="90" y2="50" stroke="#d97706" strokeWidth="2.5" />
              <line x1="150" y1="20" x2="150" y2="50" stroke="#d97706" strokeWidth="2.5" />
              <line x1="220" y1="20" x2="220" y2="50" stroke="#d97706" strokeWidth="2.5" />

              <line x1="90" y1="120" x2="90" y2="150" stroke="#d97706" strokeWidth="2.5" />
              <line x1="150" y1="120" x2="150" y2="150" stroke="#d97706" strokeWidth="2.5" />
              <line x1="220" y1="120" x2="220" y2="150" stroke="#d97706" strokeWidth="2.5" />

              {/* Panel text labels */}
              <text x="55" y="88" className="text-[10px] fill-amber-950 font-semibold" textAnchor="middle">
                L ({spec.length}&quot;)
              </text>
              <text x="120" y="88" className="text-[10px] fill-amber-950 font-semibold" textAnchor="middle">
                W ({spec.width}&quot;)
              </text>
              <text x="185" y="88" className="text-[10px] fill-amber-950 font-semibold" textAnchor="middle">
                L ({spec.length}&quot;)
              </text>
              <text x="250" y="88" className="text-[10px] fill-amber-950 font-semibold" textAnchor="middle">
                W ({spec.width}&quot;)
              </text>
              <text x="290" y="88" className="text-[8px] fill-amber-900 font-bold" textAnchor="middle">
                Flap
              </text>

              {/* Dimensions */}
              <text x="160" y="14" className="text-[9px] fill-slate-700 font-mono-nums font-semibold" textAnchor="middle">
                Total Length: {result.sheetLengthInches}&quot; ({(spec.length + spec.width) * 2} + {spec.jointFlapAllowance}&quot;)
              </text>
              <text x="310" y="90" className="text-[9px] fill-slate-700 font-mono-nums font-semibold" textAnchor="start">
                {result.sheetWidthInches}&quot;
              </text>
            </svg>
          </div>

          <div className="text-[11px] text-slate-500 text-center">
            {lang === 'bn'
              ? 'ডেকোল মাপ (Deckle Size) = প্রস্থ + উচ্চতা + ফ্ল্যাপ। কাটিং সাইজ = (দৈর্ঘ্য + প্রস্থ) × ২ + জয়েন্ট।'
              : 'Deckle Width = Width + Height + Flap. Cut Length = (Length + Width) × 2 + Joint.'}
          </div>
        </div>
      )}
    </div>
  );
}
