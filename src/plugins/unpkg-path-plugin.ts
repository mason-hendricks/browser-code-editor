import * as esbuild from 'esbuild-wasm';

// custom ESBuild plugin for unpackaging packages
// that were previously grabbed.

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      // filter package names for bundling
      // regex to check for index.js of each packages to be bundled
      // also using regex to check for / or // in paths


      // this handles root entry file of index.js
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        return { path: 'index.js', namespace: 'a' }
      })

      // this handles relative paths in a module
      build.onResolve({ filter: /^\.+\// }, (args: any) => {
        return {
          namespace: 'a',
          path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href
        };
      })

      // this handles main files in a module
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`,
        }
      });
    },
  };
};