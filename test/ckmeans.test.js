import tap from 'tap';
import * as statsbreaks from '../src/index.js';
import X2 from './test-data.js';

// This reference dataset is coming from https://github.com/urschrei/ckmeans/blob/main/src/lib.rs
const X = [
  2.186880969969168,
  2.693032112550337,
  3.93180201956282,
  1.8858499460215248,
  3.2891992800955743,
  3.9589934791200636,
  1.7694796044907883,
  3.1708232466019686,
  3.7138103814880594,
  1.8084003369996897,
  2.947289457238938,
  4.079716765942393,
  2.0194812135793665,
  3.367740732705309,
  3.946018838624863,
  1.705437159404827,
  2.8825959512135055,
  3.9858496811993005,
  1.1818317192295225,
  3.1959882611908723,
  3.7975952600818155,
  2.3260003550458643,
  3.07900975917915,
  3.9720330300265134,
  2.0924928025791947,
  3.4149858245262528,
  3.999784164947667,
  2.0380375859511815,
  2.561038262661651,
  4.235818645004002,
  1.9407084883926995,
  3.0986532853492266,
  4.187154244559768,
  1.9374536938000988,
  3.30128973533264,
  4.073525037840789,
  1.6219950585216787,
  2.9516652622521122,
  3.8379509834033345,
  1.8301227974955063,
  3.0587066916259453,
  4.038198749869919,
  1.8463122036805393,
  2.874469711585369,
  3.739250728698104,
  1.8839182936098067,
  3.3398569038428207,
  4.041222857529328,
  2.1580781476395363,
  2.7895732670501525,
  3.670343274157198,
  2.07520762025803,
  3.0269076086290547,
  4.068500990714395,
  2.1507662912105188,
  2.7869451246159356,
  4.060256411136024,
  2.160538596948854,
  3.5911668420419023,
  3.936942667005152,
  1.7823749743811554,
  2.398556760000693,
  3.8580726777270233,
  2.276857198356403,
  2.6674703770216155,
  3.9893132644126292,
  2.126263439397846,
  2.887148841450299,
  4.0064504153769445,
  2.384214172538217,
  3.1584945263692616,
  3.917391700186437,
  2.045842731040772,
  2.8966069573005266,
  4.061877233021508,
  2.5020730840642127,
  2.467027330439492,
  4.0591228764126965,
  1.9267648419184489,
  3.184736160134685,
  3.7987094137777633,
  2.407891897908353,
  3.1130351706505945,
  4.305405220398142,
  3.020832358740857,
  3.0896459925373163,
  4.337513332122615,
  2.1513897982836148,
  3.3890652149152194,
  4.147203390905856,
  1.7442267399486338,
  3.1204974225957933,
  4.2027932814531255,
  1.8205218144747235,
  2.51457165291436,
  4.196065588365519,
  2.3246013572839828,
  3.650545226495212,
  3.9951077005292133,
  1.4786492630219163,
  3.184728841579185,
  4.0477366974592695,
  2.098834005399845,
  3.303175986466117,
  3.7892288071653972,
  2.6244701492863274,
  2.8894897144167992,
  3.970265133933609,
  2.113416007212771,
  2.8377269735255495,
  4.098857511413,
  2.2209214153388634,
  3.002366818476632,
  4.283496512420427,
  1.5581566168268295,
  2.980756646018853,
  3.910127425359612,
  1.490739212060197,
  2.895513344823693,
  4.247576525913251,
  2.1892069006343498,
  2.998806078461756,
  3.8592093775400564,
  1.5867268541671686,
  3.152649521951604,
  3.8244408451591436,
  3.1103871346526786,
  2.4849703616336956,
  4.156025918520517,
  1.5111721433515135,
  3.750816172762316,
  3.9323386383451204,
  2.07694992767919,
  3.2081543986400645,
  4.045289073742084,
  1.9760445160142919,
  3.031327170083975,
  4.204267226311512,
  1.939214053185361,
  3.323788480108269,
  3.7479817408726013,
  2.7826733587061487,
  3.240250893521295,
  3.778322920441067,
  2.4028971995599546,
  3.0490359072527893,
  3.9413611225889986,
  1.9148189265548152,
  2.944080059198642,
  4.26740684738878,
  2.0585827568749755,
  2.782341912819006,
  3.7972162173331205,
  1.6197265398278322,
  3.2559388197360932,
  4.220325996536666,
  1.9819279442330058,
  3.053309950903032,
  4.0050344570479135,
  3.4548807971848774,
  3.1713063979025087,
  3.7920422745644933,
  2.687431903142606,
  3.0435341288234374,
  3.9362188800977105,
  1.3844307677087702,
  2.9950559957757354,
  3.904845590592921,
  3.061504913041073,
  3.1307583228310243,
  4.317604148100834,
  1.291369155045615,
  3.443142692197454,
  4.167123158127977,
  1.2857831107446278,
  2.7431343316148227,
  3.7053733663027435,
  2.3804168566032153,
  2.887674496702909,
  3.9905418408411313,
  1.6719236556114467,
  2.9850026778984935,
  4.146972397533571,
  2.0797012089809805,
  2.951096908063335,
  3.7937067992429365,
  3.001063205135309,
  3.1349248082219585,
  4.022206004589426,
  1.545495981764916,
  2.8966308040049626,
  4.026750229754802,
  2.4550193767136625,
  3.104846667702584,
  4.170108463306901,
  1.3670530711301323,
  2.8324561745174393,
  4.098799538338867,
  1.814066923533963,
  2.581112819622158,
  3.7799212342284623,
  1.115008897674243,
  3.103260260015172,
  3.93758902072937,
  2.411956649166637,
  3.351700352820514,
  4.02264087937381,
  2.714506909365993,
  2.844309361015004,
  3.78747911946831,
  0.6837250553832857,
  2.971586707439505,
  4.311768255823228,
  1.4357914829153984,
  2.931274470207522,
  3.906562719609756,
  0.7588119839001057,
  3.136088252208502,
  3.885505169010581,
  2.831050009570089,
  3.2362698758142,
  3.982431100799526,
  1.9799364874072174,
  2.6129547692020156,
  3.922712312227067,
  1.8170787670268898,
  2.778751474760038,
  3.7741794216317284,
  1.5741525951882862,
  3.313796027497986,
  3.982980119091688,
  1.9631452831903196,
  3.0190400754273408,
  3.6350105292308967,
  2.1392898392284154,
  2.8787532500074886,
  3.87782944221161,
  2.1954929432424017,
  3.147517117687641,
  3.79917107952907,
  2.2500223093687755,
  2.74863594601638,
  3.6579386999790824,
  2.036446584820199,
  2.4802832934810057,
  4.043549388062252,
  3.135722451985087,
  3.5452511808887515,
  3.9693425471296013,
  1.8229938030274273,
];

tap.test("ckmeans", function (t) {
  t.test('should return correct breaks for the test data', function (t) {
    const breaks = statsbreaks.breaks(X, { method: 'ckmeans', nb: 3, precision: 2 });
    // Breaks values are coming from https://github.com/urschrei/ckmeans/blob/main/src/lib.rs
    t.same(breaks, [0.68, 2.43, 3.5, 4.34]);
    t.end();
  });

  t.end();
});

tap.test("CkmeansClassifier", function (t) {
  t.test('should return correct breaks for the test data', function (t) {
    const d = new statsbreaks.CkmeansClassifier(X);
    const breaks = d.classify(3);
    // Breaks values are coming from https://github.com/urschrei/ckmeans/blob/main/src/lib.rs
    t.same(breaks, [0.68, 2.43, 3.5, 4.34]);
    t.end();
  });

  t.end();
});

tap.test('CkmeansClassifier', function (t) {
  t.test('should return same classification as jenks for the test data', function (t) {
    const dj = new statsbreaks.JenksClassifier(X2);
    const breaksJenks = dj.classify(5);
    t.same(breaksJenks, [0.13, 93.02, 228.49, 546.68, 2417.15, 4111.45]);

    const dc = new statsbreaks.CkmeansClassifier(X2);
    const breaksCkmeans = dc.classify(5);
    t.same(breaksCkmeans, [0.13, 93.02, 228.49, 546.68, 2417.15, 4111.45]);
    t.end();
  });

  t.test('should return same count by class as jenks for the test data (1)', function (t) {
    const dj = new statsbreaks.JenksClassifier(X2);
    const breaksJenks = dj.classify(5);
    const countJenks = dj.countByClass();

    const dc = new statsbreaks.CkmeansClassifier(X2);
    const breaksCkmeans = dc.classify(5);
    const countCkmeans = dc.countByClass();

    t.same(countJenks, countCkmeans);

    t.end();
  });

  t.test('should return same count by class as jenks for the test data (1)', function (t) {
    const dj = new statsbreaks.JenksClassifier(X);
    const breaksJenks = dj.classify(4);
    const countJenks = dj.countByClass();

    const dc = new statsbreaks.CkmeansClassifier(X);
    const breaksCkmeans = dc.classify(4);
    const countCkmeans = dc.countByClass();

    t.same(countJenks, countCkmeans);

    t.end();
  });

  t.end();
});
