import React from 'react';
import { Type, Bold, Italic, Trash2 } from 'lucide-react';

interface TextBox {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  color: string;
  fontWeight: string;
  fontStyle: string;
  strokeColor: string;
  strokeWidth: number;
}

interface TextEditorProps {
  textBox: TextBox;
  onUpdate: (updates: Partial<TextBox>) => void;
  onDelete: () => void;
}

const FONT_FAMILIES = [
  'Impact',
  'Arial',
  'Helvetica',
  'Times New Roman',
  'Courier New',
  'Comic Sans MS',
  'Georgia',
  'Verdana',
  'Trebuchet MS',
  'Arial Black'
];

const PRESET_COLORS = [
  '#ffffff', '#000000', '#ff0000', '#00ff00', '#0000ff',
  '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#800080',
  '#ffc0cb', '#a52a2a', '#808080', '#008000', '#000080'
];

const TextEditor: React.FC<TextEditorProps> = ({ textBox, onUpdate, onDelete }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
          <Type size={18} />
          Text Editor
        </h3>
        <button
          onClick={onDelete}
          className="text-red-500 hover:text-red-700 transition-colors"
          title="Delete text box"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="space-y-4">
        {/* Text Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Text
          </label>
          <textarea
            value={textBox.text}
            onChange={(e) => onUpdate({ text: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
            placeholder="Enter your meme text..."
          />
        </div>

        {/* Font Family */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Font Family
          </label>
          <select
            value={textBox.fontFamily}
            onChange={(e) => onUpdate({ fontFamily: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {FONT_FAMILIES.map(font => (
              <option key={font} value={font} style={{ fontFamily: font }}>
                {font}
              </option>
            ))}
          </select>
        </div>

        {/* Font Size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Font Size: {textBox.fontSize}px
          </label>
          <input
            type="range"
            min="12"
            max="120"
            value={textBox.fontSize}
            onChange={(e) => onUpdate({ fontSize: parseInt(e.target.value) })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Font Style Buttons */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Font Style
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => onUpdate({ 
                fontWeight: textBox.fontWeight === 'bold' ? 'normal' : 'bold' 
              })}
              className={`flex items-center justify-center w-10 h-10 rounded-md border transition-colors ${
                textBox.fontWeight === 'bold'
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Bold size={16} />
            </button>
            <button
              onClick={() => onUpdate({ 
                fontStyle: textBox.fontStyle === 'italic' ? 'normal' : 'italic' 
              })}
              className={`flex items-center justify-center w-10 h-10 rounded-md border transition-colors ${
                textBox.fontStyle === 'italic'
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Italic size={16} />
            </button>
          </div>
        </div>

        {/* Text Color */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Text Color
          </label>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="color"
              value={textBox.color}
              onChange={(e) => onUpdate({ color: e.target.value })}
              className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
            />
            <input
              type="text"
              value={textBox.color}
              onChange={(e) => onUpdate({ color: e.target.value })}
              className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="#ffffff"
            />
          </div>
          <div className="grid grid-cols-5 gap-1">
            {PRESET_COLORS.map(color => (
              <button
                key={color}
                onClick={() => onUpdate({ color })}
                className={`w-8 h-8 rounded border-2 transition-all ${
                  textBox.color === color ? 'border-blue-500 scale-110' : 'border-gray-300'
                }`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Stroke Color */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Outline Color
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={textBox.strokeColor}
              onChange={(e) => onUpdate({ strokeColor: e.target.value })}
              className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
            />
            <input
              type="text"
              value={textBox.strokeColor}
              onChange={(e) => onUpdate({ strokeColor: e.target.value })}
              className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="#000000"
            />
          </div>
        </div>

        {/* Stroke Width */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Outline Width: {textBox.strokeWidth}px
          </label>
          <input
            type="range"
            min="0"
            max="10"
            value={textBox.strokeWidth}
            onChange={(e) => onUpdate({ strokeWidth: parseInt(e.target.value) })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default TextEditor;