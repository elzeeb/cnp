export type UnitType = 'inch' | 'mm' | 'cm';
export type BoxType = 'rsc' | 'die_cut' | 'top_bottom' | 'fol';
export type PlyCount = 3 | 5 | 7;
export type FluteType = 'B' | 'C' | 'E' | 'BC';
export type Currency = 'BDT' | 'USD';
export type Language = 'bn' | 'en';

export interface PaperLayer {
  id: string;
  name: string;
  nameBn: string;
  isFlute: boolean;
  paperType: string;
  paperTypeBn: string;
  gsm: number;
  takeUpFactor: number;
  ratePerKg: number;
}

export interface CartonSpec {
  // Dimensions
  length: number;
  width: number;
  height: number;
  unit: UnitType;
  boxType: BoxType;
  plyCount: PlyCount;
  
  // RSC Flap allowances in current unit
  jointFlapAllowance: number; // e.g. 1.5 inch / 38 mm for joint/stitching flap
  topBottomFlapAllowance: number; // e.g. 0.5 inch / 12 mm for creasing/extra flap

  // Paper layers
  layers: PaperLayer[];

  // Manufacturing & processing
  conversionCostPerKg: number; // ৳ per kg paper processed (glue, starch, boiler, labor)
  wastagePercent: number; // e.g. 4%
  printingType: 'none' | '1_color' | '2_color' | '4_color';
  printingCostPerBox: number;
  stitchingPastingType: 'stitching' | 'pasting' | 'both' | 'none';
  stitchingPins: number;
  stitchingRatePerPin: number;
  dieBlockCost: number; // Flat die wooden block cost
  dieCutChargePerBox: number; // if die cut
  transportCostPerBox: number;
  overheadPercent: number;
  profitMarginPercent: number;
  
  // Order
  orderQuantity: number;
  currency: Currency;

  // Metadata
  clientName: string;
  projectName: string;
  poNumber: string;
  notes: string;
}

export interface LayerCalculationResult {
  id: string;
  name: string;
  nameBn: string;
  isFlute: boolean;
  paperType: string;
  paperTypeBn: string;
  gsm: number;
  takeUpFactor: number;
  effectiveGsm: number;
  weightPerBoxGram: number;
  costPerBox: number;
  totalOrderWeightKg: number;
  totalOrderCost: number;
}

export interface CalculationResult {
  // Sheet Sizes
  sheetLengthInches: number;
  sheetWidthInches: number;
  sheetLengthMm: number;
  sheetWidthMm: number;
  sheetAreaSqM: number;
  sheetAreaSqInch: number;

  // Weight
  totalEffectiveGsm: number;
  weightPerBoxGram: number;
  weightPerBoxKg: number;
  totalOrderWeightKg: number;
  totalOrderWeightTon: number;

  // Layers breakdown
  layers: LayerCalculationResult[];

  // Cost items per box
  paperCostPerBox: number;
  wastageCostPerBox: number;
  conversionCostPerBox: number;
  printingCostPerBox: number;
  stitchingCostPerBox: number;
  dieCostPerBox: number;
  transportCostPerBox: number;
  overheadCostPerBox: number;
  profitMarginPerBox: number;

  // Sums
  subtotalCostPerBox: number; // before profit
  finalSellingPricePerBox: number; // with profit
  totalOrderAmount: number;

  // Bursting Factor estimate (Approximate BS in kg/cm²)
  estimatedBurstingStrength: number;
}

export interface SavedQuote {
  id: string;
  title: string;
  clientName: string;
  projectName: string;
  createdAt: string;
  spec: CartonSpec;
  result: CalculationResult;
}

export const PAPER_TYPES = [
  { value: 'virgin_kraft', labelEn: 'Virgin Kraft (Imported)', labelBn: 'ভার্জিন ক্রাফট (আমদানি)' },
  { value: 'semi_kraft', labelEn: 'Semi Kraft Liner', labelBn: 'সেমি ক্রাফট লাইনার' },
  { value: 'test_liner', labelEn: 'Test Liner', labelBn: 'টেস্ট লাইনার' },
  { value: 'white_top', labelEn: 'White Top Liner', labelBn: 'হোয়াইট টপ লাইনার' },
  { value: 'duplex_board', labelEn: 'Duplex Board', labelBn: 'ডুপ্লেক্স বোর্ড' },
  { value: 'medium_flute', labelEn: 'Medium Fluting Paper', labelBn: 'মিডিয়াম ফ্লুটিং পেপার' },
  { value: 'local_kraft', labelEn: 'Local Kraft Paper', labelBn: 'লোকাল ক্রাফট পেপার' },
];

export const GSM_PRESETS = [100, 110, 120, 125, 140, 150, 160, 175, 180, 200, 220, 250, 300];

export const FLUTE_TAKE_UP: Record<FluteType, number> = {
  B: 1.35,
  C: 1.42,
  E: 1.28,
  BC: 1.38,
};
