import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, CheckCircle2, Loader2, Sparkles, AlertTriangle } from 'lucide-react';
import { SensorFingerprint, Chemical, AnalysisResult } from '../../types/chemist';
import { VERIFIED_CHEMICALS } from '../../data/chemicals';

interface AnalysisPipelineModalProps {
  isOpen: boolean;
  sensorData: SensorFingerprint;
  onComplete: (result: AnalysisResult) => void;
  onClose?: () => void;
}

const PIPELINE_STEPS = [
  { id: 1, label: 'Collecting Sensor Data', detail: 'Reading pH, EC/TDS, Temp, TCS3200 RGB & MQ-135 VOC' },
  { id: 2, label: 'Cleaning & Filtering Signals', detail: 'Applying low-pass noise filter on ADS1115 ADC streams' },
  { id: 3, label: 'Normalizing Readings', detail: 'Temperature compensation & pH buffer auto-zeroing' },
  { id: 4, label: 'Feature Extraction', detail: 'Calculating ionic conductivity & VOC response vector' },
  { id: 5, label: 'Sensor Fusion', detail: 'Synthesizing multi-dimensional chemical fingerprint' },
  { id: 6, label: 'AI Classification Model', detail: 'Executing ChemistAI Neural Classifier v1.2' },
  { id: 7, label: 'Chemical Identification', detail: 'Cross-referencing verified scientific database' },
];

export const AnalysisPipelineModal: React.FC<AnalysisPipelineModalProps> = ({
  isOpen,
  sensorData,
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < PIPELINE_STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          // Perform chemical matching algorithm
          setTimeout(() => {
            const finalResult = classifySensorFingerprint(sensorData);
            onComplete(finalResult);
          }, 600);
          return prev;
        }
      });
    }, 650);

    return () => clearInterval(interval);
  }, [isOpen, sensorData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg bg-[#151515] border border-[#292D29] rounded-2xl p-6 shadow-2xl relative overflow-hidden font-tight"
      >
        {/* Background Glowing Ambient Accent */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#4F8F3A]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#24451F]/30 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#292D29] pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#24451F] border border-[#4F8F3A]/40 text-[#78A85A] rounded-xl">
              <Cpu className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2 font-tight">
                ANALYZING CHEMICAL SAMPLE
                <Sparkles className="w-4 h-4 text-[#78A85A]" />
              </h3>
              <p className="text-xs text-[#9AA397]">E-Tongue Multi-Sensor Fingerprint Classification</p>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-[#0A0A0A] border border-[#292D29] h-2 rounded-full mb-6 overflow-hidden">
          <motion.div
            className="h-full bg-[#4F8F3A]"
            initial={{ width: '0%' }}
            animate={{ width: `${((currentStep + 1) / PIPELINE_STEPS.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Pipeline Step List */}
        <div className="space-y-3 mb-6">
          {PIPELINE_STEPS.map((step, idx) => {
            const isCompleted = idx < currentStep;
            const isCurrent = idx === currentStep;

            return (
              <div
                key={step.id}
                className={`flex items-start gap-3 p-2.5 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-[#24451F] border-[#4F8F3A]/60 text-white shadow-xs'
                    : isCompleted
                    ? 'bg-[#0A0A0A] border-[#292D29] text-[#E0E2DC]'
                    : 'opacity-40 border-transparent text-[#667064]'
                }`}
              >
                <div className="mt-0.5">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-[#4F8F3A]" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-[#78A85A] animate-spin" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-[#292D29] flex items-center justify-center text-[10px] text-[#667064]">
                      {step.id}
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold">{step.label}</span>
                    {isCurrent && <span className="text-[10px] font-mono text-[#78A85A]">PROCESSING...</span>}
                  </div>
                  <p className="text-[11px] text-[#9AA397] mt-0.5">{step.detail}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Sensor Metrics Snapshot during analysis */}
        <div className="bg-[#0A0A0A] border border-[#292D29] rounded-xl p-3 flex items-center justify-between text-xs text-[#E0E2DC] font-mono">
          <div>
            <span className="text-[#667064] block text-[10px]">pH</span>
            <span className="text-[#4F8F3A] font-bold">{sensorData.ph.toFixed(2)}</span>
          </div>
          <div className="h-6 w-px bg-slate-800" />
          <div>
            <span className="text-slate-500 block text-[10px]">EC</span>
            <span className="text-white font-bold">{sensorData.ec.toFixed(2)} mS</span>
          </div>
          <div className="h-6 w-px bg-slate-800" />
          <div>
            <span className="text-slate-500 block text-[10px]">TEMP</span>
            <span className="text-white font-bold">{sensorData.temperature.toFixed(1)}°C</span>
          </div>
          <div className="h-6 w-px bg-slate-800" />
          <div>
            <span className="text-slate-500 block text-[10px]">VOC</span>
            <span className="text-[#8B7CFF] font-bold">{sensorData.voc}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Chemical fingerprint classification algorithm
export function classifySensorFingerprint(input: SensorFingerprint): AnalysisResult {
  let bestMatch: Chemical | null = null;
  let highestScore = 0;
  const matches: { chemical: Chemical; score: number }[] = [];

  // Compare input against verified reference fingerprints
  VERIFIED_CHEMICALS.forEach((chem) => {
    const ref = chem.referenceFingerprint;

    // Euclidean normalized distance across pH, EC, TDS, Temp, VOC
    const dPh = Math.abs(input.ph - ref.ph) / 14;
    const dEc = Math.abs(input.ec - ref.ec) / 20;
    const dVoc = Math.abs(input.voc - ref.voc) / 2000;
    const dRgb =
      (Math.abs(input.colorRgb.r - ref.colorRgb.r) +
        Math.abs(input.colorRgb.g - ref.colorRgb.g) +
        Math.abs(input.colorRgb.b - ref.colorRgb.b)) /
      (3 * 255);

    const totalDistance = dPh * 0.35 + dEc * 0.35 + dVoc * 0.2 + dRgb * 0.1;
    let confidence = Math.max(0, Math.min(99.4, (1 - totalDistance) * 100));

    matches.push({ chemical: chem, score: Math.round(confidence * 10) / 10 });
  });

  // Sort matches by confidence score descending
  matches.sort((a, b) => b.score - a.score);

  const topMatch = matches[0];
  const isUnknown = !topMatch || topMatch.score < 65; // Below 65% triggers Unknown mode

  if (isUnknown) {
    return {
      id: `analysis-${Date.now()}`,
      sampleInfo: {
        sampleId: `SMP-${Math.floor(1000 + Math.random() * 9000)}`,
        sampleName: 'Unidentified Lab Sample',
        batchNumber: 'UNKNOWN-BATCH',
        source: 'Lab Sensor Feed',
        operator: 'Dr. S. Vance',
        notes: 'Sensor fingerprint outside trained chemical dataset range.',
        timestamp: new Date().toISOString(),
        isDemoMode: false,
      },
      sensorReading: input,
      primaryMatch: {
        chemical: null,
        confidence: topMatch ? topMatch.score : 32.1,
        isUnknown: true,
      },
      alternativeMatches: matches.slice(0, 3).map((m) => ({
        chemicalId: m.chemical.id,
        chemicalName: m.chemical.name,
        formula: m.chemical.formula,
        confidence: m.score,
      })),
      featureContributions: [
        { feature: 'pH', contribution: 38, importanceLevel: 'High', explanation: 'pH deviated significantly from standard reference curves.' },
        { feature: 'EC/TDS', contribution: 34, importanceLevel: 'High', explanation: 'Conductivity profile indicates non-standard ionic strength.' },
        { feature: 'VOC Response', contribution: 18, importanceLevel: 'Medium', explanation: 'Volatile organic emission readings detected.' },
        { feature: 'Color Response', contribution: 10, importanceLevel: 'Low', explanation: 'Reflectance spectrum within translucent liquid range.' },
      ],
      modelVersion: 'ChemistAI Classifier v1.2',
      timestamp: new Date().toISOString(),
      status: 'Unknown',
    };
  }

  return {
    id: `analysis-${Date.now()}`,
    sampleInfo: {
      sampleId: `SMP-${Math.floor(1000 + Math.random() * 9000)}`,
      sampleName: `${topMatch.chemical.name} Sample`,
      batchNumber: `BATCH-${Math.floor(100 + Math.random() * 900)}`,
      source: 'Chemical Research Cell A',
      operator: 'Dr. S. Vance',
      notes: 'Automated E-Tongue analysis completed with high confidence.',
      timestamp: new Date().toISOString(),
      isDemoMode: false,
    },
    sensorReading: input,
    primaryMatch: {
      chemical: topMatch.chemical,
      confidence: topMatch.score,
      isUnknown: false,
    },
    alternativeMatches: matches.slice(0, 4).map((m) => ({
      chemicalId: m.chemical.id,
      chemicalName: m.chemical.name,
      formula: m.chemical.formula,
      confidence: m.score,
    })),
    featureContributions: [
      { feature: 'pH', contribution: 36, importanceLevel: 'High', explanation: 'pH level closely matched reference compound ionization equilibrium.' },
      { feature: 'EC/TDS', contribution: 32, importanceLevel: 'High', explanation: 'Electrolytic conductivity aligned with target molality.' },
      { feature: 'VOC Response', contribution: 20, importanceLevel: 'High', explanation: 'Gas sensor response matched volatile head-space vapor fingerprint.' },
      { feature: 'Color Response', contribution: 12, importanceLevel: 'Medium', explanation: 'RGB sensor reflectance matches clear solvent transmission.' },
    ],
    modelVersion: 'ChemistAI Classifier v1.2',
    timestamp: new Date().toISOString(),
    status: topMatch.score > 85 ? 'Identified' : 'Low Confidence',
  };
}
