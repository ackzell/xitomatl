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
          mono: ['Fira Code', 'Fira Mono:400,700'],
        },
      }),
    ],
  },
]);
