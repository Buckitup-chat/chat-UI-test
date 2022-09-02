const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    "env": {
      "url": "http://localhost:4000"
    },
    "pageLoadTimeout": 10000
  },
});
