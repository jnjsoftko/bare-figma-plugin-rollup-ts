# bare-figma-plugin-rollup-ts

A boilerplate for creating Figma plugins using Svelte.


# Install

```bash
# jnj-dev-tools
bootapp -u jnjsoftko -n bare-figma-plugin-rollup-ts -l node -d "JnJ Figma Plugin Boilerplate" -t svelte-figma-figsvelte
```


# Run Code
```bash
# Method 1. by yarn
> yarn dev

# Method 2. by npm
> npm run dev  # by npm yarn
```


# Run Plugin in Figma App

* Execute Figma(local) App
* Main Menu > `Plugins` > `Development` > `import plugin from manifest...`
* Select `dist/manifest.json`


# Edit Code

## import typescript module

> EX: module to add: `src/utils/module1.ts`

### 1. `src/code.ts`

```ts
import { func1 } from './utils/module1';
```

### 2. `src/PluginUI.svelte`

> `src/PluginUI.svelte`

```svelte
<script>
  import { func1 } from '../dist/utils/module1';
</script>
```

> `/rollup.config.js`

```js
export default [
  {
    input: [  // `.ts` 추가시 경로 추가
      ...
      'src/utils/module1.ts',
    ],
```

## .env 변수 설정

- !! 결과적으로 `code.js`, `index.html`에 변수값이 노출되므로 비공개 데이터에는 적합하지 않음

> .env

```ini
...
ENV_VAR=enviroment_variable
```

### 1. `src/code.ts`

```ts
envVar = process.env.ENV_VAR  // 좌측(변)에 사용한 것은 변경되지 않음
```

> `/rollup.config.js`

```js
  {
    input: 'src/code.ts',
    ...
    plugins: [
      replace({
        values: { // * 코드 문자열 강제 변경:
          "process.env.ENV_VAR": `"${process.env.ENV_VAR}"`  // 추가
        },
        preventAssignment: true,
      }),
    ]
  }

```

### 2. `src/PluginUI.svelte`

> `src/PluginUI.svelte`

```svelte
<script>
  ...
  envVar = process.env.ENV_VAR  // 좌측(변)에 사용한 것은 변경되지 않음
  ...
</script>
```

> `/rollup.config.js`

```js
...
  svelte({
    // ...
    # preprocess: sveltePreprocess({
    preprocess: preprocess({
      replace: [
        ...
        ["process.env.ENV_VAR", `"${process.env.ENV_VAR}"`],  // 추가
      ],
    }),
  }),

```


## import `.json`

> path: `/json/env/servers.json`
> code file: code.ts, *.svelte

```js
  import servers from "../json/env/servers.json";  // * `.json`
```