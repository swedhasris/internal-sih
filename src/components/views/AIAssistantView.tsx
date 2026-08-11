import React, { useState, useEffect } from 'react';
import {
  Bot,
  Send,
  User,
  RefreshCw,
  Copy,
  Check,
  Paperclip,
  Trash2,
  Plus,
  FlaskConical,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import Markdown from 'react-markdown';
import { AnalysisResult, Chemical } from '../../types/chemist';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  model?: string;
}

interface Conversation {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
}

interface AIAssistantViewProps {
  isDarkMode: boolean;
  currentResult?: AnalysisResult | null;
  selectedChemical?: Chemical | null;
  setActiveTab?: (tab: any) => void;
}

export const AIAssistantView: React.FC<AIAssistantViewProps> = ({
  isDarkMode,
  currentResult,
  selectedChemical,
}) => {
  // Attached chemical context state
  const [attachContext, setAttachContext] = useState<boolean>(true);
  
  // Active conversation & history state
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<string>('default-session');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  
  // UI interaction state
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showHistoryDrawer, setShowHistoryDrawer] = useState(false);

  // Derived chemical context payload
  const activeChem = currentResult?.primaryMatch?.chemical || selectedChemical || {
    name: 'Ethanol',
    formula: 'C₂H₆O',
    iupacName: 'Ethanol',
    casNumber: '64-17-5',
    molecularWeight: 46.07,
    classCategory: 'Alcohols',
    functionalGroups: ['Hydroxyl (-OH)'],
    physicalProperties: {
      state: 'Liquid',
      appearance: 'Clear colorless liquid',
      color: 'Colorless',
      odor: 'Alcoholic',
      density: '0.789 g/cm³',
      meltingPoint: '-114.1 °C',
      boilingPoint: '78.37 °C',
      flashPoint: '13 °C',
      solubilityWater: 'Miscible in water',
    },
    chemicalProperties: {
      acidityBasicity: 'Weak acid / amphoteric',
      reactivity: 'Reacts with strong oxidizers, alkali metals',
      stability: 'Stable under recommended conditions',
      chemicalCompatibility: 'Incompatible with strong acids, acid chlorides',
      decomposition: 'Carbon monoxide, carbon dioxide on combustion',
    },
    safety: {
      pictograms: ['Flammable', 'Irritant'],
      signalWord: 'Danger' as const,
      hazardStatements: ['H225: Highly flammable liquid and vapor', 'H319: Causes serious eye irritation'],
      precautionaryStatements: ['P210: Keep away from heat/sparks/open flames', 'P305+P351+P338: IF IN EYES Rinse cautiously with water'],
      storageRequirements: 'Store in cool, well-ventilated flammable liquid storage cabinet',
      handlingInfo: 'Use explosion-proof ventilation equipment and PPE',
      recommendedPPE: ['Safety Glasses', 'Nitrile Gloves', 'Lab Coat'],
    },
  };

  const chemicalContextPayload = attachContext
    ? {
        name: activeChem.name,
        formula: activeChem.formula,
        iupacName: activeChem.iupacName,
        casNumber: activeChem.casNumber,
        molecularWeight: activeChem.molecularWeight,
        classCategory: activeChem.classCategory,
        functionalGroups: activeChem.functionalGroups,
        physicalProperties: activeChem.physicalProperties,
        chemicalProperties: activeChem.chemicalProperties,
        safety: activeChem.safety,
        sensorReadings: currentResult?.sensorReading || {
          ph: 6.82,
          ec: 1.24,
          tds: 620,
          temperature: 27.4,
          colorRgb: { r: 245, g: 248, b: 252 },
          voc: 680,
        },
        aiConfidence: currentResult?.primaryMatch?.confidence || 94.6,
        aiModelPrediction: `${activeChem.name} (${currentResult?.primaryMatch?.confidence || 94.6}%)`,
        alternativePredictions: currentResult?.alternativeMatches?.map(
          (m) => `${m.chemicalName} (${m.confidence}%)`
        ) || ['Methanol (3.2%)', 'Water (1.1%)', 'Isopropanol (0.8%)'],
      }
    : null;

  // Initialize conversations on mount
  useEffect(() => {
    const defaultConv: Conversation = {
      id: 'default-session',
      title: `Analysis of ${activeChem.name}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [
        {
          id: 'welcome-msg',
          sender: 'assistant',
          text: `Welcome to **CHEMIST AI ASSISTANT** — your dedicated chemistry analysis companion.\n\nI have automatically loaded the current context for **${activeChem.name}** (**${activeChem.formula}**, MW: ${activeChem.molecularWeight} g/mol).\n\nAsk me anything about its molecular bonding, GHS safety protocols, physical/chemical properties, or Electronic Tongue sensor fingerprint analysis!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          model: 'Chemist AI Core',
        },
      ],
    };

    setConversations([defaultConv]);
    setMessages(defaultConv.messages);
  }, []);

  // Quick Questions
  const quickQuestions = [
    'What is the chemical formula?',
    'Explain the molecular structure.',
    'Explain the chemical bonds.',
    'What elements are present?',
    'What are the physical properties?',
    'What are the chemical properties?',
    'Compare this chemical with another compound.',
    'Explain the AI identification result.',
    'Explain the sensor fingerprint.',
  ];

  // Send message handler
  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsgTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      text: query,
      timestamp: userMsgTime,
    };

    // Update message list locally
    const updatedMsgs = [...messages, userMsg];
    setMessages(updatedMsgs);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          chemicalContext: chemicalContextPayload,
          conversationId: activeConvId,
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Too many requests. Please try again shortly.');
        }
        throw new Error('Chemist AI Assistant is temporarily unavailable.');
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const botMsg: ChatMessage = {
        id: `msg-${Date.now()}-assistant`,
        sender: 'assistant',
        text: data.answer || 'Chemist AI Assistant is temporarily unavailable.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        model: data.model || 'OpenAI API',
      };

      setMessages((prev) => [...prev, botMsg]);

      // Update conversations history
      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeConvId
            ? { ...c, messages: [...c.messages, userMsg, botMsg], updatedAt: new Date().toISOString() }
            : c
        )
      );
    } catch (err: any) {
      const errText =
        err.message || 'Chemist AI Assistant is temporarily unavailable.';

      const errorMsg: ChatMessage = {
        id: `msg-${Date.now()}-err`,
        sender: 'assistant',
        text: `⚠️ ${errText}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  // Start new conversation
  const handleNewConversation = () => {
    const newId = `conv-${Date.now()}`;
    const newConv: Conversation = {
      id: newId,
      title: `New Chemical Chat ${conversations.length + 1}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [
        {
          id: `welcome-${newId}`,
          sender: 'assistant',
          text: `Started a new conversation with **CHEMIST AI ASSISTANT**.\n\nCurrent chemical context: **${activeChem.name}** (**${activeChem.formula}**).\n\nHow can I help you analyze this chemical sample?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ],
    };

    setConversations((prev) => [newConv, ...prev]);
    setActiveConvId(newId);
    setMessages(newConv.messages);
  };

  // Clear current conversation
  const handleClearConversation = () => {
    setMessages([]);
    setConversations((prev) =>
      prev.map((c) => (c.id === activeConvId ? { ...c, messages: [] } : c))
    );
  };

  // Copy message
  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Regenerate last response
  const handleRegenerate = () => {
    const lastUserMsg = [...messages].reverse().find((m) => m.sender === 'user');
    if (lastUserMsg) {
      handleSendMessage(lastUserMsg.text);
    }
  };

  return (
    <div className="space-y-4 max-w-6xl mx-auto flex flex-col h-[calc(100vh-120px)] font-sans">
      {/* Header Bar */}
      <div
        className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 flex-shrink-0 ${
          isDarkMode
            ? 'bg-[#151515] border-[#292D29]'
            : 'bg-white border-[#DDE5D8] shadow-xs'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#24451F] border border-[#4F8F3A]/40 text-[#78A85A] rounded-xl flex items-center justify-center shadow-xs">
            <FlaskConical className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-extrabold tracking-tight font-tight">
                CHEMIST AI ASSISTANT
              </h2>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#24451F] text-[#78A85A] border border-[#4F8F3A]/40 font-tight">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4F8F3A] animate-ping" />
                Online
              </span>
            </div>
            <p className={`text-xs ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
              Your intelligent chemistry analysis companion.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <button
            onClick={() => setShowHistoryDrawer(!showHistoryDrawer)}
            className={`px-3 py-2 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition-colors font-tight ${
              isDarkMode
                ? 'bg-[#0A0A0A] border-[#292D29] text-[#9AA397] hover:text-white'
                : 'bg-[#F6F7F3] border-[#DDE5D8] text-[#667064] hover:text-[#0A0A0A]'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#4F8F3A]" />
            History ({conversations.length})
          </button>

          <button
            onClick={handleNewConversation}
            className="px-3.5 py-2 rounded-lg bg-[#4F8F3A] hover:bg-[#3F762F] text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all font-tight"
          >
            <Plus className="w-3.5 h-3.5" /> New Chat
          </button>

          <button
            onClick={handleClearConversation}
            title="Clear current chat"
            className={`p-2 rounded-lg border text-xs transition-colors font-tight ${
              isDarkMode
                ? 'bg-[#0A0A0A] border-[#292D29] text-[#9AA397] hover:text-red-400'
                : 'bg-white border-[#DDE5D8] text-[#667064] hover:text-red-600'
            }`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Workspace Layout (Sidebar + Chat Area) */}
      <div className="flex-1 flex gap-4 min-h-0 overflow-hidden relative">
        {/* History Drawer Sidebar */}
        {showHistoryDrawer && (
          <div
            className={`w-64 flex-shrink-0 p-3 rounded-2xl border flex flex-col gap-2 overflow-y-auto custom-scrollbar z-20 ${
              isDarkMode ? 'bg-[#151515] border-[#292D29]' : 'bg-white border-[#DDE5D8]'
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#292D29]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#4F8F3A] font-tight">
                Conversations
              </span>
              <button
                onClick={() => setShowHistoryDrawer(false)}
                className="text-xs text-[#9AA397] hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            {conversations.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setActiveConvId(c.id);
                  setMessages(c.messages);
                }}
                className={`p-2.5 rounded-xl border text-left text-xs transition-all flex flex-col gap-1 font-tight ${
                  c.id === activeConvId
                    ? 'bg-[#24451F] border-[#4F8F3A]/50 text-white font-bold'
                    : isDarkMode
                    ? 'bg-[#0A0A0A] border-[#292D29] text-[#9AA397] hover:text-white'
                    : 'bg-[#F6F7F3] border-[#DDE5D8] text-[#667064] hover:text-[#0A0A0A]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="truncate flex-1 font-bold">{c.title}</span>
                </div>
                <span className="text-[10px] opacity-70">
                  {new Date(c.updatedAt).toLocaleDateString()}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Chat Interface Container */}
        <div className="flex-1 flex flex-col min-w-0 min-h-0 space-y-3">
          {/* Context Badge Banner */}
          <div
            className={`p-3 rounded-xl border flex flex-wrap items-center justify-between gap-3 text-xs font-tight ${
              attachContext
                ? isDarkMode
                  ? 'bg-[#24451F]/30 border-[#4F8F3A]/40 text-[#E0E2DC]'
                  : 'bg-[#F1F6F0] border-[#4F8F3A]/30 text-[#151515]'
                : isDarkMode
                ? 'bg-[#0A0A0A] border-[#292D29] text-[#9AA397]'
                : 'bg-white border-[#DDE5D8] text-[#667064]'
            }`}
          >
            <div className="flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-[#4F8F3A]" />
              <span>
                <strong>Analysis Context</strong>:{' '}
                {attachContext ? (
                  <>
                    <span className="font-bold text-[#4F8F3A]">{activeChem.name}</span>{' '}
                    ({activeChem.formula}) — MW: {activeChem.molecularWeight} g/mol | AI Confidence:{' '}
                    <strong>{currentResult?.primaryMatch?.confidence || 94.6}%</strong>
                  </>
                ) : (
                  <span className="italic">Detached (General Chemistry Mode)</span>
                )}
              </span>
            </div>

            <button
              onClick={() => setAttachContext(!attachContext)}
              className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold flex items-center gap-1 transition-colors ${
                attachContext
                  ? 'bg-[#4F8F3A] text-white border-transparent'
                  : isDarkMode
                  ? 'bg-[#151515] border-[#292D29] text-[#9AA397]'
                  : 'bg-white border-[#DDE5D8] text-[#667064]'
              }`}
            >
              <Paperclip className="w-3 h-3" />
              {attachContext ? 'Context Attached' : 'Attach Analysis'}
            </button>
          </div>

          {/* Quick Questions Suggested Prompts */}
          <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1 flex-shrink-0">
            <span className="text-[11px] font-bold text-[#4F8F3A] whitespace-nowrap flex items-center gap-1 font-tight">
              <Sparkles className="w-3 h-3" /> Suggested:
            </span>
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className={`px-3 py-1 rounded-lg border text-xs whitespace-nowrap transition-all font-tight ${
                  isDarkMode
                    ? 'bg-[#151515] border-[#292D29] text-[#9AA397] hover:text-white hover:border-[#4F8F3A]'
                    : 'bg-white border-[#DDE5D8] text-[#667064] hover:text-[#0A0A0A] hover:border-[#4F8F3A]'
                }`}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Messages Display Box */}
          <div
            className={`flex-1 p-4 rounded-2xl border overflow-y-auto space-y-4 custom-scrollbar min-h-0 ${
              isDarkMode ? 'bg-[#151515] border-[#292D29]' : 'bg-white border-[#DDE5D8] shadow-xs'
            }`}
          >
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-xs text-[#9AA397]">
                <FlaskConical className="w-10 h-10 text-[#4F8F3A] mb-2 animate-bounce" />
                <p className="font-bold text-sm text-[#E0E2DC]">No messages in this chat session</p>
                <p className="mt-1">Ask a question below or click a suggested prompt above.</p>
              </div>
            ) : (
              messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-3 max-w-4xl ${
                    m.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                  }`}
                >
                  {/* Sender Icon */}
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-xs shadow-xs ${
                      m.sender === 'user'
                        ? 'bg-[#181818] text-white border border-[#292D29]'
                        : 'bg-[#24451F] text-[#78A85A] border border-[#4F8F3A]/40'
                    }`}
                  >
                    {m.sender === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-[#78A85A]" />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`p-4 rounded-2xl text-xs leading-relaxed space-y-2 border max-w-2xl ${
                      m.sender === 'user'
                        ? 'bg-[#181818] text-white border-[#292D29] rounded-tr-none font-tight shadow-xs'
                        : isDarkMode
                        ? 'bg-[#0A0A0A] text-[#E0E2DC] border-[#292D29] rounded-tl-none font-tight'
                        : 'bg-[#F6F7F3] text-[#151515] border-[#DDE5D8] rounded-tl-none font-tight'
                    }`}
                  >
                    {/* Header line */}
                    <div className="flex items-center justify-between text-[10px] border-b border-[#292D29]/40 pb-1 mb-1 font-mono">
                      <span className="font-bold text-[#4F8F3A]">
                        {m.sender === 'user' ? 'You' : 'CHEMIST AI ASSISTANT'}
                      </span>
                      <div className="flex items-center gap-2 opacity-70">
                        {m.model && <span>{m.model}</span>}
                        <span>{m.timestamp}</span>
                      </div>
                    </div>

                    {/* Body Text via Markdown */}
                    <div className="markdown-body text-xs space-y-2">
                      <Markdown>{m.text}</Markdown>
                    </div>

                    {/* Action Bar for AI Messages */}
                    {m.sender === 'assistant' && (
                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#292D29]/30 text-[11px] font-mono">
                        <button
                          onClick={() => handleCopyText(m.id, m.text)}
                          className="px-2 py-1 rounded bg-[#24451F]/30 hover:bg-[#24451F] text-[#78A85A] flex items-center gap-1 transition-colors"
                        >
                          {copiedId === m.id ? (
                            <>
                              <Check className="w-3 h-3 text-[#4F8F3A]" /> Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" /> Copy Response
                            </>
                          )}
                        </button>

                        <button
                          onClick={handleRegenerate}
                          className="px-2 py-1 rounded bg-[#24451F]/30 hover:bg-[#24451F] text-[#78A85A] flex items-center gap-1 transition-colors"
                        >
                          <RefreshCw className="w-3 h-3" /> Regenerate
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}

            {/* Loading Indicator */}
            {loading && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-[#24451F]/30 border border-[#4F8F3A]/40 text-xs text-[#78A85A] font-mono animate-pulse w-fit font-tight">
                <RefreshCw className="w-4 h-4 animate-spin text-[#4F8F3A]" />
                Chemist AI is analyzing...
              </div>
            )}
          </div>

          {/* Input Controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask anything about this chemical, bonding, sensor fingerprint..."
              className={`flex-1 p-3.5 text-xs rounded-xl border outline-none transition-all font-tight ${
                isDarkMode
                  ? 'bg-[#0A0A0A] border-[#292D29] text-white focus:border-[#4F8F3A]'
                  : 'bg-white border-[#DDE5D8] text-[#0A0A0A] focus:border-[#4F8F3A]'
              }`}
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={loading || !input.trim()}
              className="px-5 py-3.5 rounded-xl bg-[#4F8F3A] hover:bg-[#3F762F] disabled:opacity-50 text-white text-xs font-bold shadow-xs flex items-center gap-2 font-tight transition-all"
            >
              <Send className="w-4 h-4" /> Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
