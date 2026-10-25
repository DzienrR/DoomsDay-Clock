// Set up global mocks for browser environment variables needed by features.js
global.SOURCES = {
  BRITANNICA: 'url',
  ALJAZEERA_2026: 'url',
  WIKI: 'url'
};

global.TIMELINE_DATA = [
  { year: 1947, seconds: 420 },
  { year: 2026, seconds: 85 }
];

global.currentYearIndex = 1;

// Now require the file directly
const features = require('./features.js');
const { computeGreatCircleDistance } = features;

describe('computeGreatCircleDistance', () => {
  it('should return 0 for the exact same coordinates', () => {
    expect(computeGreatCircleDistance(0, 0, 0, 0)).toBe(0);
    expect(computeGreatCircleDistance(45, -90, 45, -90)).toBe(0);
    expect(computeGreatCircleDistance(-30, 120, -30, 120)).toBe(0);
  });

  it('should correctly calculate the distance between the poles', () => {
    const dist = computeGreatCircleDistance(90, 0, -90, 0);
    // Half the Earth's circumference (pi * r)
    const expected = Math.PI * 6371;
    expect(Math.abs(dist - expected)).toBeLessThan(1);
  });

  it('should correctly calculate the distance along the equator (90 degrees longitude apart)', () => {
    const dist = computeGreatCircleDistance(0, 0, 0, 90);
    // Quarter of the Earth's circumference ((pi * r) / 2)
    const expected = (Math.PI * 6371) / 2;
    expect(Math.abs(dist - expected)).toBeLessThan(1);
  });

  it('should correctly calculate distance for realistic city pairs', () => {
    // New York: 40.7128° N, 74.0060° W
    // London: 51.5074° N, 0.1278° W
    const distNYtoLondon = computeGreatCircleDistance(40.7128, -74.0060, 51.5074, -0.1278);
    // Known distance is approx 5570 km
    expect(Math.abs(distNYtoLondon - 5570)).toBeLessThan(10);

    // Tokyo: 35.6762° N, 139.6503° E
    // Sydney: 33.8688° S, 151.2093° E
    const distTokyoToSydney = computeGreatCircleDistance(35.6762, 139.6503, -33.8688, 151.2093);
    // Known distance is approx 7820 km
    expect(Math.abs(distTokyoToSydney - 7820)).toBeLessThan(20);
  });

  it('should handle anti-podal points (opposite sides of the earth)', () => {
    // 0,0 and 0,180
    const dist = computeGreatCircleDistance(0, 0, 0, 180);
    const expected = Math.PI * 6371;
    expect(Math.abs(dist - expected)).toBeLessThan(1);
  });

  it('should return the same distance regardless of parameter order', () => {
    const dist1 = computeGreatCircleDistance(40.7, -74.0, 51.5, -0.1);
    const dist2 = computeGreatCircleDistance(51.5, -0.1, 40.7, -74.0);
    expect(dist1).toBe(dist2);
  });
});
