import localforage from 'localforage';
import * as esbuild from 'esbuild-wasm';
import axios from 'axios';

// create an instance of browser cache storage to store packages
const fileCache = localforage.createInstance({
  name: 'filecache'
});

export const fetchPlugin = (input: string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: input,
          };
        }

        // check to see if we have already fetched this file
        // and see if it is in the cache
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);

        // if it is, return it immediately
        if (cachedResult) {
          return cachedResult
        }

        const { data, request, } = await axios.get(args.path)

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname
        }

        // store response in cache
        await fileCache.setItem(args.path, result)

        return result;
      });
    }
  }
}