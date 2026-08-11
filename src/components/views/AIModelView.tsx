import React, { useState } from 'react';
import { BrainCircuit, Upload, Download, RefreshCw, CheckCircle2, Sparkles, Database } from 'lucide-react';

interface AIModelViewProps {
  isDarkMode: boolean;
}

export const AIModelView: React.FC<AIModelViewProps> = ({ isDarkMode }) => {
  const [isTraining, setIsTraining] = useState(false);
  const [trainComplete, setTrainComplete] = useState(false);

  const handleRetrainModel = () => {
    setIsTraining(true);
    setTimeout(() => {
      setIsTraining(false);
      setTrainComplete(true);
      setTimeout(() => setTrainComplete(false), 4000);
    }, 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className={`flex items-center justify-between border-b pb-4 ${isDarkMode ? 'border-[#292D29]' : 'border-[#DDE5D8]'}`}>
        <div>
          <h2 className="text-xl font-extrabold flex items-center gap-2 font-tight">
            <BrainCircuit className="w-5 h-5 text-[#4F8F3A]" />
            ChemistAI ML Model & Dataset Management
          </h2>
          <p className={`text-xs ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
            Monitor model metrics, accuracy curves, trained chemical classes, and manage training dataset CSVs
          </p>
        </div>
      </div>

      {/* Model Spec Card */}
      <div
        className={`p-6 rounded-2xl border space-y-6 ${
          isDarkMode ? 'bg-[#151515] border-[#292D29]' : 'bg-white border-[#DDE5D8] shadow-xs'
        }`}
      >
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 ${isDarkMode ? 'border-[#292D29]' : 'border-[#DDE5D8]'}`}>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#24451F] border border-[#4F8F3A]/40 text-[#78A85A] rounded-2xl">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-bold flex items-center gap-2 font-tight">
                ChemistAI Neural Classifier v1.2
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#24451F] text-[#78A85A] border border-[#4F8F3A]/40 font-bold font-tight">
                  Deployed
                </span>
              </h3>
              <p className={`text-xs font-mono ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
                Model Architecture: Multi-Layer Perceptron & Random Forest Ensemble
              </p>
            </div>
          </div>

          <button
            onClick={handleRetrainModel}
            disabled={isTraining}
            className="px-4 py-2.5 rounded-lg bg-[#4F8F3A] hover:bg-[#3F762F] text-white text-xs font-bold shadow-xs flex items-center gap-2 font-tight"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isTraining ? 'animate-spin' : ''}`} />
            {isTraining ? 'Re-training Neural Network...' : 'Re-train Classifier'}
          </button>
        </div>

        {trainComplete && (
          <div className="p-3 bg-[#24451F] border border-[#4F8F3A]/50 text-[#78A85A] rounded-xl text-xs font-semibold flex items-center gap-2 font-tight">
            <CheckCircle2 className="w-4 h-4 text-[#4F8F3A]" />
            Model training completed with 98.4% validation accuracy on test set!
          </div>
        )}

        {/* Model Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div className={`p-3 border rounded-xl ${isDarkMode ? 'bg-[#0A0A0A] border-[#292D29]' : 'bg-[#F6F7F3] border-[#DDE5D8]'}`}>
            <span className={`block text-[10px] ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>Validation Accuracy</span>
            <span className="text-xl font-bold text-[#4F8F3A] mt-0.5 block font-tight">98.4%</span>
          </div>

          <div className={`p-3 border rounded-xl ${isDarkMode ? 'bg-[#0A0A0A] border-[#292D29]' : 'bg-[#F6F7F3] border-[#DDE5D8]'}`}>
            <span className={`block text-[10px] ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>Trained Classes</span>
            <span className="text-xl font-bold text-[#78A85A] mt-0.5 block font-tight">24 Chemicals</span>
          </div>

          <div className={`p-3 border rounded-xl ${isDarkMode ? 'bg-[#0A0A0A] border-[#292D29]' : 'bg-[#F6F7F3] border-[#DDE5D8]'}`}>
            <span className={`block text-[10px] ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>Dataset Size</span>
            <span className="text-xl font-bold mt-0.5 block font-tight">14,200 Samples</span>
          </div>

          <div className={`p-3 border rounded-xl ${isDarkMode ? 'bg-[#0A0A0A] border-[#292D29]' : 'bg-[#F6F7F3] border-[#DDE5D8]'}`}>
            <span className={`block text-[10px] ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>Inference Speed</span>
            <span className="text-xl font-bold text-[#4F8F3A] mt-0.5 block font-tight">12 ms</span>
          </div>
        </div>

        {/* Dataset CSV Upload & Export Bar */}
        <div className={`pt-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${isDarkMode ? 'border-[#292D29]' : 'border-[#DDE5D8]'}`}>
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-[#4F8F3A]" />
            <span className="text-xs font-bold font-tight">
              Training Dataset Management (CSV Format)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button className={`px-3 py-2 border rounded-lg text-xs font-bold flex items-center gap-1.5 font-tight ${
              isDarkMode
                ? 'bg-[#0A0A0A] border-[#292D29] text-[#9AA397] hover:text-white'
                : 'bg-white border-[#DDE5D8] text-[#667064] hover:text-[#0A0A0A]'
            }`}>
              <Upload className="w-3.5 h-3.5 text-[#4F8F3A]" /> Upload CSV Dataset
            </button>
            <button className={`px-3 py-2 border rounded-lg text-xs font-bold flex items-center gap-1.5 font-tight ${
              isDarkMode
                ? 'bg-[#0A0A0A] border-[#292D29] text-[#9AA397] hover:text-white'
                : 'bg-white border-[#DDE5D8] text-[#667064] hover:text-[#0A0A0A]'
            }`}>
              <Download className="w-3.5 h-3.5 text-[#78A85A]" /> Export Dataset CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

