import tap from 'tap';
import * as statsbreaks from '../src/index.js';

const X = [10, 15, 20, 30, 40, 50, 60, 70, 80, 90];

// We test the splitByClass method with the CustomBreaksClassifier
// because this method is common to all classifiers
// and does not depend on the method used to classify
// the input values.
tap.test("Classifiers", function (t) {
  t.test('should splitByClass correctly with only one class', function (t) {
    const d1 = new statsbreaks.CustomBreaksClassifier(
      X, // values
      null, // precision
      'right', // right closed / default
      [0, 100], // breaks
    );
    const groups1 = d1.splitByClass();
    t.same(groups1, [
      [10, 15, 20, 30, 40, 50, 60, 70, 80, 90],
    ]);

    const d2 = new statsbreaks.CustomBreaksClassifier(
      X, // values
      null, // precision
      'right', // right closed / default
      [10, 90], // breaks
    );
    const groups = d2.splitByClass();
    t.same(groups, [
      [10, 15, 20, 30, 40, 50, 60, 70, 80, 90],
    ]);
    t.end();
  });

  t.test('should splitByClass correctly with more than one class', function (t) {
    const d1 = new statsbreaks.CustomBreaksClassifier(
      X, // values
      null, // precision
      'right', // right closed / default
      [10, 30, 60, 90], // breaks
    );
    const groups1 = d1.splitByClass();
    t.same(groups1, [
      [10, 15, 20, 30],
      [40, 50, 60],
      [70, 80, 90],
    ]);

    const d2 = new statsbreaks.CustomBreaksClassifier(
      X, // values
      null, // precision
      'right', // right closed / default
      [10, 50, 90], // breaks
    );
    const groups2 = d2.splitByClass();
    t.same(groups2, [
      [10, 15, 20, 30, 40, 50],
      [60, 70, 80, 90],
    ]);
    t.end();
  });

  t.end();
});
