import pluginVue from 'eslint-plugin-vue'
import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import tseslint from 'typescript-eslint'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'

export default defineConfigWithVueTs([
  ...pluginVue.configs['flat/recommended'],
  js.configs.recommended,
  tseslint.configs.recommended,
  vueTsConfigs.recommended,
  eslintConfigPrettier,
  {
    rules: {
      'no-useless-escape': 'off',
      'vue/no-v-html': 'off'
    }
  },
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module'
    }
  }
])
