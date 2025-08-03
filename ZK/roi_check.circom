pragma circom 2.0.0;

include "circomlib/circuits/comparators.circom";

template ROICheck() {
    signal input roi;      // ROI * 100 (e.g., 1025 = 10.25%)
    signal output isValid; // 1 if ROI >= 10%

    component gte = GreaterEqThan(16); // 16-bit comparator

    gte.in[0] <== roi;
    gte.in[1] <== 1000; // 10.00%

    isValid <== gte.out;
}

component main = ROICheck();
