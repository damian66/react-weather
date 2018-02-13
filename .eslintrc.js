module.exports = {
  "extends": "airbnb",
  "rules": {
    "quotes": ["error", "single", {
      "avoidEscape": true      
    }],
    "no-console": 0,
    "max-len": 1,
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true, "optionalDependencies": false, "peerDependencies": false}],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/jsx-no-bind": {      
      "allowBind": false,
    },
    "react/no-unescaped-entities": false,
    "react/forbid-prop-types": false,
    "react/prop-types": false,
    "react/prefer-stateless-function": false,
    "jsx-a11y/no-static-element-interactions": [
      'error',
      {
        handlers: [    
        ],
      },
    ],
    "jsx-a11y/click-events-have-key-events": false,
    "jsx-a11y/no-noninteractive-element-interactions": false,
  },
  globals: {  
    fetch: false,    
    window: false,
    document: false,
  },
};