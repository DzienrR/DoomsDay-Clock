const fs = require('fs');
const vm = require('vm');
const test = require('node:test');
const assert = require('node:assert');

// Helper to load app.js into a VM context
function getContext() {
  const ctx = {
    window: {},
    document: {
      addEventListener: () => {},
      getElementById: () => null,
      querySelectorAll: () => []
    },
    localStorage: {
      getItem: () => null,
      setItem: () => {}
    },
    Math: Math,
    String: String,
    console: {
      log: () => {},
      error: () => {},
      warn: () => {}
    },
    setInterval: () => {},
    setTimeout: () => {}
  };
  vm.createContext(ctx);
  const code = fs.readFileSync('app.js', 'utf8');
  vm.runInContext(code, ctx);
  return ctx;
}

test('format24HourTime converts seconds to midnight into 24-hour time', () => {
  const { format24HourTime } = getContext();
  assert.strictEqual(format24HourTime(85), '23:58:35');
  assert.strictEqual(format24HourTime(90), '23:58:30');
  assert.strictEqual(format24HourTime(100), '23:58:20');
  assert.strictEqual(format24HourTime(600), '23:50:00');
  assert.strictEqual(format24HourTime(1020), '23:43:00'); // 17 mins
  assert.strictEqual(format24HourTime(3600), '23:00:00');
});

test('format24HourTime handles edge cases', () => {
  const { format24HourTime } = getContext();
  // If we give more than 3600 seconds, it floors at 0 seconds after 11PM (23:00:00)
  assert.strictEqual(format24HourTime(3601), '23:00:00');

  // Exactly 0 seconds should be 00:00:00 (Midnight)
  assert.strictEqual(format24HourTime(0), '00:00:00');
});
