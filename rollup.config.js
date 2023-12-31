import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import svg from 'rollup-plugin-svg';
import typescript from 'rollup-plugin-typescript';

/* json */
import json from "@rollup/plugin-json";

/* Post CSS */
import postcss from 'rollup-plugin-postcss';
import cssnano from 'cssnano';

/* Inline to single html */
import htmlBundle from 'rollup-plugin-html-bundle';

/* dotenv */
import preprocess from 'svelte-preprocess';
import replace from "@rollup/plugin-replace";
import { config } from "dotenv";
config('.env');

/* uglify */
import { uglify } from "rollup-plugin-uglify";

/* local settings */
import * as fs from 'fs';

// ** Utils
const findFileNamesInFolder = (folder) => {
  return fs.readdirSync(`${process.env.ROOT_DIR}/${folder}`).filter((name)=> name.endsWith('.ts')).map((name) => `${folder}/${name}`);
}

const production = !process.env.ROLLUP_WATCH;

export default [
  {
    input: findFileNamesInFolder('src/utils'),  // `src/utils` 내의 `.ts` 파일 전부 포함
    output: {
      dir: 'dist/utils',
      format: 'cjs',
    },
    plugins: [
      typescript(),
      commonjs(),
      production && terser(),
    ],
  },
  {
    input: 'src/main.js',
    output: {
      format: 'iife',
      name: 'ui',
      file: 'dist/bundle.js'
    },
    plugins: [
      svelte({
        // enable run-time checks when not in production
        dev: !production,
        preprocess: preprocess({
          replace: [["process.env.ROOT_DIR", `"${process.env.ROOT_DIR}"`]],
        }),
      }),
      resolve({
        browser: true,
        dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/'),
        extensions: ['.svelte', '.mjs', '.js', '.json', '.node']
      }),
      commonjs(),
      json(), // * import json
      uglify(),  // * uglify code
      svg(),
      postcss({
        extensions: ['.css'],
        plugins: [cssnano()]
      }),
      htmlBundle({
        template: 'src/template.html',
        target: 'dist/index.html',
        inline: true
      }),

      // In dev mode, call `npm run start` once the bundle has been generated
      !production && serve(),

      // Watch the `dist` directory and refresh the browser on changes when not in production
      !production && livereload('dist'),

      // If we're building for production (npm run build instead of npm run dev), minify
      production && terser()
    ],
    watch: {
      clearScreen: false
    }
  },
  {
    input: 'src/code.ts',
    output: {
      file: 'dist/code.js',
      format: 'cjs',
      name: 'code'
    },
    plugins: [
      replace({
        values: { // * 코드 문자열 강제 변경:
          "process.env.ROOT_DIR": `"${process.env.ROOT_DIR}"`
        },
        preventAssignment: true,
      }),
      typescript(),
      commonjs(),
      json(), // * import json
      uglify(),  // * uglify code
      production && terser(),
    ]
  },
];

function serve() {
  let started = false;

  return {
    writeBundle() {
      if (!started) {
        started = true;
        require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
          stdio: ['ignore', 'inherit', 'inherit'],
          shell: true
        });
      }
    }
  };
}
