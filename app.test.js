const { computeArticleImpact } = require('./app');

describe('computeArticleImpact', () => {
  it('should return stabilizing impact for diplomacy category', () => {
    const result = computeArticleImpact('Some text', 'diplomacy');
    expect(result).toEqual({ label: 'Stabilizing Signal', type: 'stabilizing', tension: 35 });
  });

  it('should return high risk for high clock pressure text', () => {
    const result = computeArticleImpact('Nuclear strike warning', 'news');
    expect(result).toEqual({ label: 'High Clock Pressure', type: 'risk', tension: 92 });
  });

  it('should return elevated watch for elevated risk text', () => {
    const result = computeArticleImpact('Global tension rise', 'news');
    expect(result).toEqual({ label: 'Elevated Watch', type: 'risk', tension: 78 });
  });

  it('should be case insensitive', () => {
    const result = computeArticleImpact('NUCLEAR STRIKE WARNING', 'news');
    expect(result).toEqual({ label: 'High Clock Pressure', type: 'risk', tension: 92 });
  });
});
