require('@testing-library/jest-dom');
document.body.innerHTML = `
  <div id="fa-icons">
    <i class="fa-solid fa-magnifying-glass" data-testid="search-icon"></i>
  </div>
`;
const { TextEncoder, TextDecoder } = require('util');

Object.assign(globalThis, { TextEncoder, TextDecoder });