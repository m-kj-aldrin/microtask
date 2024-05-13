import { ComChainElement } from "./chain.js";
import { ComModuleElement } from "./module.js";
import { ComNetworkElement } from "./network.js";
import { PthOperatorElement } from "./operators/pth.js";
import { LfoOperatorElement } from "./operators/lfo.js";
import { InputNumberElement } from "./inputs/number.js";

customElements.define("com-network", ComNetworkElement);
customElements.define("com-chain", ComChainElement);
customElements.define("com-module", ComModuleElement);

customElements.define("com-op-pth", PthOperatorElement);
customElements.define("com-op-lfo", LfoOperatorElement);


customElements.define("input-number",InputNumberElement)