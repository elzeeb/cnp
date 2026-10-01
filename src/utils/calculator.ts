import {
  CartonSpec,
  CalculationResult,
  LayerCalculationResult,
  PaperLayer,
  PlyCount,
} from '../types/carton';

// Helper to convert dimension to inches
export function toInches(value: number, unit: 'inch' | 'mm' | 'cm'): number {
  if (unit === 'inch') return value;
  if (unit === 'mm') return value / 25.4;
  if (unit === 'cm') return value / 2.54;
  return value;
}

// Helper to convert dimension to mm
export function toMm(value: number, unit: 'inch' | 'mm' | 'cm'): number {
  if (unit === 'mm') return value;
  if (unit === 'inch') return value * 25.4;
  if (unit === 'cm') return value * 10;
  return value;
}

export function generateDefaultLayers(plyCount: PlyCount): PaperLayer[] {
  if (plyCount === 3) {
    return [
      {
        id: 'layer-1',
        name: 'Top Liner (Face)',
        nameBn: 'টপ লাইনার (বাইরের স্তর)',
        isFlute: false,
        paperType: 'virgin_kraft',
        paperTypeBn: 'ভার্জিন ক্রাফট (আমদানি)',
        gsm: 150,
        takeUpFactor: 1.0,
        ratePerKg: 85,
      },
      {
        id: 'layer-2',
        name: 'Fluting Medium',
        nameBn: 'ফ্লুটিং মিডিয়াম (তরঙ্গায়িত)',
        isFlute: true,
        paperType: 'medium_flute',
        paperTypeBn: 'মিডিয়াম ফ্লুটিং পেপার',
        gsm: 125,
        takeUpFactor: 1.4,
        ratePerKg: 65,
      },
      {
        id: 'layer-3',
        name: 'Bottom Liner (Inside)',
        nameBn: 'বটম লাইনার (ভেতরের স্তর)',
        isFlute: false,
        paperType: 'semi_kraft',
        paperTypeBn: 'সেমি ক্রাফট লাইনার',
        gsm: 140,
        takeUpFactor: 1.0,
        ratePerKg: 75,
      },
    ];
  }

  if (plyCount === 5) {
    return [
      {
        id: 'layer-1',
        name: 'Top Liner (Outer Face)',
        nameBn: 'টপ লাইনার (বাইরের স্তর)',
        isFlute: false,
        paperType: 'virgin_kraft',
        paperTypeBn: 'ভার্জিন ক্রাফট (আমদানি)',
        gsm: 175,
        takeUpFactor: 1.0,
        ratePerKg: 85,
      },
      {
        id: 'layer-2',
        name: 'Flute 1 (Outer Wave)',
        nameBn: 'ফ্লুট ১ (বাইরের ফ্লুটিং)',
        isFlute: true,
        paperType: 'medium_flute',
        paperTypeBn: 'মিডিয়াম ফ্লুটিং পেপার',
        gsm: 125,
        takeUpFactor: 1.35, // B flute
        ratePerKg: 65,
      },
      {
        id: 'layer-3',
        name: 'Middle Liner (Separator)',
        nameBn: 'মিডল লাইনার (মধ্যবর্তী স্তর)',
        isFlute: false,
        paperType: 'semi_kraft',
        paperTypeBn: 'সেমি ক্রাফট লাইনার',
        gsm: 140,
        takeUpFactor: 1.0,
        ratePerKg: 75,
      },
      {
        id: 'layer-4',
        name: 'Flute 2 (Inner Wave)',
        nameBn: 'ফ্লুট ২ (ভেতরের ফ্লুটিং)',
        isFlute: true,
        paperType: 'medium_flute',
        paperTypeBn: 'মিডিয়াম ফ্লুটিং পেপার',
        gsm: 130,
        takeUpFactor: 1.42, // C flute
        ratePerKg: 65,
      },
      {
        id: 'layer-5',
        name: 'Bottom Liner (Inside)',
        nameBn: 'বটম লাইনার (ভেতরের স্তর)',
        isFlute: false,
        paperType: 'semi_kraft',
        paperTypeBn: 'সেমি ক্রাফট লাইনার',
        gsm: 150,
        takeUpFactor: 1.0,
        ratePerKg: 75,
      },
    ];
  }

  // 7-Ply
  return [
    {
      id: 'layer-1',
      name: 'Top Liner (Outer)',
      nameBn: 'টপ লাইনার (বাইরের স্তর)',
      isFlute: false,
      paperType: 'virgin_kraft',
      paperTypeBn: 'ভার্জিন ক্রাফট',
      gsm: 200,
      takeUpFactor: 1.0,
      ratePerKg: 88,
    },
    {
      id: 'layer-2',
      name: 'Flute 1 (Outer)',
      nameBn: 'ফ্লুট ১',
      isFlute: true,
      paperType: 'medium_flute',
      paperTypeBn: 'ফ্লুটিং পেপার',
      gsm: 130,
      takeUpFactor: 1.35,
      ratePerKg: 65,
    },
    {
      id: 'layer-3',
      name: 'Middle Liner 1',
      nameBn: 'মিডল লাইনার ১',
      isFlute: false,
      paperType: 'semi_kraft',
      paperTypeBn: 'সেমি ক্রাফট লাইনার',
      gsm: 150,
      takeUpFactor: 1.0,
      ratePerKg: 76,
    },
    {
      id: 'layer-4',
      name: 'Flute 2 (Middle)',
      nameBn: 'ফ্লুট ২',
      isFlute: true,
      paperType: 'medium_flute',
      paperTypeBn: 'ফ্লুটিং পেপার',
      gsm: 130,
      takeUpFactor: 1.42,
      ratePerKg: 65,
    },
    {
      id: 'layer-5',
      name: 'Middle Liner 2',
      nameBn: 'মিডল লাইনার ২',
      isFlute: false,
      paperType: 'semi_kraft',
      paperTypeBn: 'সেমি ক্রাফট লাইনার',
      gsm: 150,
      takeUpFactor: 1.0,
      ratePerKg: 76,
    },
    {
      id: 'layer-6',
      name: 'Flute 3 (Inner)',
      nameBn: 'ফ্লুট ৩',
      isFlute: true,
      paperType: 'medium_flute',
      paperTypeBn: 'ফ্লুটিং পেপার',
      gsm: 130,
      takeUpFactor: 1.28,
      ratePerKg: 65,
    },
    {
      id: 'layer-7',
      name: 'Bottom Liner (Inside)',
      nameBn: 'বটম লাইনার (ভেতরের স্তর)',
      isFlute: false,
      paperType: 'semi_kraft',
      paperTypeBn: 'সেমি ক্রাফট লাইনার',
      gsm: 180,
      takeUpFactor: 1.0,
      ratePerKg: 76,
    },
  ];
}

export const DEFAULT_SPEC: CartonSpec = {
  length: 18,
  width: 12,
  height: 10,
  unit: 'inch',
  boxType: 'rsc',
  plyCount: 5,
  jointFlapAllowance: 1.5, // 1.5 inch flap for RSC joint
  topBottomFlapAllowance: 0.5, // 0.5 inch extra allowance for creasing
  layers: generateDefaultLayers(5),
  conversionCostPerKg: 12, // ৳12 per kg of corrugation / glue / power
  wastagePercent: 4, // 4% standard industrial wastage
  printingType: '1_color',
  printingCostPerBox: 1.5, // ৳1.50 per box for 1-color flexo
  stitchingPastingType: 'stitching',
  stitchingPins: 4,
  stitchingRatePerPin: 0.25, // ৳0.25 per pin (4 pins = ৳1.00)
  dieBlockCost: 0,
  dieCutChargePerBox: 0,
  transportCostPerBox: 1.0, // ৳1.00 per carton delivery
  overheadPercent: 5, // 5% factory overhead
  profitMarginPercent: 12, // 12% profit margin
  orderQuantity: 2000,
  currency: 'BDT',
  clientName: 'এপেক্স টেক্সটাইলস লিঃ (Apex Textiles Ltd.)',
  projectName: 'পোশাক রপ্তানি মাস্টার কার্টন (Garments Master Carton)',
  poNumber: 'PO-2026-8841',
  notes: 'উচ্চমানের ক্রাফট পেপারের ৫ প্লাই এক্সপোর্ট কোয়ালিটি কার্টন বক্স। পিন স্টিচিং এবং এক রঙের লোগো প্রিন্টিং সহ।',
};

export const PRESET_BOXES: Array<{
  id: string;
  nameBn: string;
  nameEn: string;
  category: string;
  spec: Partial<CartonSpec>;
}> = [
  {
    id: 'garments_export_5ply',
    nameBn: 'পোশাক রপ্তানি কার্টন (গার্মেন্টস মাস্টার ৫-প্লাই)',
    nameEn: 'Garments Export Master Carton (5-Ply)',
    category: 'RMG Export',
    spec: {
      length: 24,
      width: 16,
      height: 14,
      unit: 'inch',
      boxType: 'rsc',
      plyCount: 5,
      jointFlapAllowance: 1.75,
      topBottomFlapAllowance: 0.5,
      conversionCostPerKg: 12,
      wastagePercent: 4,
      printingType: '2_color',
      printingCostPerBox: 2.2,
      stitchingPastingType: 'stitching',
      stitchingPins: 6,
      stitchingRatePerPin: 0.25,
      transportCostPerBox: 1.5,
      overheadPercent: 5,
      profitMarginPercent: 12,
      orderQuantity: 3000,
      clientName: 'অনন্ত অ্যাপারেলস লিঃ (Ananta Apparels)',
      projectName: 'ইউরোপ এক্সপোর্ট টি-শার্ট বক্স (Export Carton)',
    },
  },
  {
    id: 'ecommerce_3ply',
    nameBn: 'ই-কমার্স ডেলিভারি বক্স (৩-প্লাই ডাই-কাট/মেইলার)',
    nameEn: 'E-Commerce Courier Box (3-Ply Die-Cut)',
    category: 'E-Commerce',
    spec: {
      length: 10,
      width: 7,
      height: 4,
      unit: 'inch',
      boxType: 'die_cut',
      plyCount: 3,
      jointFlapAllowance: 1.0,
      topBottomFlapAllowance: 0.5,
      conversionCostPerKg: 14,
      wastagePercent: 5,
      printingType: '1_color',
      printingCostPerBox: 1.2,
      stitchingPastingType: 'pasting',
      dieBlockCost: 2500,
      dieCutChargePerBox: 0.6,
      transportCostPerBox: 0.5,
      overheadPercent: 6,
      profitMarginPercent: 15,
      orderQuantity: 5000,
      clientName: 'দারাজ সেলার মার্ট (E-Shop Online)',
      projectName: 'কুরিয়ার ডেলিভারি পার্সেল বক্স',
    },
  },
  {
    id: 'agro_fruit_7ply',
    nameBn: 'কৃষি ও ফলমূল হেভি-ডিউটি বক্স (৭-প্লাই)',
    nameEn: 'Agro & Fruits Heavy Duty Box (7-Ply)',
    category: 'Heavy Duty Agro',
    spec: {
      length: 20,
      width: 15,
      height: 12,
      unit: 'inch',
      boxType: 'rsc',
      plyCount: 7,
      jointFlapAllowance: 2.0,
      topBottomFlapAllowance: 0.75,
      conversionCostPerKg: 13,
      wastagePercent: 4.5,
      printingType: '2_color',
      printingCostPerBox: 3.0,
      stitchingPastingType: 'stitching',
      stitchingPins: 8,
      stitchingRatePerPin: 0.3,
      transportCostPerBox: 2.5,
      overheadPercent: 5,
      profitMarginPercent: 12,
      orderQuantity: 1500,
      clientName: 'গ্রিন অ্যাগ্রো ফার্মস (Green Agro)',
      projectName: 'আম ও পেয়ারা এক্সপোর্ট হেভি কার্টন',
    },
  },
  {
    id: 'pharma_master_5ply',
    nameBn: 'ফার্মাসিউটিক্যাল ও মেডিসিন কার্টন (৫-প্লাই)',
    nameEn: 'Pharma Medicine Shipper (5-Ply)',
    category: 'Pharmaceutical',
    spec: {
      length: 18,
      width: 12,
      height: 10,
      unit: 'inch',
      boxType: 'rsc',
      plyCount: 5,
      jointFlapAllowance: 1.5,
      topBottomFlapAllowance: 0.5,
      conversionCostPerKg: 12,
      wastagePercent: 3.5,
      printingType: '2_color',
      printingCostPerBox: 2.0,
      stitchingPastingType: 'both',
      stitchingPins: 4,
      stitchingRatePerPin: 0.25,
      transportCostPerBox: 1.2,
      overheadPercent: 5,
      profitMarginPercent: 14,
      orderQuantity: 4000,
      clientName: 'স্কয়ার ফার্মাসিউটিক্যালস ভেন্ডর',
      projectName: 'সিরাপ ও ট্যাবলেট মাস্টার শিপার',
    },
  },
  {
    id: 'food_fmcg_3ply',
    nameBn: 'খাদ্যপণ্য ও বিস্কুট কার্টন (৩-প্লাই আরএসসি)',
    nameEn: 'Food & Biscuit Shipper Box (3-Ply RSC)',
    category: 'FMCG & Foods',
    spec: {
      length: 16,
      width: 11,
      height: 9,
      unit: 'inch',
      boxType: 'rsc',
      plyCount: 3,
      jointFlapAllowance: 1.5,
      topBottomFlapAllowance: 0.5,
      conversionCostPerKg: 11,
      wastagePercent: 3.5,
      printingType: '1_color',
      printingCostPerBox: 1.0,
      stitchingPastingType: 'pasting',
      transportCostPerBox: 0.8,
      overheadPercent: 5,
      profitMarginPercent: 10,
      orderQuantity: 10000,
      clientName: 'প্রাণ-আরএফএল সাপ্লাই চেইন',
      projectName: 'বিস্কুট ও কনফেকশনারি সেকেন্ডারি কার্টন',
    },
  },
];

export function calculateCartonRate(spec: CartonSpec): CalculationResult {
  // Convert dimensions to inches for standardized calculation
  const lInches = toInches(spec.length, spec.unit);
  const wInches = toInches(spec.width, spec.unit);
  const hInches = toInches(spec.height, spec.unit);
  const jointFlapInches = toInches(spec.jointFlapAllowance, spec.unit);
  const topBottomFlapInches = toInches(spec.topBottomFlapAllowance, spec.unit);

  let sheetLengthInches = 0;
  let sheetWidthInches = 0;

  if (spec.boxType === 'rsc') {
    // Standard RSC Corrugated Box Cutting Size:
    // Sheet Length = (Length + Width) * 2 + Joint Flap (সাধারণত ১.৫" থেকে ২")
    sheetLengthInches = (lInches + wInches) * 2 + jointFlapInches;
    // Sheet Width (Deckle) = Width + Height + Flap Allowance (W/2 top + H + W/2 bottom + allowance = W + H + allowance)
    sheetWidthInches = wInches + hInches + topBottomFlapInches;
  } else if (spec.boxType === 'fol') {
    // Full Overlap Slotted Container:
    // Top and Bottom flaps cover full width W rather than W/2
    sheetLengthInches = (lInches + wInches) * 2 + jointFlapInches;
    sheetWidthInches = 2 * wInches + hInches + topBottomFlapInches;
  } else if (spec.boxType === 'die_cut') {
    // Die-cut mailer or tuck top box:
    // Sheet Length = Length * 2 + Height * 2 + Flaps (approx)
    sheetLengthInches = (lInches + hInches) * 2 + jointFlapInches;
    sheetWidthInches = wInches + hInches * 2 + topBottomFlapInches;
  } else if (spec.boxType === 'top_bottom') {
    // 2-piece box (Top + Bottom sheet combined estimation factor ~ 1.8x sheet)
    sheetLengthInches = (lInches + wInches) * 2 + jointFlapInches;
    sheetWidthInches = (wInches + hInches + topBottomFlapInches) * 1.5;
  }

  const sheetLengthMm = sheetLengthInches * 25.4;
  const sheetWidthMm = sheetWidthInches * 25.4;

  // Sheet Area in Square Meters (sq.m) = (L_mm / 1000) * (W_mm / 1000)
  const sheetAreaSqM = (sheetLengthMm / 1000) * (sheetWidthMm / 1000);
  const sheetAreaSqInch = sheetLengthInches * sheetWidthInches;

  // Calculate paper layer weights & raw material cost
  let totalEffectiveGsm = 0;
  let rawPaperCostPerBox = 0;
  let totalWeightPerBoxGram = 0;

  const layerResults: LayerCalculationResult[] = spec.layers.map((layer) => {
    const effectiveGsm = layer.gsm * layer.takeUpFactor;
    totalEffectiveGsm += effectiveGsm;

    // Weight of this layer per box in grams = Area (sq.m) * effectiveGsm
    const weightGram = sheetAreaSqM * effectiveGsm;
    totalWeightPerBoxGram += weightGram;

    const weightKg = weightGram / 1000;
    const costPerBox = weightKg * layer.ratePerKg;
    rawPaperCostPerBox += costPerBox;

    const totalOrderWeightKg = weightKg * spec.orderQuantity;
    const totalOrderCost = costPerBox * spec.orderQuantity;

    return {
      id: layer.id,
      name: layer.name,
      nameBn: layer.nameBn,
      isFlute: layer.isFlute,
      paperType: layer.paperType,
      paperTypeBn: layer.paperTypeBn,
      gsm: layer.gsm,
      takeUpFactor: layer.takeUpFactor,
      effectiveGsm,
      weightPerBoxGram: weightGram,
      costPerBox,
      totalOrderWeightKg,
      totalOrderCost,
    };
  });

  const weightPerBoxKg = totalWeightPerBoxGram / 1000;
  const totalOrderWeightKg = weightPerBoxKg * spec.orderQuantity;
  const totalOrderWeightTon = totalOrderWeightKg / 1000;

  // Wastage cost on paper
  const wastageCostPerBox = rawPaperCostPerBox * (spec.wastagePercent / 100);

  // Conversion / Fabrication cost (Glue, power, labor)
  // Usually based on total paper weight processed in kg
  const conversionCostPerBox = weightPerBoxKg * spec.conversionCostPerKg;

  // Printing cost
  let printingCostPerBox = 0;
  if (spec.printingType !== 'none') {
    printingCostPerBox = spec.printingCostPerBox;
  }

  // Stitching / Pasting cost
  let stitchingCostPerBox = 0;
  if (spec.stitchingPastingType === 'stitching' || spec.stitchingPastingType === 'both') {
    stitchingCostPerBox += spec.stitchingPins * spec.stitchingRatePerPin;
  }
  if (spec.stitchingPastingType === 'pasting' || spec.stitchingPastingType === 'both') {
    stitchingCostPerBox += 0.5; // typical pasting glue cost per carton
  }

  // Die block cost amortized over order quantity + die cutting fee per box
  let dieCostPerBox = 0;
  if (spec.boxType === 'die_cut') {
    const amortizedBlock = spec.orderQuantity > 0 ? spec.dieBlockCost / spec.orderQuantity : 0;
    dieCostPerBox = amortizedBlock + spec.dieCutChargePerBox;
  }

  // Transport cost
  const transportCostPerBox = spec.transportCostPerBox;

  // Subtotal direct cost
  const directCostPerBox =
    rawPaperCostPerBox +
    wastageCostPerBox +
    conversionCostPerBox +
    printingCostPerBox +
    stitchingCostPerBox +
    dieCostPerBox +
    transportCostPerBox;

  // Overhead cost
  const overheadCostPerBox = directCostPerBox * (spec.overheadPercent / 100);

  const subtotalCostPerBox = directCostPerBox + overheadCostPerBox;

  // Profit Margin
  const profitMarginPerBox = subtotalCostPerBox * (spec.profitMarginPercent / 100);

  // Final Selling Rate per Carton
  const finalSellingPricePerBox = subtotalCostPerBox + profitMarginPerBox;
  const totalOrderAmount = finalSellingPricePerBox * spec.orderQuantity;

  // Approximate Bursting Strength (BS in kg/cm²) estimation based on Kraft liner GSMs:
  // BS ≈ (Sum of Liner GSM * 14 BF + Fluting contribution * 8 BF) / 1000
  const linerContribution = spec.layers
    .filter((l) => !l.isFlute)
    .reduce((sum, l) => sum + (l.gsm * 16) / 1000, 0);
  const fluteContribution = spec.layers
    .filter((l) => l.isFlute)
    .reduce((sum, l) => sum + (l.gsm * 8) / 1000, 0);
  const estimatedBurstingStrength = Number((linerContribution + fluteContribution).toFixed(1));

  return {
    sheetLengthInches: Number(sheetLengthInches.toFixed(2)),
    sheetWidthInches: Number(sheetWidthInches.toFixed(2)),
    sheetLengthMm: Math.round(sheetLengthMm),
    sheetWidthMm: Math.round(sheetWidthMm),
    sheetAreaSqM: Number(sheetAreaSqM.toFixed(4)),
    sheetAreaSqInch: Number(sheetAreaSqInch.toFixed(1)),
    totalEffectiveGsm: Math.round(totalEffectiveGsm),
    weightPerBoxGram: Math.round(totalWeightPerBoxGram),
    weightPerBoxKg: Number(weightPerBoxKg.toFixed(3)),
    totalOrderWeightKg: Math.round(totalOrderWeightKg),
    totalOrderWeightTon: Number(totalOrderWeightTon.toFixed(2)),
    layers: layerResults,
    paperCostPerBox: Number(rawPaperCostPerBox.toFixed(2)),
    wastageCostPerBox: Number(wastageCostPerBox.toFixed(2)),
    conversionCostPerBox: Number(conversionCostPerBox.toFixed(2)),
    printingCostPerBox: Number(printingCostPerBox.toFixed(2)),
    stitchingCostPerBox: Number(stitchingCostPerBox.toFixed(2)),
    dieCostPerBox: Number(dieCostPerBox.toFixed(2)),
    transportCostPerBox: Number(transportCostPerBox.toFixed(2)),
    overheadCostPerBox: Number(overheadCostPerBox.toFixed(2)),
    profitMarginPerBox: Number(profitMarginPerBox.toFixed(2)),
    subtotalCostPerBox: Number(subtotalCostPerBox.toFixed(2)),
    finalSellingPricePerBox: Number(finalSellingPricePerBox.toFixed(2)),
    totalOrderAmount: Math.round(totalOrderAmount),
    estimatedBurstingStrength,
  };
}

export function formatCurrency(amount: number, currency: 'BDT' | 'USD'): string {
  const sym = currency === 'BDT' ? '৳' : '$';
  return `${sym} ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatNumber(num: number, decimals: number = 2): string {
  return num.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}
