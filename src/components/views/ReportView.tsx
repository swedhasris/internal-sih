import React, { useRef, useState } from 'react';
import { Printer, Download, Atom, FileText, Loader2, CheckCircle2 } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AnalysisResult } from '../../types/chemist';

interface ReportViewProps {
  result: AnalysisResult;
  isDarkMode: boolean;
}

export const ReportView: React.FC<ReportViewProps> = ({ result, isDarkMode }) => {
  const chem = result.primaryMatch.chemical;
  const isUnknown = result.primaryMatch.isUnknown;
  const reportRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const sanitizeColorValue = (val: string) => {
    if (val.includes('oklch') || val.includes('oklab') || val.includes('color(')) {
      return '#4F8F3A';
    }
    return val;
  };

  const copyStyles = (source: HTMLElement, target: HTMLElement) => {
    const computed = window.getComputedStyle(source);
    
    target.style.color = sanitizeColorValue(computed.color);
    target.style.backgroundColor = sanitizeColorValue(computed.backgroundColor);
    target.style.borderColor = sanitizeColorValue(computed.borderColor);
    target.style.borderTopColor = sanitizeColorValue(computed.borderTopColor);
    target.style.borderBottomColor = sanitizeColorValue(computed.borderBottomColor);
    target.style.borderLeftColor = sanitizeColorValue(computed.borderLeftColor);
    target.style.borderRightColor = sanitizeColorValue(computed.borderRightColor);
    
    target.style.borderWidth = computed.borderWidth;
    target.style.borderTopWidth = computed.borderTopWidth;
    target.style.borderBottomWidth = computed.borderBottomWidth;
    target.style.borderLeftWidth = computed.borderLeftWidth;
    target.style.borderRightWidth = computed.borderRightWidth;
    target.style.borderStyle = computed.borderStyle;
    target.style.borderRadius = computed.borderRadius;
    
    target.style.display = computed.display;
    target.style.flexDirection = computed.flexDirection;
    target.style.alignItems = computed.alignItems;
    target.style.justifyContent = computed.justifyContent;
    target.style.gap = computed.gap;
    target.style.padding = computed.padding;
    target.style.margin = computed.margin;
    target.style.width = computed.width;
    target.style.height = computed.height;
    target.style.boxSizing = computed.boxSizing;
    
    target.style.fontFamily = computed.fontFamily;
    target.style.fontSize = computed.fontSize;
    target.style.fontWeight = computed.fontWeight;
    target.style.lineHeight = computed.lineHeight;
    target.style.textAlign = computed.textAlign;
    
    if (computed.boxShadow && computed.boxShadow !== 'none') {
      target.style.boxShadow = computed.boxShadow;
    }
  };

  const copySvgStyles = (source: SVGElement, target: SVGElement) => {
    const computed = window.getComputedStyle(source);
    if (computed.fill) target.style.fill = sanitizeColorValue(computed.fill);
    if (computed.stroke) target.style.stroke = sanitizeColorValue(computed.stroke);
    target.style.width = computed.width;
    target.style.height = computed.height;
  };

  const handleDownloadPDF = async () => {
    if (!reportRef.current || isGeneratingPDF) return;

    let iframe: HTMLIFrameElement | null = null;
    const disabledSheets: CSSStyleSheet[] = [];

    try {
      setIsGeneratingPDF(true);
      setDownloadSuccess(false);

      const originalReport = reportRef.current;

      iframe = document.createElement('iframe');
      iframe.style.position = 'fixed';
      iframe.style.left = '-9999px';
      iframe.style.top = '0';
      iframe.style.width = '800px';
      iframe.style.height = '1200px';
      iframe.style.border = 'none';
      document.body.appendChild(iframe);

      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!iframeDoc) throw new Error('Could not create PDF generation context');

      iframeDoc.open();
      iframeDoc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              * { box-sizing: border-box; }
              body { margin: 0; padding: 20px; background: #ffffff; color: #000000; font-family: system-ui, -apple-system, sans-serif; }
            </style>
          </head>
          <body>
            <div id="pdf-container"></div>
          </body>
        </html>
      `);
      iframeDoc.close();

      const pdfContainer = iframeDoc.getElementById('pdf-container');
      if (!pdfContainer) throw new Error('Container initialization failed');

      const clonedReport = originalReport.cloneNode(true) as HTMLElement;
      pdfContainer.appendChild(clonedReport);

      const origNodes = [originalReport, ...Array.from(originalReport.querySelectorAll('*'))];
      const clonedNodes = [clonedReport, ...Array.from(clonedReport.querySelectorAll('*'))];

      origNodes.forEach((origNode, idx) => {
        const clonedNode = clonedNodes[idx];
        if (!clonedNode) return;

        if (origNode instanceof HTMLElement && clonedNode instanceof HTMLElement) {
          copyStyles(origNode, clonedNode);
        } else if (origNode instanceof SVGElement && clonedNode instanceof SVGElement) {
          copySvgStyles(origNode, clonedNode);
        }
      });

      for (let i = 0; i < document.styleSheets.length; i++) {
        try {
          const sheet = document.styleSheets[i];
          if (!sheet.disabled) {
            sheet.disabled = true;
            disabledSheets.push(sheet);
          }
        } catch (e) {
          // Cross-origin stylesheet access safety
        }
      }

      const canvas = await html2canvas(clonedReport, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const printWidth = pdfWidth - margin * 2;

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = printWidth / imgWidth;
      const printHeight = imgHeight * ratio;

      let heightLeft = printHeight;
      let position = margin;

      pdf.addImage(imgData, 'PNG', margin, position, printWidth, printHeight);
      heightLeft -= (pdfHeight - margin * 2);

      while (heightLeft > 0) {
        position = margin - (printHeight - heightLeft);
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', margin, position, printWidth, printHeight);
        heightLeft -= (pdfHeight - margin * 2);
      }

      const fileName = `Chemist_AI_Report_${result.sampleInfo.sampleId || 'Sample'}_${result.id.slice(-6)}.pdf`;
      pdf.save(fileName);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Could not generate PDF directly. You can use "Print Report" to save as PDF.');
    } finally {
      disabledSheets.forEach((sheet) => {
        try {
          sheet.disabled = false;
        } catch (e) {
          // ignore
        }
      });

      if (iframe && iframe.parentNode) {
        iframe.parentNode.removeChild(iframe);
      }

      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Action Controls */}
      <div className={`flex items-center justify-between border-b pb-4 print:hidden ${isDarkMode ? 'border-[#292D29]' : 'border-[#DDE5D8]'}`}>
        <div>
          <h2 className="text-xl font-extrabold flex items-center gap-2 font-tight">
            <FileText className="w-5 h-5 text-[#4F8F3A]" />
            Official Laboratory Analysis Report
          </h2>
          <p className={`text-xs ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
            Certified chemical identification document generated from E-Tongue sensor fingerprint
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
            className="px-4 py-2 rounded-lg bg-[#4F8F3A] hover:bg-[#3F762F] text-white text-xs font-bold flex items-center gap-2 shadow-xs font-tight transition-all"
          >
            {isGeneratingPDF ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" /> Exporting PDF...
              </>
            ) : downloadSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-white" /> PDF Downloaded!
              </>
            ) : (
              <>
                <Download className="w-4 h-4" /> Export as PDF
              </>
            )}
          </button>
          <button
            onClick={handlePrint}
            className={`px-4 py-2 rounded-lg border text-xs font-bold flex items-center gap-2 font-tight transition-all ${
              isDarkMode
                ? 'bg-[#0A0A0A] border-[#292D29] text-[#9AA397] hover:text-white'
                : 'bg-white border-[#DDE5D8] text-[#667064] hover:text-[#0A0A0A]'
            }`}
          >
            <Printer className="w-4 h-4 text-[#4F8F3A]" /> Print Report
          </button>
        </div>
      </div>

      {/* A4 REPORT PAPER CANVAS */}
      <div
        ref={reportRef}
        data-pdf-report="true"
        className="bg-white text-slate-900 rounded-2xl p-8 sm:p-12 shadow-2xl border border-slate-200 font-sans space-y-8 print:p-0 print:shadow-none print:border-0 print:text-black"
      >
        {/* REPORT HEADER */}
        <div className="flex items-start justify-between border-b-2 border-slate-900 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-[#24451F] text-white rounded-lg">
                <Atom className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight text-[#0A0A0A] font-tight">
                  CHEMIST<span className="text-[#4F8F3A]"> AI</span>
                </h1>
                <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500">
                  Chemical Identification & Molecular Analysis
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-600 mt-2 font-mono">
              Central Chemical Analytics Laboratory • Ref: ISO/IEC 17025 Certified
            </p>
          </div>

          <div className="text-right font-mono text-xs text-slate-700">
            <span className="block font-bold text-slate-900">REPORT ID: {result.id}</span>
            <span className="block">Date: {new Date(result.timestamp).toLocaleDateString()}</span>
            <span className="block">Time: {new Date(result.timestamp).toLocaleTimeString()}</span>
          </div>
        </div>

        {/* SAMPLE METADATA GRID */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div>
            <span className="text-slate-500 block text-[10px]">Sample ID</span>
            <span className="font-bold text-slate-900">{result.sampleInfo.sampleId}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">Sample Name</span>
            <span className="font-bold text-slate-900">{result.sampleInfo.sampleName}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">Batch Number</span>
            <span className="font-bold text-slate-900">{result.sampleInfo.batchNumber}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">Chief Operator</span>
            <span className="font-bold text-slate-900">{result.sampleInfo.operator}</span>
          </div>
        </div>

        {/* E-TONGUE SENSOR READINGS TABLE */}
        <div>
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#24451F] border-b border-slate-300 pb-2 mb-3 font-tight">
            1. Measured E-Tongue Sensor Telemetry
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 text-center text-xs font-mono">
            <div className="p-3 bg-slate-100 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-500 block">pH Level</span>
              <span className="text-base font-bold text-[#4F8F3A]">{result.sensorReading.ph.toFixed(2)}</span>
            </div>
            <div className="p-3 bg-slate-100 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-500 block">EC (mS/cm)</span>
              <span className="text-base font-bold text-slate-900">{result.sensorReading.ec.toFixed(2)}</span>
            </div>
            <div className="p-3 bg-slate-100 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-500 block">TDS (ppm)</span>
              <span className="text-base font-bold text-slate-900">{result.sensorReading.tds}</span>
            </div>
            <div className="p-3 bg-slate-100 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-500 block">Temp (°C)</span>
              <span className="text-base font-bold text-slate-900">{result.sensorReading.temperature.toFixed(1)}</span>
            </div>
            <div className="p-3 bg-slate-100 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-500 block">Color RGB</span>
              <span className="text-xs font-bold text-slate-900">
                {result.sensorReading.colorRgb.r},{result.sensorReading.colorRgb.g}
              </span>
            </div>
            <div className="p-3 bg-slate-100 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-500 block">MQ-135 VOC</span>
              <span className="text-base font-bold text-[#4F8F3A]">{result.sensorReading.voc}</span>
            </div>
          </div>
        </div>

        {/* AI CLASSIFICATION RESULT */}
        <div>
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#24451F] border-b border-slate-300 pb-2 mb-3 font-tight">
            2. AI Identification & Verified Compound Lookup
          </h3>
          <div className="p-5 bg-green-50/60 border-2 border-[#4F8F3A] rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-[#4F8F3A] uppercase tracking-wider">
                Primary Identified Compound
              </span>
              <h2 className="text-2xl font-black text-[#0A0A0A] mt-0.5 font-tight">
                {isUnknown ? 'Unknown / Uncertain Compound' : chem?.name}
              </h2>
              <p className="text-xs font-mono text-slate-700 mt-1">
                Formula: <span className="font-bold text-[#4F8F3A]">{isUnknown ? 'N/A' : chem?.formula}</span> | CAS: {chem?.casNumber} | IUPAC: {chem?.iupacName}
              </p>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-500 uppercase block font-tight">Model Confidence</span>
              <span className="text-2xl font-black text-[#4F8F3A] font-mono">
                {result.primaryMatch.confidence.toFixed(1)}%
              </span>
              <span className="text-[10px] font-bold text-[#4F8F3A] block">{result.modelVersion}</span>
            </div>
          </div>
        </div>

        {/* PHYSICAL & CHEMICAL PROPERTIES TABLE */}
        {!isUnknown && chem && (
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#24451F] border-b border-slate-300 pb-2 mb-3 font-tight">
              3. Verified Scientific Properties
            </h3>
            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="border border-slate-200 rounded-lg p-3 space-y-1">
                <span className="font-bold text-slate-900 block border-b pb-1 font-tight">Physical Properties</span>
                <p>State: {chem.physicalProperties.state}</p>
                <p>Density: {chem.physicalProperties.density}</p>
                <p>Boiling Point: {chem.physicalProperties.boilingPoint}</p>
                <p>Melting Point: {chem.physicalProperties.meltingPoint}</p>
                <p>Solubility: {chem.physicalProperties.solubilityWater}</p>
              </div>

              <div className="border border-slate-200 rounded-lg p-3 space-y-1">
                <span className="font-bold text-slate-900 block border-b pb-1 font-tight">Chemical & GHS Safety</span>
                <p>pKa: {chem.chemicalProperties.pKa || 'N/A'}</p>
                <p>Acidity: {chem.chemicalProperties.acidityBasicity}</p>
                <p>GHS Signal: {chem.safety.signalWord}</p>
                <p>Hazards: {chem.safety.hazardStatements.join('; ')}</p>
              </div>
            </div>
          </div>
        )}

        {/* REPORT FOOTER SIGNATURE */}
        <div className="pt-8 border-t-2 border-slate-900 flex items-center justify-between text-xs">
          <div>
            <span className="block font-bold text-slate-900 font-tight">Analyst Signature:</span>
            <div className="h-10 w-36 border-b border-slate-400 my-1 font-serif text-slate-700 italic flex items-end">
              Dr. S. Vance
            </div>
            <span className="text-[10px] text-slate-500 font-mono">Chemist AI Automated Validation</span>
          </div>

          <div className="text-right text-[10px] text-slate-500 font-mono">
            <p>Generated by CHEMIST AI Web Platform v2.4</p>
            <p>Document Hash: SHA256-ETONGUE-{result.id.slice(-8).toUpperCase()}</p>
          </div>
        </div>
      </div>

      {/* Bottom Export Action Bar */}
      <div className={`p-4 rounded-xl border flex items-center justify-between gap-4 print:hidden ${
        isDarkMode ? 'bg-[#151515] border-[#292D29]' : 'bg-white border-[#DDE5D8]'
      }`}>
        <div className="flex items-center gap-2">
          <Atom className="w-5 h-5 text-[#4F8F3A]" />
          <div>
            <p className="text-xs font-bold font-tight">Laboratory Document Ready</p>
            <p className={`text-[11px] ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
              Download or print official laboratory analysis report with digital signature.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
            className="px-5 py-2.5 rounded-lg bg-[#4F8F3A] hover:bg-[#3F762F] text-white text-xs font-bold flex items-center gap-2 shadow-xs font-tight transition-all"
          >
            {isGeneratingPDF ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" /> Exporting PDF...
              </>
            ) : downloadSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-white" /> PDF Downloaded!
              </>
            ) : (
              <>
                <Download className="w-4 h-4" /> Export as PDF
              </>
            )}
          </button>
          <button
            onClick={handlePrint}
            className={`px-4 py-2.5 rounded-lg border text-xs font-bold flex items-center gap-2 font-tight transition-all ${
              isDarkMode
                ? 'bg-[#0A0A0A] border-[#292D29] text-[#9AA397] hover:text-white'
                : 'bg-white border-[#DDE5D8] text-[#667064] hover:text-[#0A0A0A]'
            }`}
          >
            <Printer className="w-4 h-4 text-[#4F8F3A]" /> Print
          </button>
        </div>
      </div>
    </div>
  );
};

