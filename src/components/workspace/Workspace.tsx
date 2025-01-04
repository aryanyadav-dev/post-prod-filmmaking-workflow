import React, { useState } from 'react';
import { FiTool, FiFileText, FiHexagon, FiLink } from 'react-icons/fi';

interface CanvasItem {
  id: string;
  type: 'note' | 'shape';
  content: string;
  x: number;
  y: number;
}

export const Workspace: React.FC = () => {
  const [items, setItems] = useState<CanvasItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [draggingItem, setDraggingItem] = useState<string | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const addItem = (type: 'note' | 'shape') => {
    const newItem: CanvasItem = {
      id: `${Date.now()}`,
      type,
      content: type === 'note' ? 'New Note' : 'New Shape',
      x: 200,
      y: 100,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    const item = items.find((item) => item.id === id);
    if (item) {
      setDraggingItem(id);
      setOffset({ x: e.clientX - item.x, y: e.clientY - item.y });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (draggingItem) {
      const x = e.clientX - offset.x;
      const y = e.clientY - offset.y;

      setItems((prev) =>
        prev.map((item) =>
          item.id === draggingItem ? { ...item, x, y } : item
        )
      );
    }
  };

  const handleMouseUp = () => {
    setDraggingItem(null);
  };

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingItem, offset]);

  const handleContentChange = (id: string, content: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, content } : item
      )
    );
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-60 bg-gray-800 p-4 flex flex-col gap-4">
        <h1 className="text-lg font-bold text-center flex items-center gap-2">
          <FiTool /> Tools
        </h1>
        <button
          onClick={() => addItem('note')}
          className="w-full px-4 py-2 flex items-center gap-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <FiFileText />
          Add Note
        </button>
        <button
          onClick={() => addItem('shape')}
          className="w-full px-4 py-2 flex items-center gap-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          <FiHexagon />
          Add Shape
        </button>
        <button
          className="w-full px-4 py-2 flex items-center gap-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          <FiLink />
          Connector
        </button>
      </div>

      {/* Canvas */}
      <div
        className="flex-1 relative bg-gray-900 bg-dotted-pattern bg-dotted-size"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.8)', // To make background visible if Tailwind is not applied correctly
        }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className={`absolute p-4 rounded shadow-lg ${
              item.type === 'note' ? 'bg-yellow-300' : 'bg-green-300'
            } cursor-move`}
            style={{
              top: item.y,
              left: item.x,
              zIndex: selectedItem === item.id ? 10 : 1,
              width: '250px',
              height: '150px',
            }}
            onMouseDown={(e) => handleMouseDown(e, item.id)}
            onClick={() => setSelectedItem(item.id)}
          >
            {/* Delete Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteItem(item.id);
              }}
              className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
              style={{ transform: 'translate(50%, -50%)' }}
            >
              X
            </button>

            {item.type === 'note' ? (
              <textarea
                className="w-full bg-transparent border-none resize-none focus:outline-none"
                value={item.content}
                onChange={(e) => handleContentChange(item.id, e.target.value)}
                style={{
                  width: '100%',
                  height: '100%',
                  padding: '0',
                  overflow: 'hidden',
                }}
              />
            ) : (
              <div>{item.content}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workspace;
