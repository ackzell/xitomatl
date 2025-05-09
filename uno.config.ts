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
      },
    },
  },
]);
