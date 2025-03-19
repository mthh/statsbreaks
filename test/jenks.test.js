import tap from 'tap';
import X from './test-data.js';
import * as statsbreaks from '../src/index.js';

tap.test("jenks", function (t) {
  t.test('should return correct breaks for the test data', function (t) {
    const breaks = statsbreaks.breaks(X, { method: 'jenks', nb: 5 });
    // t.same(breaks, [0.13, 75.29, 192.05, 370.50, 722.85, 4111.45]);
    t.same(breaks, [0.13, 93.02, 228.49, 546.68, 2417.15, 4111.45]);
    t.end();
  });

  t.throws(function() {
      const breaks = statsbreaks.breaks([1, 2, 3], { method: 'jenks', nb: 5 });
    },
    new statsbreaks.TooFewValuesError('Too few values for the given number of breaks'),
    'should throw error if the number of classes is too high',
  );
  t.end();
});

tap.test("JenksClassifier", function (t) {
  t.test('should return correct breaks for the test data', function (t) {
    const d = new statsbreaks.JenksClassifier(X);
    const breaks = d.classify(5);
    // t.same(breaks, [0.13, 75.29, 192.05, 370.50, 722.85, 4111.45]);
    t.same(breaks, [0.13, 93.02, 228.49, 546.68, 2417.15, 4111.45]);
    t.end();
  });

  t.test('should return correct count by class for the test data', function (t) {
    const d = new statsbreaks.JenksClassifier(X);
    const breaks = d.classify(5);
    const count = d.countByClass()
    t.same(count, [49, 3, 4, 1, 1]);
    t.end();
  });

  t.throws(function() {
      const d = new statsbreaks.JenksClassifier([1, 2, 3]);
      const breaks = d.classify(5);
    },
    new statsbreaks.TooFewValuesError('Too few values for the given number of breaks'),
    'should throw error if the number of classes is too high',
  );

  t.end();
});
