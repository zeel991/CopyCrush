// src/types/snarkjs.d.ts
declare module "../../zk/roi_check/roi_check_js/witness_calculator.js" {
    interface WitnessCalculator {
      calculateWitness(input: any, sanityCheck: boolean): Promise<any>;
      calculateWTNSBin(input: any, sanityCheck: boolean): Promise<Uint8Array>;
    }
  
    function witnessCalculatorBuilder(wasmBuffer: ArrayBuffer): Promise<WitnessCalculator>;
  
    export default witnessCalculatorBuilder;
  }
  