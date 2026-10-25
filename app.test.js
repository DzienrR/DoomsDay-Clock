const fs = require('fs');
const vm = require('vm');
const test = require('node:test');
const assert = require('node:assert');

// Helper to load app.js into a clean VM context
function getContext() {
  const ctx = {
    window: {},
    document: {
      addEventListener: () => {},
      getElementById: () => ({ addEventListener: () => {} }),
      querySelectorAll: () => [],
      title: ''
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
    clearInterval: () => {},
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

test('classifyArticleCategory', async (t) => {
  const { classifyArticleCategory } = getContext();

  await t.test('diplomacy keywords', () => {
    assert.strictEqual(classifyArticleCategory('peace treaty signed'), 'diplomacy');
    assert.strictEqual(classifyArticleCategory('ceasefire agreed'), 'diplomacy');
    assert.strictEqual(classifyArticleCategory('nuclear disarmament'), 'diplomacy');
    assert.strictEqual(classifyArticleCategory('Paris accord'), 'diplomacy');
    assert.strictEqual(classifyArticleCategory('new agreement'), 'diplomacy');
    assert.strictEqual(classifyArticleCategory('ratification of pact'), 'diplomacy');
  });

  await t.test('bio keywords', () => {
    assert.strictEqual(classifyArticleCategory('biosecurity threat'), 'bio');
    assert.strictEqual(classifyArticleCategory('global pandemic'), 'bio');
    assert.strictEqual(classifyArticleCategory('deadly virus'), 'bio');
    assert.strictEqual(classifyArticleCategory('new pathogen'), 'bio');
    assert.strictEqual(classifyArticleCategory('disease outbreak'), 'bio');
    assert.strictEqual(classifyArticleCategory('vaccine development'), 'bio');
    assert.strictEqual(classifyArticleCategory('synthetic biology research'), 'bio');
  });

  await t.test('ai keywords', () => {
    assert.strictEqual(classifyArticleCategory('artificial intelligence models'), 'ai');
    assert.strictEqual(classifyArticleCategory('autonomous weapons'), 'ai');
    assert.strictEqual(classifyArticleCategory('cyber attack'), 'ai');
    assert.strictEqual(classifyArticleCategory('deepfake video'), 'ai');
    assert.strictEqual(classifyArticleCategory('quantum computing'), 'ai');
    assert.strictEqual(classifyArticleCategory('new algorithm'), 'ai');
  });

  await t.test('climate keywords', () => {
    assert.strictEqual(classifyArticleCategory('climate change'), 'climate');
    assert.strictEqual(classifyArticleCategory('global warming'), 'climate');
    assert.strictEqual(classifyArticleCategory('carbon emissions'), 'climate');
    assert.strictEqual(classifyArticleCategory('forest wildfire'), 'climate');
    assert.strictEqual(classifyArticleCategory('melting glacier'), 'climate');
    assert.strictEqual(classifyArticleCategory('carbon footprint'), 'climate');
    assert.strictEqual(classifyArticleCategory('methane gas'), 'climate');
    assert.strictEqual(classifyArticleCategory('category 5 hurricane'), 'climate');
    assert.strictEqual(classifyArticleCategory('super typhoon'), 'climate');
    assert.strictEqual(classifyArticleCategory('deadly heatwave'), 'climate');
  });

  await t.test('nuclear (fallback)', () => {
    assert.strictEqual(classifyArticleCategory('uranium enrichment'), 'nuclear');
    assert.strictEqual(classifyArticleCategory('plutonium core'), 'nuclear');
    assert.strictEqual(classifyArticleCategory('general news article'), 'nuclear');
    assert.strictEqual(classifyArticleCategory(''), 'nuclear');
    assert.strictEqual(classifyArticleCategory('!@#$%^&*()'), 'nuclear');
  });

  await t.test('case insensitivity', () => {
    assert.strictEqual(classifyArticleCategory('PEACE TREATY'), 'diplomacy');
    assert.strictEqual(classifyArticleCategory('BIOSECURITY'), 'bio');
    assert.strictEqual(classifyArticleCategory('Artificial Intelligence'), 'ai');
    assert.strictEqual(classifyArticleCategory('CLIMATE'), 'climate');
  });

  await t.test('word boundaries for ai', () => {
    // "ai" should match only as a word boundary
    assert.strictEqual(classifyArticleCategory('generative ai model'), 'ai');
    assert.strictEqual(classifyArticleCategory('AI technology'), 'ai');
    assert.strictEqual(classifyArticleCategory('said'), 'nuclear'); // should not match 'ai'
    assert.strictEqual(classifyArticleCategory('maid'), 'nuclear');
    assert.strictEqual(classifyArticleCategory('rain'), 'nuclear');
  });
});

test('computeArticleImpact', async (t) => {
  const { computeArticleImpact } = getContext();

  await t.test('handles diplomacy category', () => {
    const result = computeArticleImpact('some text', 'diplomacy');
    assert.deepEqual(result, {
      label: 'Stabilizing Signal',
      type: 'stabilizing',
      tension: 35
    });
  });

  await t.test('handles high risk keywords', () => {
    const result = computeArticleImpact('missile test escalation', 'nuclear');
    assert.deepEqual(result, {
      label: 'High Clock Pressure',
      type: 'risk',
      tension: 92
    });
  });

  await t.test('handles default risk', () => {
    const result = computeArticleImpact('normal text', 'nuclear');
    assert.deepEqual(result, {
      label: 'Elevated Watch',
      type: 'risk',
      tension: 78
    });
  });

  await t.test('case insensitivity', () => {
    const result = computeArticleImpact('NUCLEAR STRIKE WARNING', 'nuclear');
    assert.deepEqual(result, {
      label: 'High Clock Pressure',
      type: 'risk',
      tension: 92
    });
  });
});
