import localforage from 'localforage';
import * as esbuild from 'esbuild-wasm';
import axios from 'axios';

// create an instance of browser cache storage to store packages
const fileCache = localforage.createInstance({
  name: 'filecache',
});

// custom ESBuild plugin for grabbing packages
// support for js and css.
// also checks for already cached files.
export const fetchPlugin = (input: string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {
      // load function to handle loading index.js of package
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: 'jsx',
          contents: input,
        };
      });

      // seperate onLoad that checks for files that are
      // already cached in the browser.
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        // check to see if we have already fetched this file
        // and see if it is in the cache
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );

        // if it is, return it immediately
        if (cachedResult) {
          return cachedResult;
        }
      });

      // load function to handle css files
      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);

        const escapedCssString = data
          .replace(/\n/g, '')
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");

        const contents = `
          const style = document.createElement('style');
          style.innerText = '${escapedCssString}';
          document.head.appendChild(style)
        `;

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents,
          resolveDir: new URL('./', request.responseURL).pathname,
        };

        // store response in cache
        await fileCache.setItem(args.path, result);
        return result;
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        // load function for javascript files
        const { data, request } = await axios.get(args.path);

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        };

        // store response in cache
        await fileCache.setItem(args.path, result);
        return result;
      });
    },
  };
};
