import React, { useState, useEffect, useCallback, KeyboardEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { Share2, Printer, Lock, Unlock, ArrowUpDown } from 'lucide-react';

interface ScriptLine {
  id: string;
  type: 'scene' | 'action' | 'character' | 'dialogue' | 'parenthetical' | 'transition';
  content: string;
}

interface User {
  id: string;
  name: string;
  color: string;
}

interface ScreenwritingProps {
  isReadOnly?: boolean;
  collaborators?: User[];
}

export const Screenwriting: React.FC<ScreenwritingProps> = ({ 
  isReadOnly = false, 
  collaborators = [] 
}) => {
  const [lines, setLines] = useState<ScriptLine[]>([{
    id: nanoid(),
    type: 'scene',
    content: ''
  }]);
  const [selectedLine, setSelectedLine] = useState<number>(0);
  const [isEditing, setIsEditing] = useState(false);
  const [shareableUrl, setShareableUrl] = useState('');
  const navigate = useNavigate();
  const { scriptId } = useParams();

  // Line type cycling order
  const lineTypes: ScriptLine['type'][] = [
    'scene',
    'action',
    'character',
    'parenthetical',
    'dialogue',
    'transition'
  ];

  // Format classes for different line types
  const lineTypeClasses = {
    scene: 'font-bold uppercase tracking-wider',
    action: 'pl-16',
    character: 'pl-32 uppercase',
    dialogue: 'pl-24 pr-24',
    parenthetical: 'pl-28 italic',
    transition: 'pl-48 uppercase'
  };

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>, lineIndex: number) => {
    if (isReadOnly) return;

    // Enter on empty line cycles through types
    if (e.key === 'Enter' && !e.shiftKey && lines[lineIndex].content === '') {
      e.preventDefault();
      const currentTypeIndex = lineTypes.indexOf(lines[lineIndex].type);
      const nextType = lineTypes[(currentTypeIndex + 1) % lineTypes.length];
      
      const updatedLines = [...lines];
      updatedLines[lineIndex].type = nextType;
      setLines(updatedLines);
    }

    // Tab and Shift+Tab to change line type
    if (e.key === 'Tab') {
      e.preventDefault();
      const currentTypeIndex = lineTypes.indexOf(lines[lineIndex].type);
      const nextType = e.shiftKey
        ? lineTypes[(currentTypeIndex - 1 + lineTypes.length) % lineTypes.length]
        : lineTypes[(currentTypeIndex + 1) % lineTypes.length];
      
      const updatedLines = [...lines];
      updatedLines[lineIndex].type = nextType;
      setLines(updatedLines);
    }

    // Cmd/Ctrl + Up/Down to move lines
    if ((e.metaKey || e.ctrlKey) && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
      e.preventDefault();
      const newIndex = e.key === 'ArrowUp' 
        ? Math.max(0, lineIndex - 1)
        : Math.min(lines.length - 1, lineIndex + 1);
      
      if (newIndex !== lineIndex) {
        const updatedLines = [...lines];
        [updatedLines[lineIndex], updatedLines[newIndex]] = 
        [updatedLines[newIndex], updatedLines[lineIndex]];
        setLines(updatedLines);
        setSelectedLine(newIndex);
      }
    }

    // Enter to create new line
    if (e.key === 'Enter' && !e.shiftKey && lines[lineIndex].content !== '') {
      e.preventDefault();
      const newLines = [...lines];
      newLines.splice(lineIndex + 1, 0, {
        id: nanoid(),
        type: lines[lineIndex].type,
        content: ''
      });
      setLines(newLines);
      setSelectedLine(lineIndex + 1);
    }
  }, [lines, isReadOnly, lineTypes]);

  // Generate shareable URL
  const generateShareableUrl = useCallback(() => {
    const newScriptId = scriptId || nanoid();
    const url = `${window.location.origin}/screenwriting/${newScriptId}`;
    setShareableUrl(url);
    navigator.clipboard.writeText(url);
    if (!scriptId) {
      navigate(`/screenwriting/${newScriptId}`);
    }
  }, [scriptId, navigate]);

  // Print script
  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  // Toggle read-only mode
  const toggleReadOnly = useCallback(() => {
    setIsEditing(!isEditing);
  }, [isEditing]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Toolbar */}
      <div className="mb-6 p-4 border rounded-md flex items-center justify-between">
        <div className="flex gap-4">
          <button
            onClick={generateShareableUrl}
            className="px-4 py-2 border rounded-md flex items-center gap-2"
          >
            <Share2 size={16} />
            Share
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 border rounded-md flex items-center gap-2"
          >
            <Printer size={16} />
            Print
          </button>
          <button
            onClick={toggleReadOnly}
            className="px-4 py-2 border rounded-md flex items-center gap-2"
          >
            {isEditing ? <Lock size={16} /> : <Unlock size={16} />}
            {isEditing ? 'Lock' : 'Edit'}
          </button>
        </div>
        
        {/* Collaborators */}
        <div className="flex gap-2">
          {collaborators.map(user => (
            <div
              key={user.id}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white"
              style={{ backgroundColor: user.color }}
            >
              {user.name[0]}
            </div>
          ))}
        </div>
      </div>

      {/* Script Editor */}
      <div className="bg-white rounded-lg p-8 font-mono leading-relaxed">
        {lines.map((line, index) => (
          <div
            key={line.id}
            className={`relative py-1 ${lineTypeClasses[line.type]} 
              ${selectedLine === index ? 'bg-blue-50' : ''}`}
          >
            <div className="absolute left-2 text-gray-400">
              {line.type === 'scene' && <ArrowUpDown size={12} />}
            </div>
            <div
              contentEditable={!isReadOnly}
              suppressContentEditableWarning
              onKeyDown={(e) => handleKeyDown(e, index)}
              onClick={() => setSelectedLine(index)}
              className="outline-none"
              onInput={(e) => {
                const updatedLines = [...lines];
                updatedLines[index].content = e.currentTarget.textContent || '';
                setLines(updatedLines);
              }}
            >
              {line.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Screenwriting;
