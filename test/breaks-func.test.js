import tap from 'tap';
import X from './test-data.js';
import * as statsbreaks from '../src/index.js';

tap.test("Breaks function", function (t) {
  t.throws(function() {
      const breaks = statsbreaks.breaks([1, 2, 3, 4, 5, 6, 7, 8], { method: 'unknown' });
    },
    new statsbreaks.UnknownMethodError("Unknown classification method"),
    "should throw error if the method is unknown",
  );

  t.test('should default to quantile method if no method is provided', function (t) {
    const b1 = statsbreaks.breaks(X, { method: 'quantile', nb: 5 });
    const b2 = statsbreaks.breaks(X, { nb: 5 });
    t.same(b1, b2);
    t.end();
  });
  t.end();
});
