If netlify error 404  
  
  "scripts": {
    "start": "cross-env NODE_ENV=development webpack serve --config config/webpack.dev.js",
    "build": "cross-env NODE_ENV=production webpack --config config/webpack.prod.js",
    "lint": "eslint ./src/** --no-error-on-unmatched-pattern",
    "lint:fix": "eslint --fix ./src/** --no-error-on-unmatched-pattern",
    "clean": "rm -rf dist",
    "clean:all": "rm -rf dist node_modules yarn.lock package-lock.json"
  },