import React, { useState } from 'react';
import { Cpu, Bluetooth, Wifi, BatteryCharging, RefreshCw, CheckCircle2, Zap } from 'lucide-react';

interface DeviceManagementViewProps {
  isDarkMode: boolean;
}

export const DeviceManagementView: React.FC<DeviceManagementViewProps> = ({ isDarkMode }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleUpdateFirmware = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 4000);
    }, 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className={`flex items-center justify-between border-b pb-4 ${isDarkMode ? 'border-[#292D29]' : 'border-[#DDE5D8]'}`}>
        <div>
          <h2 className="text-xl font-extrabold flex items-center gap-2 font-tight">
            <Cpu className="w-5 h-5 text-[#4F8F3A]" />
            E-Tongue Hardware & Device Management
          </h2>
          <p className={`text-xs ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
            Monitor ESP32 microcontroller status, Bluetooth BLE connection telemetry, and OTA firmware
          </p>
        </div>
      </div>

      {/* Main Hardware Card */}
      <div
        className={`p-6 rounded-2xl border space-y-6 ${
          isDarkMode ? 'bg-[#151515] border-[#292D29]' : 'bg-white border-[#DDE5D8] shadow-xs'
        }`}
      >
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 ${isDarkMode ? 'border-[#292D29]' : 'border-[#DDE5D8]'}`}>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#24451F] border border-[#4F8F3A]/40 text-[#78A85A] rounded-2xl">
              <Zap className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-bold flex items-center gap-2 font-tight">
                Chemist AI E-Tongue Mainboard
                <span className="w-2.5 h-2.5 rounded-full bg-[#4F8F3A] animate-pulse" />
              </h3>
              <p className={`text-xs font-mono ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
                Device ID: ESP32-ETONGUE-88A | Serial: #SN-2026-883921
              </p>
            </div>
          </div>

          <button
            onClick={handleUpdateFirmware}
            disabled={isUpdating}
            className="px-4 py-2.5 rounded-lg bg-[#4F8F3A] hover:bg-[#3F762F] text-white text-xs font-bold shadow-xs flex items-center gap-2 font-tight"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isUpdating ? 'animate-spin' : ''}`} />
            {isUpdating ? 'Flashing Firmware v2.4...' : 'Check OTA Firmware Update'}
          </button>
        </div>

        {updateSuccess && (
          <div className="p-3 bg-[#24451F] border border-[#4F8F3A]/50 text-[#78A85A] rounded-xl text-xs font-semibold flex items-center gap-2 font-tight">
            <CheckCircle2 className="w-4 h-4 text-[#4F8F3A]" />
            Firmware updated successfully to v2.4.1-BUILD! ESP32 recalibrated.
          </div>
        )}

        {/* Hardware Status Specs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div className={`p-3 border rounded-xl ${isDarkMode ? 'bg-[#0A0A0A] border-[#292D29]' : 'bg-[#F6F7F3] border-[#DDE5D8]'}`}>
            <span className={`block text-[10px] ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>BLE Signal</span>
            <span className="text-base font-bold flex items-center gap-1 mt-0.5 font-tight">
              <Bluetooth className="w-4 h-4 text-[#4F8F3A]" /> -64 dBm
            </span>
          </div>

          <div className={`p-3 border rounded-xl ${isDarkMode ? 'bg-[#0A0A0A] border-[#292D29]' : 'bg-[#F6F7F3] border-[#DDE5D8]'}`}>
            <span className={`block text-[10px] ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>LiPo Battery</span>
            <span className="text-base font-bold text-[#4F8F3A] flex items-center gap-1 mt-0.5 font-tight">
              <BatteryCharging className="w-4 h-4 text-[#4F8F3A]" /> 92%
            </span>
          </div>

          <div className={`p-3 border rounded-xl ${isDarkMode ? 'bg-[#0A0A0A] border-[#292D29]' : 'bg-[#F6F7F3] border-[#DDE5D8]'}`}>
            <span className={`block text-[10px] ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>Wi-Fi SSID</span>
            <span className="text-base font-bold flex items-center gap-1 mt-0.5 font-tight">
              <Wifi className="w-4 h-4 text-[#4F8F3A]" /> ChemLab_5G
            </span>
          </div>

          <div className={`p-3 border rounded-xl ${isDarkMode ? 'bg-[#0A0A0A] border-[#292D29]' : 'bg-[#F6F7F3] border-[#DDE5D8]'}`}>
            <span className={`block text-[10px] ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>Firmware Version</span>
            <span className="text-base font-bold text-[#78A85A] block mt-0.5 font-tight">v2.4.1</span>
          </div>
        </div>

        {/* Sensor Subsystems Check Table */}
        <div>
          <h4 className={`text-xs font-bold uppercase mb-3 font-tight ${isDarkMode ? 'text-[#9AA397]' : 'text-[#667064]'}`}>
            Integrated Hardware Module Diagnostics
          </h4>
          <div className="space-y-2 text-xs font-mono">
            <div className={`p-3 border rounded-xl flex items-center justify-between ${isDarkMode ? 'bg-[#0A0A0A] border-[#292D29]' : 'bg-[#F6F7F3] border-[#DDE5D8]'}`}>
              <span className="font-bold">ADS1115 16-Bit ADC I2C</span>
              <span className="text-[#4F8F3A] font-bold">OK (0x48 Address Ack)</span>
            </div>
            <div className={`p-3 border rounded-xl flex items-center justify-between ${isDarkMode ? 'bg-[#0A0A0A] border-[#292D29]' : 'bg-[#F6F7F3] border-[#DDE5D8]'}`}>
              <span className="font-bold">DS18B20 1-Wire Thermal Sensor</span>
              <span className="text-[#4F8F3A] font-bold">OK (0x28 Probe Ack)</span>
            </div>
            <div className={`p-3 border rounded-xl flex items-center justify-between ${isDarkMode ? 'bg-[#0A0A0A] border-[#292D29]' : 'bg-[#F6F7F3] border-[#DDE5D8]'}`}>
              <span className="font-bold">TCS3200 Frequency Output</span>
              <span className="text-[#4F8F3A] font-bold">OK (Scalable 20% Mode)</span>
            </div>
            <div className={`p-3 border rounded-xl flex items-center justify-between ${isDarkMode ? 'bg-[#0A0A0A] border-[#292D29]' : 'bg-[#F6F7F3] border-[#DDE5D8]'}`}>
              <span className="font-bold">MQ-135 Gas Sensor Heater</span>
              <span className="text-[#4F8F3A] font-bold">OK (5.0V Regulated)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

