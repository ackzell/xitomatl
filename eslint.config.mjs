import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin'; // Import the plugin
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt([
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: {
          'ts': '@typescript-eslint/parser',
          '<template>': 'espree',
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin, // Use the imported plugin
    },
    rules: {
      'no-unused-vars': 'off', // Disable the base rule
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      // 'vue/max-attributes-per-line': [
      //   'warn',
      //   {
      //     singleline: 3,
      //     multiline: 2,
      //   },
      // ],
    },
  },
]);
