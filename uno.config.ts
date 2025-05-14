import {
  presetAttributify,
  presetTagify,
  presetTypography,
  presetWebFonts,
  presetWind3,
} from 'unocss';

import { mergeConfigs } from '@unocss/core';
import config from './.nuxt/uno.config.mjs';

export default mergeConfigs([
  config,
  {
    presets: [
      presetWind3(),
      presetTypography(),
      presetAttributify(),
      presetTagify({
        prefix: 'un-',
      }),
      presetWebFonts({
        provider: 'google',
        fonts: {
          sans: 'Nunito',
          pair: 'Alegreya',
          numeral: 'Michroma',
          mono: ['Fira Code', 'Fira Mono:400,700'],
        },
      }),
    ],
    theme: {
      colors: {
        primary: '#d22f27',
        secondary: '#ea5a47',
        accent: '#b1cc33',
        dark: '#1e1e1e',
        light: '#fdfdfd',
        break: '#e3a008',
        breakLighter: '#f7b722',
        longBreak: '#404040',
        longBreakLighter: '#606060',
      },
    },
    shortcuts: {
      'btn-base': 'font-sans px-4 py-2 rounded-md font-bold transition-all',
      'btn-disabled': 'disabled:opacity-50 disabled:cursor-not-allowed',
      'btn-hover': 'hover:not-disabled:scale-105 hover:not-disabled:shadow-xl',
      'btn-primary': 'text-white bg-dark hover:not-disabled:bg-secondary',
      btn: 'btn-base btn-primary btn-hover btn-disabled',

      // variants
      'btn-outline':
        'btn bg-transparent text-light border border-light hover:not-disabled:bg-transparent',
    },
  },
]);
