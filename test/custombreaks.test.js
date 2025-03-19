import tap from 'tap';
import X from './test-data.js';
import * as statsbreaks from '../src/index.js';

tap.test("CustomBreaksClassifier", function (t) {
  t.test('should return correct count by class for the test data', function (t) {
    const d = new statsbreaks.CustomBreaksClassifier(X);
    d.classify([0, 22, 674, 4112]);
    const count = d.countByClass()
    t.same(count, [38, 18, 2]);
    t.end();
  });

  t.end();
});