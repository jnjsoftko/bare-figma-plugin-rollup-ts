import { createShapes } from './figmas/shapes';
// TEST_TEXT
// import dotenv from "dotenv";
// dotenv.config('./.env');

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
    console.log('env.ROOT_DIR', process.env.ROOT_DIR);
  }

  figma.closePlugin();
};