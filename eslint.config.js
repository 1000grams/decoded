// eslint.config.js
import js from '@eslint/js';
import react from 'eslint-plugin-react';
import babelParser from '@babel/eslint-parser';

export default [
  // In the new flat config, each object is one config "layer"
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ['@babel/preset-react']
        }
      }
    },
    env: {
      // Enable browser + Node globals
      browser: true,
      node: true,
      es2022: true
    },
    plugins: {
      react
    },
    rules: {
      // Optional overrides
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off'
    }
  }
];
