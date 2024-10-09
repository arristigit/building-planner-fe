import React, { useState, useRef } from 'react';
import { Stage, Layer, Rect, Circle, Transformer, Text } from 'react-konva';
import Toolbar from './Toolbar';
import axios from 'axios';


const MainKonva = () => {
  const [shapes, setShapes] = useState([]);
  const [tool, setTool] = useState('select');
  const [selectedId, setSelectedId] = useState(null);
  const [annotationsVisible, setAnnotationsVisible] = useState(true);
  const transformerRef = useRef(null);
  const stageRef = useRef(null);
  const apiUrl = import.meta.env.VITE_BASE_URL;

  // Add new shape based on tool selection
  const handleMouseDown = (e) => {
    const stage = stageRef.current.getStage();
    const pointerPosition = stage.getPointerPosition();

    if (tool === 'rectangle') {
      const newRect = {
        id: shapes.length + 1,
        type: 'rectangle',
        x: pointerPosition.x,
        y: pointerPosition.y,
        width: 100,
        height: 100,
        fill: 'transparent',
        stroke: 'black',
      };
      setShapes([...shapes, newRect]);
    }
    else if (tool === 'circle') {
      const newCircle = {
        id: shapes.length + 1,
        type: 'circle',
        x: pointerPosition.x,
        y: pointerPosition.y,
        radius: 50,
        fill: 'transparent',
        stroke: 'black',
      };
      setShapes([...shapes, newCircle]);
    }

    setSelectedId(null); // Deselect when adding a new shape
  };

  const handleSelect = (id) => {
    setSelectedId(id);
  };

  const handleDeselect = () => {
    setSelectedId(null);
  };

  // When a shape is selected, attach the transformer to it
  const applyTransformer = (node) => {
    const stage = stageRef.current.getStage();
    const transformer = transformerRef.current;
    transformer.nodes([node]);
    transformer.getLayer().batchDraw();
  };

  // Render the shapes based on their type
  const renderShapes = () => {
    return shapes.map((shape, index) => {
      if (shape.type === 'rectangle') {
        return (
          <React.Fragment key={shape.id}>
            <Rect
              x={shape.x}
              y={shape.y}
              width={shape.width}
              height={shape.height}
              fill={shape.fill}
              stroke={shape.stroke}
              draggable
              onClick={() => handleSelect(shape.id)}
              onTransformEnd={(e) => {
                // Update shape dimensions on transform
                const node = e.target;
                const updatedShapes = shapes.slice();
                updatedShapes[index] = {
                  ...shape,
                  x: node.x(),
                  y: node.y(),
                  width: node.width() * node.scaleX(),
                  height: node.height() * node.scaleY(),
                };
                setShapes(updatedShapes);
                node.scaleX(1);
                node.scaleY(1);
              }}
              ref={selectedId === shape.id ? applyTransformer : null}
            />
            {annotationsVisible && (
              <Text
                x={shape.x + shape.width + 5}
                y={shape.y}
                text={`W: ${Math.round(shape.width)} H: ${Math.round(shape.height)}`}
                fontSize={14}
                fill="black"
              />
            )}
          </React.Fragment>
        );
      }
      else if (shape.type === 'circle') {
        return (
          <React.Fragment key={shape.id}>
            <Circle
              x={shape.x}
              y={shape.y}
              radius={shape.radius}
              fill={shape.fill}
              stroke={shape.stroke}
              draggable
              onClick={() => handleSelect(shape.id)}
              onTransformEnd={(e) => {
                // Update shape dimensions on transform
                const node = e.target;
                const updatedShapes = shapes.slice();
                updatedShapes[index] = {
                  ...shape,
                  x: node.x(),
                  y: node.y(),
                  radius: node.radius() * node.scaleX(),
                };
                setShapes(updatedShapes);
                node.scaleX(1);
                node.scaleY(1);
              }}
              ref={selectedId === shape.id ? applyTransformer : null}
            />
            {annotationsVisible && (
              <Text
                x={shape.x + shape.radius + 5}
                y={shape.y}
                text={`R: ${Math.round(shape.radius)}`}
                fontSize={14}
                fill="black"
              />
            )}
          </React.Fragment>
        );
      }
      return null;
    });
  };


  // Save drawing to the Django API
  const saveDrawing = async () => {
    const drawingData = {
      title: "My Drawing",
      data: shapes,
    };

    try {
      const response = await axios.post(`${apiUrl}/trackdraw/api/drawings/`, drawingData);
      console.log('Drawing saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving drawing:', error);
    }
  };

  return (
    <div>
      <Toolbar
        onSelectTool={setTool}
        toggleAnnotations={() => setAnnotationsVisible(!annotationsVisible)}
      />
      <Stage
        width={800}
        height={600}
        ref={stageRef}
        onMouseDown={tool !== 'select' ? handleMouseDown : null}
        onClick={handleDeselect}
      >
        <Layer>
          {renderShapes()}
          <Transformer ref={transformerRef} />
        </Layer>
      </Stage>
      <button onClick={saveDrawing}>Save Drawing</button>
    </div>
  );
};

export default MainKonva;
