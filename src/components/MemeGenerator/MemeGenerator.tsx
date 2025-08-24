import React, { useState, useRef, useEffect, useCallback } from 'react';
import { fabric } from 'fabric';
import html2canvas from 'html2canvas';
import { 
  Upload, 
  Download, 
  Type, 
  Palette, 
  Sliders, 
  Sparkles,
  Plus,
  Trash2,
  Move,
  RotateCcw
} from 'lucide-react';
import TextEditor from './TextEditor';
import FilterPanel from './FilterPanel';
import AITextGenerator from './AITextGenerator';
import ImageUploader from './ImageUploader';

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

interface ImageFilter {
  brightness: number;
  contrast: number;
  saturation: number;
  blur: number;
  sepia: number;
  grayscale: number;
}

const MemeGenerator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [textBoxes, setTextBoxes] = useState<TextBox[]>([]);
  const [selectedTextBox, setSelectedTextBox] = useState<string | null>(null);
  const [activePanel, setActivePanel] = useState<'text' | 'filters' | 'ai' | null>(null);
  const [imageFilters, setImageFilters] = useState<ImageFilter>({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    blur: 0,
    sepia: 0,
    grayscale: 0
  });
  const [isLoading, setIsLoading] = useState(false);

  // Initialize Fabric.js canvas
  useEffect(() => {
    if (canvasRef.current && !fabricCanvasRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: 800,
        height: 600,
        backgroundColor: '#f0f0f0'
      });
      
      fabricCanvasRef.current = canvas;

      // Handle text selection
      canvas.on('selection:created', (e) => {
        const activeObject = e.selected?.[0];
        if (activeObject && activeObject.type === 'textbox') {
          setSelectedTextBox(activeObject.id || '');
        }
      });

      canvas.on('selection:cleared', () => {
        setSelectedTextBox(null);
      });

      return () => {
        canvas.dispose();
        fabricCanvasRef.current = null;
      };
    }
  }, []);

  // Update canvas size based on image
  const updateCanvasSize = useCallback((img: HTMLImageElement) => {
    if (!fabricCanvasRef.current) return;

    const maxWidth = 800;
    const maxHeight = 600;
    const aspectRatio = img.width / img.height;

    let newWidth = img.width;
    let newHeight = img.height;

    if (newWidth > maxWidth) {
      newWidth = maxWidth;
      newHeight = newWidth / aspectRatio;
    }

    if (newHeight > maxHeight) {
      newHeight = maxHeight;
      newWidth = newHeight * aspectRatio;
    }

    fabricCanvasRef.current.setDimensions({
      width: newWidth,
      height: newHeight
    });
  }, []);

  // Load image onto canvas
  const loadImageToCanvas = useCallback((imageSrc: string) => {
    if (!fabricCanvasRef.current) return;

    fabric.Image.fromURL(imageSrc, (img) => {
      if (!fabricCanvasRef.current) return;

      fabricCanvasRef.current.clear();
      
      const htmlImg = new Image();
      htmlImg.onload = () => {
        updateCanvasSize(htmlImg);
        
        img.set({
          left: 0,
          top: 0,
          selectable: false,
          evented: false
        });

        img.scaleToWidth(fabricCanvasRef.current!.getWidth());
        fabricCanvasRef.current!.add(img);
        fabricCanvasRef.current!.sendToBack(img);
        fabricCanvasRef.current!.renderAll();
      };
      htmlImg.src = imageSrc;
    });
  }, [updateCanvasSize]);

  // Handle image selection
  const handleImageSelect = useCallback((imageSrc: string) => {
    setSelectedImage(imageSrc);
    loadImageToCanvas(imageSrc);
  }, [loadImageToCanvas]);

  // Add new text box
  const addTextBox = useCallback(() => {
    if (!fabricCanvasRef.current) return;

    const newTextBox: TextBox = {
      id: `text-${Date.now()}`,
      text: 'Your meme text here',
      x: 100,
      y: 100,
      fontSize: 32,
      fontFamily: 'Impact',
      color: '#ffffff',
      fontWeight: 'bold',
      fontStyle: 'normal',
      strokeColor: '#000000',
      strokeWidth: 2
    };

    const fabricText = new fabric.Textbox(newTextBox.text, {
      left: newTextBox.x,
      top: newTextBox.y,
      fontSize: newTextBox.fontSize,
      fontFamily: newTextBox.fontFamily,
      fill: newTextBox.color,
      fontWeight: newTextBox.fontWeight,
      fontStyle: newTextBox.fontStyle,
      stroke: newTextBox.strokeColor,
      strokeWidth: newTextBox.strokeWidth,
      textAlign: 'center',
      width: 200,
      id: newTextBox.id
    });

    fabricCanvasRef.current.add(fabricText);
    fabricCanvasRef.current.setActiveObject(fabricText);
    fabricCanvasRef.current.renderAll();

    setTextBoxes(prev => [...prev, newTextBox]);
    setSelectedTextBox(newTextBox.id);
  }, []);

  // Update text box
  const updateTextBox = useCallback((id: string, updates: Partial<TextBox>) => {
    if (!fabricCanvasRef.current) return;

    setTextBoxes(prev => prev.map(tb => 
      tb.id === id ? { ...tb, ...updates } : tb
    ));

    const fabricObject = fabricCanvasRef.current.getObjects().find(obj => obj.id === id);
    if (fabricObject && fabricObject.type === 'textbox') {
      fabricObject.set(updates);
      fabricCanvasRef.current.renderAll();
    }
  }, []);

  // Delete text box
  const deleteTextBox = useCallback((id: string) => {
    if (!fabricCanvasRef.current) return;

    const fabricObject = fabricCanvasRef.current.getObjects().find(obj => obj.id === id);
    if (fabricObject) {
      fabricCanvasRef.current.remove(fabricObject);
      fabricCanvasRef.current.renderAll();
    }

    setTextBoxes(prev => prev.filter(tb => tb.id !== id));
    setSelectedTextBox(null);
  }, []);

  // Apply filters to background image
  const applyFilters = useCallback(() => {
    if (!fabricCanvasRef.current) return;

    const backgroundImage = fabricCanvasRef.current.getObjects().find(obj => obj.type === 'image');
    if (backgroundImage) {
      const filterString = `
        brightness(${imageFilters.brightness}%)
        contrast(${imageFilters.contrast}%)
        saturate(${imageFilters.saturation}%)
        blur(${imageFilters.blur}px)
        sepia(${imageFilters.sepia}%)
        grayscale(${imageFilters.grayscale}%)
      `;
      
      (backgroundImage as any).filters = [];
      (backgroundImage as any).applyFilters();
      fabricCanvasRef.current.renderAll();
    }
  }, [imageFilters]);

  // Download meme
  const downloadMeme = useCallback(async () => {
    if (!fabricCanvasRef.current) return;

    setIsLoading(true);
    try {
      const dataURL = fabricCanvasRef.current.toDataURL({
        format: 'png',
        quality: 1,
        multiplier: 2
      });

      const link = document.createElement('a');
      link.download = `meme-${Date.now()}.png`;
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading meme:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Reset canvas
  const resetCanvas = useCallback(() => {
    if (!fabricCanvasRef.current) return;
    
    fabricCanvasRef.current.clear();
    setTextBoxes([]);
    setSelectedTextBox(null);
    setSelectedImage(null);
    setImageFilters({
      brightness: 100,
      contrast: 100,
      saturation: 100,
      blur: 0,
      sepia: 0,
      grayscale: 0
    });
  }, []);

  const selectedTextBoxData = textBoxes.find(tb => tb.id === selectedTextBox);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Meme Generator</h1>
        <p className="text-gray-600">Create hilarious memes with AI-powered text suggestions!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Panel - Tools */}
        <div className="lg:col-span-1 space-y-4">
          {/* Image Upload */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Upload size={18} />
              Upload Image
            </h3>
            <ImageUploader onImageSelect={handleImageSelect} />
          </div>

          {/* Tool Buttons */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Tools</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={addTextBox}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
                disabled={!selectedImage}
              >
                <Plus size={16} />
                Add Text
              </button>
              
              <button
                onClick={() => setActivePanel(activePanel === 'text' ? null : 'text')}
                className={`flex items-center justify-center gap-2 px-3 py-2 rounded-md transition-colors text-sm ${
                  activePanel === 'text' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                disabled={!selectedTextBox}
              >
                <Type size={16} />
                Text
              </button>

              <button
                onClick={() => setActivePanel(activePanel === 'filters' ? null : 'filters')}
                className={`flex items-center justify-center gap-2 px-3 py-2 rounded-md transition-colors text-sm ${
                  activePanel === 'filters' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                disabled={!selectedImage}
              >
                <Sliders size={16} />
                Filters
              </button>

              <button
                onClick={() => setActivePanel(activePanel === 'ai' ? null : 'ai')}
                className={`flex items-center justify-center gap-2 px-3 py-2 rounded-md transition-colors text-sm ${
                  activePanel === 'ai' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                disabled={!selectedImage}
              >
                <Sparkles size={16} />
                AI Text
              </button>
            </div>

            <div className="mt-3 space-y-2">
              <button
                onClick={downloadMeme}
                disabled={!selectedImage || isLoading}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download size={16} />
                {isLoading ? 'Downloading...' : 'Download Meme'}
              </button>

              <button
                onClick={resetCanvas}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                <RotateCcw size={16} />
                Reset
              </button>
            </div>
          </div>

          {/* Active Panel */}
          {activePanel === 'text' && selectedTextBoxData && (
            <TextEditor
              textBox={selectedTextBoxData}
              onUpdate={(updates) => updateTextBox(selectedTextBoxData.id, updates)}
              onDelete={() => deleteTextBox(selectedTextBoxData.id)}
            />
          )}

          {activePanel === 'filters' && (
            <FilterPanel
              filters={imageFilters}
              onUpdate={setImageFilters}
              onApply={applyFilters}
            />
          )}

          {activePanel === 'ai' && (
            <AITextGenerator
              onTextGenerated={(text) => {
                if (selectedTextBox) {
                  updateTextBox(selectedTextBox, { text });
                } else {
                  addTextBox();
                  // Wait for the text box to be created, then update it
                  setTimeout(() => {
                    const latestTextBox = textBoxes[textBoxes.length - 1];
                    if (latestTextBox) {
                      updateTextBox(latestTextBox.id, { text });
                    }
                  }, 100);
                }
              }}
            />
          )}
        </div>

        {/* Main Canvas Area */}
        <div className="lg:col-span-3">
          <div className="bg-gray-100 rounded-lg p-4 min-h-[600px] flex items-center justify-center">
            {selectedImage ? (
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  className="border border-gray-300 rounded-lg shadow-md max-w-full h-auto"
                />
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <Upload size={64} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg">Upload an image to start creating your meme!</p>
                <p className="text-sm mt-2">Supported formats: JPG, PNG, GIF</p>
              </div>
            )}
          </div>

          {/* Text Boxes List */}
          {textBoxes.length > 0 && (
            <div className="mt-4 bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Text Boxes</h3>
              <div className="space-y-2">
                {textBoxes.map((textBox) => (
                  <div
                    key={textBox.id}
                    className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors ${
                      selectedTextBox === textBox.id
                        ? 'bg-blue-100 border border-blue-300'
                        : 'bg-white border border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedTextBox(textBox.id)}
                  >
                    <div className="flex items-center gap-2">
                      <Move size={16} className="text-gray-400" />
                      <span className="text-sm font-medium truncate max-w-[200px]">
                        {textBox.text || 'Empty text'}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTextBox(textBox.id);
                      }}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemeGenerator;