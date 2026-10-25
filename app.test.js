// Mock global variables used in app.js
global.window = {};
global.document = {
  addEventListener: () => {},
  getElementById: () => ({
    textContent: '',
    innerHTML: '',
    style: {},
    appendChild: () => {},
    setAttribute: () => {},
    classList: { add: () => {}, remove: () => {}, toggle: () => {} },
    dataset: {},
    addEventListener: () => {}
  }),
  querySelectorAll: () => []
};
global.localStorage = {
  getItem: () => null,
  setItem: () => {}
};

const { test } = require('node:test');
const assert = require('node:assert');
const {
  format24HourTime,
  classifyArticleCategory,
  computeArticleImpact
} = require('./app.js');

test('format24HourTime', async (t) => {
  await t.test('converts 85 seconds to 23:58:35', () => {
    assert.strictEqual(format24HourTime(85), '23:58:35');
  });

  await t.test('converts 120 seconds to 23:58:00', () => {
    assert.strictEqual(format24HourTime(120), '23:58:00');
  });

  await t.test('converts 0 seconds to 23:60:00 (midnight)', () => {
    assert.strictEqual(format24HourTime(0), '23:60:00');
  });
});

test('classifyArticleCategory', async (t) => {
  await t.test('classifies diplomacy keywords', () => {
    assert.strictEqual(classifyArticleCategory('new peace treaty signed'), 'diplomacy');
  });

  await t.test('classifies biosecurity keywords', () => {
    assert.strictEqual(classifyArticleCategory('virus outbreak reported'), 'bio');
  });

  await t.test('classifies AI keywords', () => {
    assert.strictEqual(classifyArticleCategory('new artificial intelligence model'), 'ai');
  });

  await t.test('classifies climate keywords', () => {
    assert.strictEqual(classifyArticleCategory('global warming emissions'), 'climate');
  });

  await t.test('defaults to nuclear', () => {
    assert.strictEqual(classifyArticleCategory('unknown topic'), 'nuclear');
  });
});

test('computeArticleImpact', async (t) => {
  await t.test('handles diplomacy category', () => {
    assert.deepStrictEqual(computeArticleImpact('some text', 'diplomacy'), {
      label: 'Stabilizing Signal',
      type: 'stabilizing',
      tension: 35
    });
  });

  await t.test('handles high risk keywords', () => {
    assert.deepStrictEqual(computeArticleImpact('missile test escalation', 'nuclear'), {
      label: 'High Clock Pressure',
      type: 'risk',
      tension: 92
    });
  });

  await t.test('handles default risk', () => {
    assert.deepStrictEqual(computeArticleImpact('normal text', 'nuclear'), {
      label: 'Elevated Watch',
      type: 'risk',
      tension: 78
    });
  });
});
