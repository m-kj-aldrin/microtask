import { ComChainElement } from "./custom-elements/chain";
import { InputNumberElement } from "./custom-elements/inputs/number";
import { ComModuleElement } from "./custom-elements/module";
import { ComNetworkElement } from "./custom-elements/network";
import { LfoOperatorElement } from "./custom-elements/operators/lfo";
import { PthOperatorElement } from "./custom-elements/operators/pth";

type RemoveBase<T extends `com-op-${string}`> = T extends `com-op-${infer U}`
  ? U
  : never;

declare global {
  interface OperatorElementTagNameMap {
    "com-op-pth": PthOperatorElement;
    "com-op-lfo": LfoOperatorElement;
  }

  type OperatorTypeNames = keyof OperatorElementTagNameMap;
  type OperatorTypes = OperatorElementTagNameMap[OperatorTypeNames];

  type OperatorSufix = RemoveBase<OperatorTypeNames>;

  interface ModuleTypeAttributeMap {
    "com-module[type='pth']": ComModuleElement<PthOperatorElement>;
    "com-module[type='lfo']": ComModuleElement<LfoOperatorElement>;
  }

  type AllModuleTypes = ModuleTypeAttributeMap[keyof ModuleTypeAttributeMap];

  interface ComElementTagNameMap {
    "com-network": ComNetworkElement;
    "com-chain": ComChainElement;
    "com-module": ComModuleElement<PthOperatorElement>;
  }

  interface InputElementTagNameMap {
    "input-number": InputNumberElement;
  }

  interface HTMLElementTagNameMap
    extends ComElementTagNameMap,
      OperatorElementTagNameMap,
      InputElementTagNameMap {}

  // interface ExtendedSelector {
  //     [key: `com-chain:nth-child(${string})`]: ComChainElement;
  //     [
  //         key: `com-chain:nth-child(${string}) com-module:nth-child(${string})`
  //     ]: ComModuleElement<PthOperatorElement>;
  //     [
  //         key: `com-chain:nth-child(${string}) com-module:nth-child(${string}) input-number:nth-child(${string})`
  //     ]: InputNumberElement;
  // }

  interface ParentNode {
    querySelector(
      selector: `com-chain:nth-child(${string}) com-module:nth-child(${string}) input-number:nth-child(${string})`
    ): InputNumberElement | null;

    querySelector(
      selector: `com-chain:nth-child(${string}) com-module:nth-child(${string})`
    ): ComModuleElement<AllModuleTypes> | null;

    querySelector(
      selector: `com-module:nth-child(${string})`
    ): ComModuleElement<AllModuleTypes> | null;
 

    querySelector(
      selector: `com-chain:nth-child(${string})`
    ): ComChainElement | null;

    querySelectorAll(
      selector: `com-chain:nth-child(${string}) com-module:nth-child(${string}) input-number`
    ): NodeListOf<InputNumberElement>;

    querySelectorAll(
      selector: `com-chain:nth-child(${string}) com-module`
    ): NodeListOf<AllModuleTypes>;

    querySelectorAll(selector: `com-chain`): NodeListOf<ComChainElement>;
  }

//   interface ComChainElement extends ComChainElement{
//     querySelector(
//       selector: `com-module:nth-child(${string})`
//     ): ComModuleElement<AllModuleTypes> | null;
//   }
}

export {};
