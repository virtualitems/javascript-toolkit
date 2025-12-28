// use: node --import ./http-loader.mjs script-example.mjs

import { register } from 'node:module';

register(import.meta.url);

function isHttpUrl(url) {
  return url.startsWith('http://') || url.startsWith('https://');
}

function getFormat(url) {
  if (url.endsWith('.mjs')) return 'module';
  if (url.endsWith('.cjs')) return 'commonjs';
  if (url.endsWith('.wasm')) return 'wasm';
  if (url.endsWith('.json')) return 'json';
  return 'module';
}

export function resolve(specifier, context, nextResolve) {
  const { parentURL = null } = context;

  if (isHttpUrl(specifier)) {
    // Intercepta especificadores que comienzan con 'http://' o 'https://'
    return { url: specifier, shortCircuit: true };
  }

  if (parentURL && isHttpUrl(parentURL)) {
    // Si el padre es una URL HTTP, resuelve rutas relativas
    if (specifier.startsWith('./') || specifier.startsWith('../')) {
      return {
        url: new URL(specifier, parentURL).href,
        shortCircuit: true,
      };
    }

    // Para especificadores absolutos (ej: paquetes npm), delega sin parentURL
    const adjustedContext = { ...context };
    delete adjustedContext.parentURL;
    return nextResolve(specifier, adjustedContext);
  }

  return nextResolve(specifier, context);
}

export async function load(url, context, nextLoad) {
  if (isHttpUrl(url)) {
    const response = await fetch(url);

    if (response.ok === false) {
      throw new Error(`${url}: ${response.statusText}`);
    }

    const source = await response.text();
    const format = getFormat(url);

    return { format, source, shortCircuit: true };
  }

  return nextLoad(url, context);
}
