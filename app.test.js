const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const vm = require('vm');

const appCode = fs.readFileSync('./app.js', 'utf8');
const sandbox = {
  document: {
    querySelectorAll: () => [],
    getElementById: () => ({ addEventListener: () => {} }),
    addEventListener: () => {},
    title: ''
  },
  window: {},
  console: console,
  setTimeout: setTimeout,
  clearInterval: clearInterval,
  setInterval: setInterval
};
vm.createContext(sandbox);
vm.runInContext(appCode, sandbox);

const classifyArticleCategory = sandbox.classifyArticleCategory;

test('classifyArticleCategory', async (t) => {
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
