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
const { projectLatLon, computeGreatCircleDistance } = require('./features.js');

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
    const ny = projectLatLon(40.71, -74.01);
    assert.ok(Math.abs(ny.x - 294.4166) < 0.01);
    assert.ok(Math.abs(ny.y - 136.9166) < 0.01);

    const tokyo = projectLatLon(35.68, 139.65);
    assert.ok(Math.abs(tokyo.x - 887.9166) < 0.01);
    assert.ok(Math.abs(tokyo.y - 150.8888) < 0.01);
  });
});

test('computeGreatCircleDistance tests', async (t) => {
  await t.test('identical coordinates return 0', () => {
    assert.strictEqual(computeGreatCircleDistance(0, 0, 0, 0), 0);
    assert.strictEqual(computeGreatCircleDistance(45, 45, 45, 45), 0);
  });

  await t.test('distance between poles (North to South)', () => {
    const dist = computeGreatCircleDistance(90, 0, -90, 0);
    const expected = Math.PI * 6371; // Half circumference
    assert.ok(Math.abs(dist - expected) < 1);
  });

  await t.test('distance along the equator for a quarter of the globe (90 degrees)', () => {
    const dist = computeGreatCircleDistance(0, 0, 0, 90);
    const expected = (Math.PI * 6371) / 2;
    assert.ok(Math.abs(dist - expected) < 1);
  });

  await t.test('realistic city pairs calculation', () => {
    // New York: 40.7128° N, 74.0060° W to London: 51.5074° N, 0.1278° W (~5570 km)
    const distNYtoLondon = computeGreatCircleDistance(40.7128, -74.0060, 51.5074, -0.1278);
    assert.ok(Math.abs(distNYtoLondon - 5570) < 10);

    // Tokyo: 35.6762° N, 139.6503° E to Sydney: 33.8688° S, 151.2093° E (~7820 km)
    const distTokyoToSydney = computeGreatCircleDistance(35.6762, 139.6503, -33.8688, 151.2093);
    assert.ok(Math.abs(distTokyoToSydney - 7820) < 20);
  });

  await t.test('anti-podal points (opposite sides of the earth)', () => {
    const dist = computeGreatCircleDistance(0, 0, 0, 180);
    const expected = Math.PI * 6371;
    assert.ok(Math.abs(dist - expected) < 1);
  });

  await t.test('parameter order symmetry', () => {
    const dist1 = computeGreatCircleDistance(40.7, -74.0, 51.5, -0.1);
    const dist2 = computeGreatCircleDistance(51.5, -0.1, 40.7, -74.0);
    assert.strictEqual(dist1, dist2);
  });
});
