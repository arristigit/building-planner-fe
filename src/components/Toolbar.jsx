import React from 'react';
import { FaSquare, FaCircle, FaMousePointer, FaEye } from 'react-icons/fa';

const Toolbar = ({ onSelectTool, toggleAnnotations }) => {
  return (
    <div className="toolbar">
      <button onClick={() => onSelectTool('select')}>
        <FaMousePointer /> Select
      </button>
      <button onClick={() => onSelectTool('rectangle')}>
        <FaSquare /> Rectangle
      </button>
      <button onClick={() => onSelectTool('circle')}>
        <FaCircle /> Circle
      </button>
      <button onClick={toggleAnnotations}>
        <FaEye /> Toggle Annotations
      </button>
    </div>
  );
};

export default Toolbar;
