import React from 'react';
import { Sliders, RotateCcw } from 'lucide-react';

interface ImageFilter {
  brightness: number;
  contrast: number;
  saturation: number;
  blur: number;
  sepia: number;
  grayscale: number;
}

interface FilterPanelProps {
  filters: ImageFilter;
  onUpdate: (filters: ImageFilter) => void;
  onApply: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onUpdate, onApply }) => {
  const updateFilter = (key: keyof ImageFilter, value: number) => {
    onUpdate({ ...filters, [key]: value });
  };

  const resetFilters = () => {
    onUpdate({
      brightness: 100,
      contrast: 100,
      saturation: 100,
      blur: 0,
      sepia: 0,
      grayscale: 0
    });
  };

  const filterConfigs = [
    { key: 'brightness' as keyof ImageFilter, label: 'Brightness', min: 0, max: 200, unit: '%' },
    { key: 'contrast' as keyof ImageFilter, label: 'Contrast', min: 0, max: 200, unit: '%' },
    { key: 'saturation' as keyof ImageFilter, label: 'Saturation', min: 0, max: 200, unit: '%' },
    { key: 'blur' as keyof ImageFilter, label: 'Blur', min: 0, max: 10, unit: 'px' },
    { key: 'sepia' as keyof ImageFilter, label: 'Sepia', min: 0, max: 100, unit: '%' },
    { key: 'grayscale' as keyof ImageFilter, label: 'Grayscale', min: 0, max: 100, unit: '%' }
  ];

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
          <Sliders size={18} />
          Image Filters
        </h3>
        <button
          onClick={resetFilters}
          className="text-gray-500 hover:text-gray-700 transition-colors"
          title="Reset filters"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      <div className="space-y-4">
        {filterConfigs.map(({ key, label, min, max, unit }) => (
          <div key={key}>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium text-gray-700">
                {label}
              </label>
              <span className="text-sm text-gray-500">
                {filters[key]}{unit}
              </span>
            </div>
            <input
              type="range"
              min={min}
              max={max}
              value={filters[key]}
              onChange={(e) => updateFilter(key, parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        ))}

        <button
          onClick={onApply}
          className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Apply Filters
        </button>

        {/* Filter Presets */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quick Presets
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onUpdate({
                brightness: 120,
                contrast: 110,
                saturation: 120,
                blur: 0,
                sepia: 0,
                grayscale: 0
              })}
              className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Vibrant
            </button>
            <button
              onClick={() => onUpdate({
                brightness: 90,
                contrast: 120,
                saturation: 80,
                blur: 0,
                sepia: 20,
                grayscale: 0
              })}
              className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Vintage
            </button>
            <button
              onClick={() => onUpdate({
                brightness: 100,
                contrast: 100,
                saturation: 100,
                blur: 0,
                sepia: 0,
                grayscale: 100
              })}
              className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              B&W
            </button>
            <button
              onClick={() => onUpdate({
                brightness: 110,
                contrast: 90,
                saturation: 110,
                blur: 1,
                sepia: 0,
                grayscale: 0
              })}
              className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Soft
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;