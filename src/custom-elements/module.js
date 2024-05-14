import { ComBaseElement } from "./base.js";
import { ComChainElement } from "./chain.js";

const comModuleTemplate = document.createElement("template");
comModuleTemplate.innerHTML = `
<slot></slot>
`;

/**
 * @template {OperatorTypes} OperatorType
 */
export class ComModuleElement extends ComBaseElement {
  get parentType() {
    return "chain";
  }

  get parent() {
    return this.closest("com-chain");
  }

  /**@type {OperatorSufix[]} */
  #validOperatorTypes = ["pth", "lfo"];

  /**@param {string} typeString */
  #validType(typeString) {
    return this.#validOperatorTypes.find((s) => s == typeString) ?? "pth";
  }

  constructor() {
    super();
    // console.log("module constructing: START");

    this.shadowRoot.append(comModuleTemplate.content.cloneNode(true));

    let typeAttr = this.#validType(this.getAttribute("type"));
    this.setOperatorType(typeAttr);

    let parametersAttr = this.getAttribute("parameters");
    let parameters = parametersAttr
      ?.split(",")
      .map((s) => (/[0-9+]/.test(s) ? +s : null));
    if (parameters?.length) {
      this.setOperatorParameters(parameters);
    }

    if (this.hasAttribute("signal")) {
      this.signal("insert");
    }

    // console.log("module constructing: END");
  }

  #deferedType = false;

  /**@type {OperatorSufix} */
  #type = "pth";

  /**@type {OperatorTypes} */
  #operator = null;

  /**
   * @template {OperatorSufix} T
   * @param {T} type
   * @returns {ComModuleElement<OperatorElementTagNameMap[`com-op-${T}`]>}
   */
  setOperatorType(type) {
    if (!this.isConnected) {
      // console.log("setOperatorType: DEFER");
      this.#type = type;
      this.#deferedType = true;
      return this;
    }

    this.#type = type;
    this.#deferedType = false;

    // console.log("\tsetOperatorType: START");

    const operator = document.createElement(`com-op-${type}`);
    this.#operator = operator;

    this.appendChild(operator);

    // console.log("\tsetOperatorType: END");

    return this;
  }

  /**@type {number[]} */
  #deferedParameterValues = [];

  /**@param {OperatorType['parameters']} values */
  setOperatorParameters(values, signalParameters = false) {
    if (!this.#operator) {
      this.#deferedParameterValues = values;
      return this;
    }

    this.#deferedParameterValues = [];

    // console.log("\t\t\tsetOperatorParameters: START");

    this.#operator.parameters = values;

    if (signalParameters) {
      this.#operator.signalAll();
    }
    // console.log("\t\t\tsetOperatorParameters: END");

    return this;
  }

  /**@type {"insert" | "append" | "remove"} */
  #deferedSignal = null;

  get latentSignal() {
    switch (this.#deferedSignal) {
      case "append":
      case "insert":
      case "remove":
        return true;
      default:
        return false;
    }
  }

  #connectedToIntercom = false;

  /**@param {"insert" | "append" | "remove"} type */
  signal(type) {
    if (!this.#connectedToIntercom && type == "remove") {
      return this;
    }
    if (!this.#operator) {
      this.#deferedSignal = type;
      return this;
    }
    if (!this.#chain?.isConnectedToIntercom) {
      this.#deferedSignal = type;
      return this;
    }

    this.#deferedSignal = null;

    let signalString = "";

    console.log(this.parent.index);
    let cidx = this.parent.index;
    let midx = this.index;

    switch (type) {
      case "append":
        signalString = `module -c ${cidx} -a ${midx} ${this.#type}`;
        this.#connectedToIntercom = true;
        break;
      case "insert":
        signalString = `module -c ${cidx} -i ${midx} ${this.#type} ${
          this.#operator.parameters
        }`;
        this.#connectedToIntercom = true;
        break;
      case "remove":
        signalString = `module -c ${0} -r ${0}`;
        this.#connectedToIntercom = false;
        break;
      default:
        return this;
    }

    console.log(signalString);

    return this;
  }

  /**@type {ComChainElement} */
  #chain = null;

  connectedCallback() {
    // console.log("module connected: START");

    // const operator = document.createElement("com-op-lfo");
    // this.appendChild(operator);

    const parentChain = this.closest("com-chain");
    this.#chain = parentChain;

    if (this.#deferedType) {
      this.setOperatorType(this.#type);
    }
    if (this.#deferedParameterValues.length) {
      this.setOperatorParameters(this.#deferedParameterValues);
    }
    if (this.#deferedSignal) {
      this.signal(this.#deferedSignal);
    }

    // operator.inputs.forEach((inp) => console.log(inp.value));

    // console.log("module connected: END");
  }
  disconnectedCallback() {}
}
