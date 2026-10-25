const test = require('node:test');
const assert = require('node:assert');

// Mock browser globals expected by features.js
global.SOURCES = {
  WIKI: "https://en.wikipedia.org/wiki/Doomsday_Clock",
  BRITANNICA: "https://www.britannica.com/topic/Doomsday-Clock",
  ALJAZEERA_2026: "https://www.aljazeera.com"
};
global.document = {
  addEventListener: () => {}
};

// Now require the module under test
const { projectLatLon } = require('./features.js');

test('projectLatLon mapping tests', async (t) => {
  await t.test('center of the map (Equator / Prime Meridian)', () => {
    const result = projectLatLon(0, 0);
    assert.strictEqual(result.x, 500);
    assert.strictEqual(result.y, 250);
  });

  await t.test('top-left corner (North Pole / Anti-Meridian)', () => {
    const result = projectLatLon(90, -180);
    assert.strictEqual(result.x, 0);
    assert.strictEqual(result.y, 0);
  });

  await t.test('bottom-right corner (South Pole / Anti-Meridian)', () => {
    const result = projectLatLon(-90, 180);
    assert.strictEqual(result.x, 1000);
    assert.strictEqual(result.y, 500);
  });

  await t.test('top-right corner (North Pole / Anti-Meridian positive)', () => {
    const result = projectLatLon(90, 180);
    assert.strictEqual(result.x, 1000);
    assert.strictEqual(result.y, 0);
  });

  await t.test('bottom-left corner (South Pole / Anti-Meridian negative)', () => {
    const result = projectLatLon(-90, -180);
    assert.strictEqual(result.x, 0);
    assert.strictEqual(result.y, 500);
  });

  await t.test('arbitrary city points interpolation', () => {
    // New York: ~ 40.71N, 74.01W (-74.01)
    // x = ((-74.01 + 180) / 360) * 1000 = (105.99 / 360) * 1000 = 294.4166...
    // y = ((90 - 40.71) / 180) * 500 = (49.29 / 180) * 500 = 136.9166...
    const ny = projectLatLon(40.71, -74.01);
    assert.ok(Math.abs(ny.x - 294.4166) < 0.01);
    assert.ok(Math.abs(ny.y - 136.9166) < 0.01);

    // Tokyo: ~ 35.68N, 139.65E
    // x = ((139.65 + 180) / 360) * 1000 = (319.65 / 360) * 1000 = 887.9166...
    // y = ((90 - 35.68) / 180) * 500 = (54.32 / 180) * 500 = 150.888...
    const tokyo = projectLatLon(35.68, 139.65);
    assert.ok(Math.abs(tokyo.x - 887.9166) < 0.01);
    assert.ok(Math.abs(tokyo.y - 150.8888) < 0.01);
  });
});
