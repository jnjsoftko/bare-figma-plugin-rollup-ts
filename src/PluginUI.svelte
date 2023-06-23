<script>
  import { sendToUI } from '../dist/utils/message.js';  // `.js`
  import Header from './components/Header.svelte';  //  `.svelte`
  import servers from "../json/env/servers.json";  // * `.json`

  // Global CSS from the svelte boilerplate, contains Figma color vars, spacing vars, utility classes and more
  import { GlobalCSS } from 'figma-plugin-ds-svelte';

  // Svelte Figma UI components
  import { Button, Input, Label, SelectMenu } from 'figma-plugin-ds-svelte';

  //menu items, this is an array of objects to populate to our select menus
  let menuItems = [
    { 'value': 'rectangle', 'label': 'Rectangle', 'group': null, 'selected': false },
    { 'value': 'triangle', 'label': 'Triangle ', 'group': null, 'selected': false },
    { 'value': 'circle', 'label': 'Circle', 'group': null, 'selected': false }
  ];

  var disabled = true;
  var selectedShape;
  var count = 5;

  //this is a reactive variable that will return false when a value is selected from
  //the select menu, its value is bound to the primary buttons disabled prop
  $: disabled = selectedShape === null;

  function createShapes() {
    sendToUI('create-shapes', {count, shape: selectedShape.value});
  }

  function cancel() {
    console.log("ROOT_DIR", process.env.ROOT_DIR);  // .env 변수 테스트
    console.log('servers in PluginUI.svelte', servers);   // import .json 테스트
    parent.postMessage({ pluginMessage: { 'type': 'cancel' } }, '*')
  }

</script>


<div class="wrapper p-xxsmall">
  <Header />
  <SelectMenu bind:menuItems={menuItems} bind:value={selectedShape} class="mb-xxsmall"/>
  
  <Label>Count</Label>
  <Input iconText="#" bind:value={count} class="mb-xxsmall"/>

  <div class="flex p-xxsmall mb-xsmall">
  <Button on:click={cancel} variant="secondary" class="mr-xsmall">Cancel</Button>
  <Button on:click={createShapes} bind:disabled={disabled}>Create shapes</Button>
  </div>
</div>
