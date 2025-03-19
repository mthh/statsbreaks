import tap from 'tap';
import X from './test-data.js';
import * as statsbreaks from '../src/index.js';

tap.test("quantile", function (t) {
  t.test('should return correct breaks for the test data', function (t) {
    const breaks = statsbreaks.breaks(X, { method: 'quantile', nb: 5 });
    t.same(breaks, [0.13, 1.46, 5.80, 13.28, 54.62, 4111.45]);
    t.end();
  });

  t.throws(function() {
    const breaks = statsbreaks.breaks([1, 2, 3], { method: 'quantile', nb: 5 });
  },
    new statsbreaks.TooFewValuesError('Too few values for the given number of breaks'),
    'should throw error if the number of classes is too high',
    );
  t.end();
});

tap.test("QuantileClassifier", function (t) {
  t.test('should return correct breaks for the test data', function (t) {
    const d = new statsbreaks.QuantileClassifier(X);
    const breaks = d.classify(5);
    t.same(breaks, [0.13, 1.46, 5.80, 13.28, 54.62, 4111.45]);
    t.end();
  });

  t.test('should return correct count by class for the test data', function (t) {
    const d = new statsbreaks.QuantileClassifier(X);
    const breaks = d.classify(5);
    const count = d.countByClass()
    t.same(count, [12, 11, 12, 11, 12]);
    t.end();
  });

  t.throws(function() {
      const d = new statsbreaks.QuantileClassifier([1, 2, 3]);
      const breaks = d.classify(5);
    },
    new statsbreaks.TooFewValuesError('Too few values for the given number of breaks'),
    'should throw error if the number of classes is too high',
  );

  t.end();
});