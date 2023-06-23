/**
 * Create Shapes
 * @remarks
 *   Create Shapes 
 * @param shape - 'rectangle' / 'triangle' / 'circle'
 * @param count - 개수
 */
export const createShapes = ({shape, count}) => {
// export const createShapes = (figma, shape, count) => {
  const nodes: SceneNode[] = [];
  for (let i = 0; i < count; i++) {
    let shapeObj
    if (shape === 'rectangle') {
      shapeObj = figma.createRectangle();
    } else if (shape === 'triangle') {
      shapeObj = figma.createPolygon();
    } else {
      shapeObj = figma.createEllipse();
    }

    shapeObj.x = i * 150;
    shapeObj.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
    figma.currentPage.appendChild(shapeObj);
    nodes.push(shapeObj);
  }
  
  figma.currentPage.selection = nodes;
  figma.viewport.scrollAndZoomIntoView(nodes);
}
