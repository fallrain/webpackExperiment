module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "airbnb"
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "parser": "babel-eslint",
  "plugins": [
    "react"
  ],
  "rules": {
    "import/no-extraneous-dependencies": [
      "error",
      {"devDependencies": true}
    ],
    "import/no-unresolved": 0,
    "import/no-dynamic-require": 0,
    "react/jsx-one-expression-per-line": 0,
    "jsx-a11y/alt-text": 0,
    "comma-dangle": 0,
    "func-names": 0,
    "semi": [1, "always"]
  }
};
