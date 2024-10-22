const test = require("tap").test;
const statsbreaks = require("../dist/index.min.js");

const X = [
  561.3375698527462,
  576.2668923751235,
  366.4734913298455,
  537.4593925216243,
  405.0338831466622,
  627.5491387803808,
  602.2387619764663,
  570.6188579603895,
  524.9326882219825,
  575.9077244218867,
  713.4766625401323,
  421.82014125902367,
  317.3090704372552,
  482.22671468680267,
  656.8428815778216,
  536.7808539941725,
  612.3702660597073,
  494.7160137686816,
  529.15255505171,
  449.5153837261272,
  329.2234664796943,
  431.8566565442848,
  670.2786377472647,
  591.9249523526832,
  604.20207494654,
  390.3118083172346,
  381.91510804721696,
  507.9809889541853,
  589.2256289103627,
  508.27487527157564,
  607.5931100033602,
  450.60116745383885,
  439.32676487479114,
  378.52290760493923,
  372.9059316947294,
  457.5338596766434,
  675.2613308104986,
  343.75270273542185,
  617.6583940545804,
  553.046351635586,
  290.84284395372185,
  366.66743539067244,
  465.7422084752988,
  577.1104985041342,
  397.78172736799047,
  581.6703351190937,
  563.3792467107502,
  431.9590659907204,
  809.9188831949951,
  694.4802795396465,
  507.2122967109057,
  567.2495680934646,
  453.03852833491413,
  518.3605463321508,
  506.55714661703445,
  473.9633524913023,
  461.18302649870833,
  500.98082712951077,
  390.060525257348,
  608.815515103678,
  430.45173150173144,
  689.3907512028394,
  494.8275556765523,
  470.7227297690507,
  628.1591010135832,
  381.39569878468615,
  507.89042978093426,
  473.0859986620433,
  421.5139812457125,
  362.1027942254862,
  507.8221751889037,
  664.0051600252292,
  412.390920366413,
  519.6960664796901,
  548.487378499791,
  522.0030338404011,
  450.0526213016897,
  521.1789733255575,
  500.5286121098956,
  526.0819042600558,
  486.2616026399837,
  532.8862720088352,
  554.8305542292034,
  529.2811689600929,
  486.32150801025335,
  585.3070029387925,
  425.3216619535409,
  341.2859199663213,
  492.9282131967542,
  483.39320233400946,
  356.6228988413593,
  329.50878880160656,
  579.676105267572,
  575.7637615245757,
  443.48030714084285,
  610.9455639148867,
  517.4240498411724,
  549.745624526098,
  488.76193431959115,
  434.21218399115855,
  404.84611643715516,
  452.57734472586674,
  419.5701647586758,
  495.14713014214664,
  473.1225327020615,
  561.7835524237756,
  397.5086479690959,
  598.6276069754256,
  565.5879952367607,
  434.35571812732763,
  409.56998548905744,
  656.427263102367,
  680.7776814296282,
  272.49679276082503,
  558.0063578575556,
  588.7998734566664,
  537.6733204520566,
  656.4935540051953,
  355.3041142484241,
  541.3886698608029,
  327.3729674504015,
  397.83061347649186,
  613.2283173538958,
  597.3183499497729,
  610.8079004654307,
  383.32589147935084,
  508.2944639321454,
  459.7743274813533,
  390.2720439178973,
  597.9294065047816,
  484.53697596272,
  439.50188958982244,
  496.55561377933634,
  505.1490820995909,
  544.2293858583795,
  508.0785766280151,
  591.9053886369771,
  638.0338042544776,
  480.8829626510517,
  513.7602184105871,
  609.8584966959997,
  577.6555832096279,
  540.8292227003427,
  566.308186827701,
  475.5574616671737,
  451.90725788139116,
  494.0477444192138,
  462.9464830069545,
  781.3610605843674,
  488.07757040632794,
  361.077419181728,
  400.7309437325561,
  606.7352791422039,
  541.7175976604663,
  381.50299381342285,
  360.76588594176,
  528.6914035726528,
  511.246846006718,
  605.4184833307858,
  446.7495415379575,
  570.1443413056277,
  607.6255400006748,
  491.46031307748314,
  554.9427675054695,
  662.7350126791576,
  514.497905410884,
  484.5561239825345,
  555.0254914310686,
  590.9881272225294,
  398.9720829783965,
  777.1980862133508,
  520.9674137074676,
  823.8124598086588,
  521.255941967358,
  643.0597717300382,
  514.8483876908358,
  508.4447484170467,
  478.8286078288696,
  572.6656354890016,
  528.8371790674855,
  398.23029545194385,
  457.05298279923244,
  446.2768885559563,
  491.5106729991062,
  459.12269461617257,
  548.880576359018,
  515.6843403983543,
  415.07108811773713,
  346.72793588300084,
  406.44426909310255,
  429.91712574778546,
  472.82370692383313,
  379.47493862019496,
  552.7105891141669,
  524.4805624127009,
  543.4371234933697,
  632.0006627850651,
  527.8268218855267,
  448.66122978296505,
  500.05850799171657,
  455.64112766250946,
  523.5231581255207,
  378.0466725214096,
  520.6310114119509,
  517.7657695013157,
  598.8008528656829,
  645.6635045202693,
  546.793993124004,
  510.95898562008637,
  565.8499473390291,
  456.4753207304082,
  405.9514155953462,
  442.33349527031413,
  579.9948569011548,
  582.1772523103842,
  422.01292774241597,
  520.0368655706171,
  592.5185320485402,
  466.57020584585064,
  370.6134688793926,
  489.500235455926,
  627.860419534024,
  478.5454868299992,
  461.1356935655699,
  612.6980308718344,
  441.7301343465608,
  525.5484739357084,
  528.4476217193994,
  510.1398498145864,
  433.12503603307607,
  508.4986274873855,
  683.3742127499382,
  436.9189738889334,
  436.1401425283484,
  469.27817821154645,
  532.855855537045,
  428.609364392817,
  487.95895214483426,
  554.9413800072003,
  674.7435170802918,
  579.1086397008754,
  432.8871512130137,
  572.4016122868427,
  601.7905641412657,
  414.72827233445383,
  324.1077707496099,
  412.97298289198034,
  610.2857091331646,
  366.62868577194354,
  435.73022766570085,
  515.0344013771793,
  328.78469092588176,
  604.2870030915219,
  370.9141772758281,
  519.6783094455568,
  519.4381521605594,
  516.9122855283157,
  540.4303646051529,
  582.864858076242,
  565.404936212704,
  514.5213006982383,
  392.5694754857228,
  481.0340976489931,
  409.17341878307076,
  386.6205887057803,
  529.7981600893993,
  500.54949680205664,
  400.9663897269997,
  445.35406776083994,
  401.5099642172635,
  472.35554172084824,
  422.4877087233588,
  578.2245847311652,
  354.94652521570407,
  566.2229550802108,
  558.7345063907097,
  400.1446930439473,
  498.2286247552384,
  396.0173968831219,
  512.471688872165,
  591.4604799129064,
  509.37698905074825,
  611.9570436484611,
  396.68203780062237,
  473.60482814900973,
  612.545661537122,
  483.091675796187,
  547.4146540296284,
  466.142282736505,
  607.7631680565711,
  485.0668043607613,
  690.8054073183256,
  500.25792017045944,
  597.4742669263989,
  482.9295565321225,
  422.5670755323316,
  479.5425439837947,
  492.729059909223,
  403.96576054236124,
  568.4861159059599,
  635.5227461001807,
  482.3177099671565,
  439.404804355533,
  536.0746299324304,
  538.3275114141708,
  441.7240474597803,
  406.72486878583504,
  445.73525616505304,
  542.5307992000579,
  592.9995946340412,
  603.9706779871362,
  466.6972590133705,
  534.5363814128019,
  643.7542431153732,
  392.383763471017,
  448.4188590372296,
  648.9192144634683,
  604.4710428164428,
  543.414938038493,
  561.112988833025,
  554.4945047363137,
  436.34255411982105,
  300.4423876872446,
  449.02494280683527,
  649.2377194135612,
  583.2723872492186,
  497.0148359760021,
  468.26335895548414,
  463.0996506999678,
  576.0515358500993,
  444.282547562192,
  577.8108657239475,
  493.59763880245447,
  601.872330651379,
  498.6127992656486,
  500.7811104766705,
  566.1592822336355,
  454.75123196990927,
  426.8796460588327,
  516.9692014063476,
  466.3191375135842,
  634.0745875094005,
  376.18567234465985,
  715.3004881462059,
  410.659377395173,
  428.3603371870412,
  348.7523070853846,
  639.9372321002099,
  544.2484674697733,
  367.3011332320401,
  462.7216208760047,
  496.83841774692553,
  590.6423640509174,
  556.6166644164366,
  361.17784403038297,
  500.7239319122334,
  447.5095689730572,
  477.08619209711765,
  618.3563527271597,
  569.7803100632278,
  481.4682860110063,
  640.4983852569194,
  557.1874963829431,
  628.36779953714,
  464.00482334809163,
  420.30558844591746,
  343.15727364670954,
  528.929848743976,
  426.4794071488749,
  432.36463485359343,
  420.1876577434726,
  384.3163022164077,
  463.6463546183052,
  277.5067540645601,
  402.92467771939215,
  359.42824857074356,
  489.2643071776126,
  521.2100928163095,
  342.2766871847054,
  553.8580917649158,
  290.2703370299252,
  419.44758598086383,
  596.8743091435804,
  622.7146269313149,
  572.3500523094642,
  556.3876966188074,
  599.6279206750374,
  540.5133271699857,
  664.0241236590043,
  587.99270493104,
  375.1383475290213,
  636.4967999425901,
  508.66262112957384,
  594.2122675136437,
  581.3901658557158,
  554.8549687351419,
  341.4176364618903,
  534.1912402809755,
  447.10327734965813,
  293.3541264159744,
  482.81737156711165,
  538.7501708305513,
  557.3350469846561,
  467.6615802662764,
  422.393009046564,
  619.8106565868686,
  438.674931349395,
  385.8163232765668,
  384.7867925903499,
  516.995701540644,
  503.80101551980727,
  687.5846889688141,
  467.8047196449763,
  509.39970394156853,
  572.6851109701985,
  315.22139585872156,
  423.9644651637274,
  619.7530102383508,
  376.9397256082956,
  460.33075783971725,
  402.24430047689754,
  661.2445729289038,
  599.0027886260315,
  534.5953999882009,
  516.1851148496021,
  521.4769988252649,
  565.9536078981482,
  586.1581258439447,
  603.1021454523774,
  396.12806061851023,
  248.6778587825157,
  386.864522616615,
  437.5769398593111,
  465.8465389698705,
  542.3556984380228,
  515.919139421736,
  482.9973153631103,
  457.944217501778,
  265.6848892518478,
  520.3397728354696,
  670.8838569727742,
  390.9502537377904,
  425.47613196670176,
  456.8655135803713,
  563.2923998943286,
  482.0603560915375,
  367.6779383916616,
  401.4492284894086,
  510.56308900206614,
  386.8128562955785,
  627.7118359386818,
  539.6210908056765,
  554.2040732316342,
  510.0479424570794,
  676.373501555763,
  550.9894935512516,
  499.71167006067174,
  491.10496293189664,
  392.1584195287891,
  257.55896217669635,
  624.7250667014646,
  400.830974777148,
  564.9083731386254,
  531.2004233954171,
  556.1986817097661,
  419.01552306370513,
  362.2390975040989,
  655.9554308379494,
  376.24883171031786,
  453.44160621448515,
  393.6784222044515,
  571.4523615632479,
  551.946777327221,
  594.9879911002222,
  621.8330174961121,
  384.93095759913587,
  481.95981248410726,
  351.9676102854474,
  442.1243329338813,
  360.11705134822284,
  466.509198799933,
  461.17256523686785,
  390.5009216968103,
  424.98929230069064,
  437.61920433088136,
  598.6299072068211,
  535.6347072042672,
  568.0688400218302,
  482.1934196296148,
  484.51953699708514,
  608.3375776891236,
  604.2586989982588,
  335.6210517475605,
  493.7183987154365,
  688.5840634524629,
  645.7173868722921,
  555.4062459727943,
  456.085143201118,
  598.3894948241508,
  428.578415400672,
  470.413557917629,
  618.3315368507998,
  494.2022505962681,
  436.59606427358244,
  671.4150685659705,
  385.82670825876073,
  704.0074633690026,
  305.42576490034395,
  567.8419984367287,
  541.4443851242141,
  441.3572429922593,
  577.6617037786227,
  513.4989906037567,
  499.2588295614825,
  762.4947627999276,
  455.0741475053099,
  459.51557767259067,
  638.7895697156908,
  454.6131612986649,
  431.91963699740245,
  341.54825556232385,
  476.85745360195153,
  441.56820580255607,
  577.7002978674288,
  597.518000279993,
  371.2731469178213,
  449.99543202027627,
  459.75381154013763,
  572.8776051989124,
  482.61800274379243,
  508.73482912056147,
  536.8693945922307,
  453.1908482621634,
  552.1261493232644,
  665.3755238314285,
  566.4562968828147,
  535.9945658681005,
  545.8955737188865,
  617.7480609010947,
  410.88227984897287,
  412.22892502597676,
  422.7992654656678,
  531.7634655694063,
  621.9448563237877,
  577.718049546799,
  565.2017415472918,
  496.88593394086945,
  541.983906306913,
  488.23490346463393,
  459.87883935778086,
  339.8335926162126,
  478.40064952057895,
  391.76133712318625,
  459.8872720393377,
  529.0352283475995,
  601.0968756087464,
  387.3977926490302,
  438.45963562323095,
  568.4999384207057,
  433.705014187734,
  532.7563484265695,
  688.3250225592172,
  560.5141695970358,
  618.8573892679701,
  739.752376038503,
  545.5833450604074,
  412.8789536158654,
  505.621567908797,
  430.34643059099767,
  530.8939378791066,
  364.5504683204466,
  263.56430950761774,
  400.0270971474176,
  557.2554666860248,
  512.2243276064373,
  476.5552327624397,
  522.594025994344,
  576.3283392549775,
  627.3135969456392,
  582.1919514161511,
  581.7872573729915,
  495.020936550605,
  385.4530964162217,
  408.95772708252616,
  567.0059664451333,
  408.3575709180497,
  401.2301523447442,
  602.3873753615022,
  487.7312440470522,
  491.99650239106404,
  446.70448492603765,
  426.60250312657456,
  506.97848480592165,
  547.1335434494748,
  584.9512699658972,
  551.1802941509028,
  434.9197361028757,
  512.5872873520613,
  385.5603996724101,
  372.85406119792606,
  625.4002175669368,
  444.77801952543894,
  356.435905765072,
  447.1751194120912,
  555.600707863532,
  423.0494050753579,
  372.6704561224963,
  665.0158912619382,
  525.8523421883659,
  287.2051978908102,
  515.5554643496027,
  467.20668768405164,
  556.539851945065,
  517.2599281548876,
  552.0888256189454,
  485.52895191044337,
  613.3751216002165,
  550.699828339399,
  308.49766403469306,
  437.6765557828029,
  450.4085921495353,
  475.3121138357504,
  650.6132912435692,
  465.5111361556736,
  353.23007545737727,
  517.8143545305002,
  413.7489824701702,
  464.3714127897989,
  383.05514468737437,
  436.9260990455966,
  472.908282749285,
  401.8658851959819,
  499.04916783057934,
  549.0796838614981,
  491.8275195669287,
  438.49722603644466,
  536.5933878933708,
  497.43467285692395,
  499.9990580753682,
  376.0729032895604,
  588.7189600444827,
  524.1768075178311,
  433.24093310501166,
  346.25474724978125,
  402.98828672705736,
  509.1178899155887,
  490.227883193485,
  411.5978217015379,
  592.1368578093978,
  486.08230595645443,
  549.89772885203,
  579.3252973902016,
  299.2506585760254,
  477.4947054007493,
  403.6694539754767,
  472.66240083778433,
  605.9721955966501,
  268.3201926298294,
  527.4411176550096,
  338.8862158965214,
  454.43791255183237,
  637.8314243797407,
  586.583598006631,
  488.78790912567183,
  518.6161748610193,
  406.7140633822008,
  625.7361625827458,
  435.9475991150382,
  474.5391644340693,
  653.9805150756899,
  513.0651859220022,
  568.7926816367936,
  710.7411226541213,
  396.7862822325406,
  598.4656171426166,
  273.29231813641366,
  463.23333314327203,
  480.28952320940573,
  506.4073471241982,
  465.45855058459773,
  457.24757928528044,
  467.37066050016665,
  275.34810941535085,
  427.9710851004489,
  571.1049494779116,
  424.8753835030711,
  506.03718526925314,
  539.4734737863149,
  405.50567595430107,
  518.2360135697794,
  723.4694918413326,
  504.6837368058824,
  486.9116570590676,
  477.61477991871334,
  603.1441962776972,
  490.051658137745,
  580.0232098452249,
  470.327750631319,
  448.89537497849227,
  447.9653493960378,
  455.6694476818247,
  394.32693653038433,
  473.402268979179,
  529.8057911915163,
  533.7107459582002,
  437.61717216330715,
  539.2711140026884,
  434.0897098132917,
  506.2181835249111,
  483.2365275870391,
  471.6391627186325,
  653.3432117089683,
  491.1005531632272,
  502.63124246593037,
  693.9607128555558,
  568.2167609526646,
  381.320918271426,
  524.9300570672569,
  662.0719665630915,
  439.33754171070854,
  549.5476457704758,
  372.8375730527222,
  535.7372652410598,
  571.9662538507995,
  602.8718623737949,
  435.6256497170857,
  549.214892642393,
  499.74855971102573,
  604.5784513169478,
  604.3128852926872,
  438.1647975819696,
  548.9547349963067,
  556.6001139270257,
  538.5641160238526,
  314.8636152377619,
  562.6261992978933,
  492.1133301245761,
  505.2957423394512,
  718.2160642188087,
  551.4417682477788,
  431.0266023383829,
  535.238993293086,
  378.8798152110905,
  710.6100395838426,
  569.8987160156822,
  497.07981340354894,
  367.5292667938148,
  546.6880178457772,
  339.67985033788585,
  483.4052553281355,
  443.4441741916798,
  254.6396550367329,
  416.06112749183353,
  583.8518548179208,
  587.9182489078233,
  434.7479327395391,
  394.3681124562722,
  627.8697510125273,
  506.6232281186749,
  493.49738332781146,
  377.9578486797144,
  532.7789208175245,
  518.5598247881082,
  384.2111614923321,
  481.6497353341487,
  674.638591223395,
  366.10594096844744,
  544.1219841209165,
  379.1757006301546,
  484.2421204103021,
  439.311574612979,
  594.4218757179436,
  418.94669429302724,
  612.4564036493812,
  594.4288797976114,
  475.81495253426596,
  544.0306723713716,
  433.2801937744991,
  580.4432705330894,
  497.37593208113213,
  390.1829829846354,
  620.7619216900761,
  580.5462288589166,
  385.90108143893497,
  455.7794045442681,
  374.09278064903134,
  448.8152341858479,
  291.9005192242845,
  656.3110659400662,
  500.3227244786895,
  454.2013829126623,
  444.6854534500956,
  495.029462564999,
  427.925949725157,
  396.8596953136022,
  516.6946259865547,
  504.58640225729687,
  589.4281092051707,
  640.1226476890555,
  729.9381737871736,
  741.5551645107815,
  390.55831732716064,
  604.2462955469989,
  582.8238883167767,
  566.3036355579271,
  506.8520290260343,
  468.23893033020886,
  603.68905787578,
  572.3179192591095,
  344.9664224117783,
  605.9199809610188,
  302.04146240665585,
  435.207262235583,
  344.9226957915255,
  531.7580373867254,
  572.3114662755723,
  540.1366842686491,
  437.82091543547307,
  584.1852131833639,
  604.9018112591637,
  527.9009125189084,
  365.9491700991241,
  172.6804096141694,
  471.7500383507934,
  252.44078262609432,
  525.7636536232154,
  470.1139292431292,
  584.4504821321632,
  428.75964893247914,
  359.592424895021,
  542.8345984768931,
  476.30203002678485,
  722.7096094423363,
  506.4041410360173,
  637.1956714934979,
  440.0095288208237,
  637.9560241342853,
  391.3478856937731,
  557.2375519590935,
  502.67146281221585,
  548.1542597423983,
  482.5954301422962,
  602.3143295109323,
  347.8176193768245,
  574.0102209804952,
  565.2786479678128,
  474.97447743394736,
  349.6098431889322,
  629.8752149480813,
  576.4845808188775,
  435.83696128272453,
  513.2047223925073,
  382.37363944768157,
  512.3599038530647,
  392.8783604933719,
  438.2130579754669,
  422.11854933603945,
  467.8322785050192,
  617.4042438096512,
  478.56390185241526,
  276.1051830015965,
  454.7226322055433,
  432.267273394725,
  665.7780248732832,
  652.8785043771057,
  326.5468865269914,
  611.2459511329203,
  372.88582973141035,
  571.0010061326917,
  470.65957035719384,
  324.8570313758894,
  531.4694603848064,
  381.7108259677017,
  423.8340404562491,
  429.69779171553347,
  487.42121392887486,
  558.3489320475794,
  344.4905858148467,
  452.24844182672143,
  562.4265651938149,
  381.9008719880039,
  468.9878031787449,
  635.2617733535998,
  615.9086823958872,
  672.5016035589475,
  468.11447628812437,
  511.91105687563663,
  665.2267915706088,
  688.5857653336941,
  537.4485662593381,
  510.32766374139936,
  729.5058653528852,
  432.4385647086487,
  534.2617341749999,
  612.076588048456,
  542.9611414814199,
  517.79296483825,
  437.34434043263826,
  520.109313255966,
  553.4531105991047,
  340.52067472475426,
  526.8467761634977,
  709.7583507198744,
  487.4855226387573,
  428.6808008690347,
  435.11804104152833,
  407.33533471227446,
  445.80984981747065,
  585.7828975248677,
  471.6041775351538,
  481.9039917703018,
  667.5284880724867,
  394.9325886389122,
  450.81385110790524,
  346.49269289750544,
  643.0841672775662,
  494.371741470161,
  364.4813873761504,
  472.3772922846367,
  368.9296283492918,
  719.8294663297096,
  431.82574223282353,
  494.7270340015192,
  507.01382703567367,
  569.4686386520825,
  458.28754114946236,
  358.30732591173387,
  568.024191041105,
  590.9838381320087,
  451.5282592866374,
  475.7684006254681,
  586.433171005624,
  430.0223143014377,
  396.1305905229816,
  626.5021585259786,
  527.2316080414553,
  421.30597690429505,
  465.5613988119686,
  501.3316085477359,
  609.305488992419,
  321.4223444790555,
  456.39156427839646,
  633.8815292652973,
  493.87500833977595,
  617.3715033979369,
  317.64589210298146,
  462.3906525489184,
  423.50624200958964,
  550.291049816171,
  646.0582466681033,
  396.4288194421605,
  472.0809128117781,
  581.3443087315496,
  580.2792109480409,
  455.8946365862153,
  683.6257773608185,
  636.0227104192949,
  571.2915167158155,
  404.564159869905,
  417.34996686672866,
  371.84892103209665,
  500.2673253009639,
  437.902514009875,
  485.0548301285316,
  522.5671845884501,
  382.19441513482263,
  406.97515992714744,
  642.9033796282922,
  523.5251084674178,
  524.8424313659659,
  572.7163332797872,
  434.34682098119316,
  603.2011553133104,
  617.0526382543602,
  487.60287232341057,
  548.7024791558123,
  578.8090965802971,
  468.5046052699611,
  534.3870159466375,
  498.7627925120741,
  398.3024540365461,
  643.575133698083,
  506.23959173619016,
  568.8868834819361,
  479.85903849593785,
  486.1027242582518,
  445.0030427856566,
  667.0083551385923,
  506.33783595704216,
  476.8759550150446,
  607.0931801901395,
  411.67508401265496,
  529.2644706852187,
  651.3290284093393,
  295.1809819495639,
  275.50031469548605,
  562.5470723960078,
  350.23154892946457,
  603.4815125806721,
  438.247881989431,
  433.9846694185947,
  627.8209928290808,
  448.6521795059881,
  576.320980767552,
  506.03053582373235,
  489.88870261969697,
  515.2336044645801,
  588.2946511099343,
  472.54322093530345,
  295.652493189244,
  515.0924101452301,
  600.3108297290993,
  670.1940038880012,
  468.9246901500857,
  674.7989703895522,
  541.0532910396815,
  626.4217986199192,
  728.7237659950931,
  340.40351450475725,
  442.50221320076366,
  626.6378921155715,
  702.9084253922309,
  571.5973816533055,
  564.8592361248418,
  549.2661497464056,
  399.91879112988624,
  607.9757618678248,
  467.3897443685401,
  488.34198201013197,
  462.8063884618404,
  379.4024422748968,
  395.43040135147476,
  528.6967023835576,
  504.92604843030574,
  518.4840539229241,
  595.2056404812673,
  611.0590937568055,
  613.6676496023937,
  364.7670768111244,
  532.4557860926305,
  634.1147355047257,
  566.1118849924108,
  434.9852865728152,
  386.6008410730961,
  367.5728653398918,
  442.04161294520725,
  432.49942095600653,
  459.0053446504661,
  577.7762061510457,
  329.5407234239868,
  563.6524524099349,
  406.9352407332476,
  614.4971467221934,
  421.71892214625706,
  463.4812044313586,
  505.3624897788286,
  459.342482866968,
  324.34159684663945,
  489.71258830582457,
  537.5479517840928,
  392.3099692366878,
  426.5416850245874,
  404.48102794232915,
  596.9840793490897,
  467.17227649492924,
  394.04842877921885,
  466.75942735425235,
  527.0473928993413,
  533.4428028043471,
  682.0475733664238,
  515.7538446753468,
  591.7641201917708,
  512.4750680403415,
  522.7587002980192,
  514.773516464708,
  331.03844954450796,
  403.8276647448946,
  574.9380694946441,
  502.1442951057249,
  505.121924162098,
  546.3414419549725,
  530.1501037053225,
  612.0360284033161,
  622.1716280718916,
  574.0864863679355,
  560.7267445704778,
  558.1817376454244,
  411.37645698289083,
  722.9179547262609,
  405.3357571023242,
  403.98397996911586,
  505.1488268191134,
  605.1860536292357,
  528.12536250163,
  425.0196566391214,
  528.3966918571383,
  470.0616994280159,
  536.0796419366876,
  637.3564268592862,
  400.4387935716908
];

test("s5", function (t) {
  t.test('should return correct breaks for the test data', function (t) {
    const breaks = statsbreaks.breaks(X, { method: 's5' });
    t.same(breaks, [172.68, 404.1, 452.34, 548.84, 597.08, 823.82]);
    t.end();
  });

  t.throws(function() {
      const breaks = statsbreaks.breaks([1, 2, 3], { method: 's5' });
    },
    new statsbreaks.TooFewValuesError('Too few values for the given number of breaks'),
    'should throw error if the number of classes is too high',
  );
  t.end();
});

test("S5Classifier", function (t) {
  t.test('should return correct breaks for the test data', function (t) {
    const d = new statsbreaks.S5Classifier(X);
    const breaks = d.classify();
    t.same(breaks, [172.68, 404.1, 452.34, 548.84, 597.08, 823.82]);
    t.end();
  });

  t.test('should return correct count by class for the test data', function (t) {
    const d = new statsbreaks.S5Classifier(X);
    const breaks = d.classify();
    const count = d.countByClass()
    t.same(count, [188, 163, 398, 165, 186]);
    t.end();
  });

  t.throws(function() {
      const d = new statsbreaks.S5Classifier([1, 2, 3]);
      const breaks = d.classify();
    },
    new statsbreaks.TooFewValuesError('Too few values for the given number of breaks'),
    'should throw error if the number of classes is too high',
  );

  t.end();
});