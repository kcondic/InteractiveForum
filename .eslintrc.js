module.exports = {
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended'
  ],
  rules: {
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-undef': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unreachable': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  }
}