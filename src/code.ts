import { createShapes } from './figmas/shapes';

import servers from "../json/env/servers.json";

figma.showUI(__html__, {themeColors: true, width: 320, height: 424});

/**
 * Figma UI OnMessage
 * @remarks
 * 
 * @param msg - From PluginUI.svelte
 */
figma.ui.onmessage = msg => {
  if (msg.command === 'create-shapes') {
    createShapes(msg.options);
    console.log('env.ROOT_DIR', process.env.ROOT_DIR);  // .env 변수 테스트
    console.log('servers in code.ts', servers);   // import .json 테스트
  }

  figma.closePlugin();
};