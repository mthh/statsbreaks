import tap from 'tap';
import X from './test-data.js';
import * as statsbreaks from '../src/index.js';

tap.test("nestedmeans", function (t) {
  t.throws(function() {
      const breaks = statsbreaks.breaks([1, 2, 3], { method: 'nestedmeans', nb: 8 });
    },
    new statsbreaks.TooFewValuesError('Too few values for the given number of breaks'),
    'should throw error if the number of classes is too high',
  );

  t.throws(function() {
      const breaks = statsbreaks.breaks(X, { method: 'nestedmeans', nb: 5 });
    },
    new statsbreaks.InvalidNumberOfClassesError('The \'nb\' parameter must be a power of 2'),
    'should throw error if the number of classes is not a power of 2',
  );

  t.end();
});

tap.test("NestedMeansClassifier", function (t) {
  t.throws(function() {
      const d = new statsbreaks.NestedMeansClassifier([1, 2, 3]);
      const breaks = d.classify(8);
    },
    new statsbreaks.TooFewValuesError('Too few values for the given number of breaks'),
    'should throw error if the number of classes is too high',
  );

  t.throws(function() {
      const d = new statsbreaks.NestedMeansClassifier([1, 2, 3]);
      const breaks = d.classify(5);
    },
    new statsbreaks.InvalidNumberOfClassesError('The \'nb\' parameter must be a power of 2'),
    'should throw error if the number of classes is not a power of 2',
  );

  t.end();
});