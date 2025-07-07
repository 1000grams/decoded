// eslint.config.js
import js from '@eslint/js';
import react from 'eslint-plugin-react';
import babelParser from '@babel/eslint-parser';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        sourceType: 'module',
        ecmaVersion: 2022,
        babelOptions: {
          presets: ['@babel/preset-react']
        }
      },
      globals: {
        ...globals.es2021,
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {
      react
    },
    rules: {
      // Optional overrides
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'no-unused-vars': 'off'
    }
  }
  ,
  {
    files: ['**/*.test.js', '**/*.test.jsx'],
    languageOptions: {
      globals: {
        ...globals.jest
      }
    }
  }
];
