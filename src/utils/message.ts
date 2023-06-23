/**
 * Send message({exec, options}) To Figma UI[`code.ts`(dist/code.js)]
 * @remarks
 *   postMessage 
 * @param command - command(name) to exec in Figma UI[`code.ts`(dist/code.js)]
 * @param options - options for command
 */
export const sendToUI = (command, options={}) => {
  parent.postMessage(
    {
      pluginMessage: {
        command,
        options
      }
    },
    "*"
  );
}