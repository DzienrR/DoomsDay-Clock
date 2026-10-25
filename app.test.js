const {
  format24HourTime,
  classifyArticleCategory,
  computeArticleImpact
} = require('./app');

describe('format24HourTime', () => {
  it('converts 85 seconds to 23:58:35', () => {
    expect(format24HourTime(85)).toBe('23:58:35');
  });

  it('converts 120 seconds to 23:58:00', () => {
    expect(format24HourTime(120)).toBe('23:58:00');
  });

  it('converts 0 seconds to 23:60:00 (midnight)', () => {
    expect(format24HourTime(0)).toBe('23:60:00');
  });
});

describe('classifyArticleCategory', () => {
  it('classifies diplomacy keywords', () => {
    expect(classifyArticleCategory('new peace treaty signed')).toBe('diplomacy');
  });

  it('classifies biosecurity keywords', () => {
    expect(classifyArticleCategory('virus outbreak reported')).toBe('bio');
  });

  it('classifies AI keywords', () => {
    expect(classifyArticleCategory('new artificial intelligence model')).toBe('ai');
  });

  it('classifies climate keywords', () => {
    expect(classifyArticleCategory('global warming emissions')).toBe('climate');
  });

  it('defaults to nuclear', () => {
    expect(classifyArticleCategory('unknown topic')).toBe('nuclear');
  });
});

describe('computeArticleImpact', () => {
  it('handles diplomacy category', () => {
    expect(computeArticleImpact('some text', 'diplomacy')).toEqual({
      label: 'Stabilizing Signal',
      type: 'stabilizing',
      tension: 35
    });
  });

  it('handles high risk keywords', () => {
    expect(computeArticleImpact('missile test escalation', 'nuclear')).toEqual({
      label: 'High Clock Pressure',
      type: 'risk',
      tension: 92
    });
  });

  it('handles default risk', () => {
    expect(computeArticleImpact('normal text', 'nuclear')).toEqual({
      label: 'Elevated Watch',
      type: 'risk',
      tension: 78
    });
  });
});
