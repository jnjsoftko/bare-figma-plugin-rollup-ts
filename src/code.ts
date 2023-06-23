import { createShapes } from './figmas/shapes';

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
	}

	figma.closePlugin();
};