const test = require("tap").test;
const statsbreaks = require("../dist/index.min.js");
const X = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25];

test('Classifier with right closed intervals', function (t) {
  t.test('should return correct getClass / countByClass / splitByClass values for the test data', function (t) {
    const d0 = new statsbreaks.CustomBreaksClassifier(
      X, // values
      null, // precision
      [1, 7, 14, 19, 25], // breaks
      // No value for the closure parameter, default is right
    );
    const split0 = d0.splitByClass();
    const count0 = d0.countByClass();
    t.same(count0, [4, 3, 3, 3]);
    t.same(split0, [
      [1, 3, 5, 7],
      [9, 11, 13],
      [15, 17, 19],
      [21, 23, 25],
    ]);

    const d1 = new statsbreaks.CustomBreaksClassifier(
      X, // values
      null, // precision
      [1, 7, 14, 19, 25], // breaks
      'right' // right closed / default
    );
    const split1 = d1.splitByClass();
    const count1 = d1.countByClass();
    t.same(count1, count0);
    t.same(split1, split0);
    t.end();
  });
  t.end();
});

test('Classifier with left closed intervals', function (t) {
  t.test('should return correct getClass / countByClass / splitByClass values for the test data', function (t) {
    const d0 = new statsbreaks.CustomBreaksClassifier(
      X, // values
      null, // precision
      [1, 7, 14, 19, 25], // breaks
      'left' // Left closed
    );
    const split0 = d0.splitByClass();
    const count0 = d0.countByClass();
    t.same(count0, [3, 4, 2, 4]);
    t.same(split0, [
      [1, 3, 5],
      [7, 9, 11, 13],
      [15, 17],
      [19, 21, 23, 25],
    ]);
    t.end();
  });
  t.end();
});
