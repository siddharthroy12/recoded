import 'prismjs/components/prism-core';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-dart';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-lua';
import 'prismjs/components/prism-julia';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-markup-templating';
require('prismjs/components/prism-java');
require('prismjs/components/prism-jsx');
require('prismjs/components/prism-tsx');
require('prismjs/components/prism-php');

export const LANGUAGE = {
  'C': 'c',
  'C++': 'cpp',
  'Java': 'java',
  'Bash': 'bash',
  'Plain Text': 'plaintext',
  'Python': 'python',
  'C#': 'csharp',
  'Dart': 'dart',
  'Rust': 'rust',
  'JSON': 'json',
  'HTML': 'html',
  'CSS': 'css',
  'JavaScript': 'javascript',
  'JSX': 'jsx',
  'Lua': 'lua',
  'PHP': 'php',
  'Julia': 'julia',
  'TypeScript': 'typescript',
  'TSX': 'tsx',
};

export const EXTENTION = {
  c: 'c',
  cpp: 'cpp',
  java: 'java',
  bash: 'sh',
  plaintext: '',
  python: 'py',
  csharp: 'cs',
  dart: 'dart',
  rust: 'rs',
  json: 'json',
  html: 'html',
  css: 'css',
  javascript: 'js',
  jsx: 'jsx',
  lua: 'lua',
  php: 'php',
  julia: 'jl',
  typescript: 'ts',
  tsx: 'tsx'
}

export default LANGUAGE;
