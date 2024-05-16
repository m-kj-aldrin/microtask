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
    /**@type {Set<OperatorSufix>} */
    #validOperatorTypes = new Set(["pth", "pth"]);

    /**
     * @param {string} typeString
     * @returns {OperatorSufix}
     */
    #validType(typeString) {
        return this.#validOperatorTypes.has(typeString) ? typeString : "pth";
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

    get parent() {
        return this.closest("com-chain");
    }
    get index() {
        return ComBaseElement.indexOf(
            this.parent.querySelectorAll("com-module"),
            this
        );
    }

    #deferedType = false;

    /**@type {OperatorSufix} */
    #type = "pth";

    /**@type {OperatorTypes} */
    #operator = null;

    /**
     * @template {OperatorSufix} T
     * @param {T} type
     * @param {object} [o]
     * @param {boolean} [o.signal]
     * @param {OperatorType['parameters']} [o.parameters]
     * @returns {ComModuleElement<OperatorElementTagNameMap[`com-op-${T}`]>}
     */
    setOperatorType(type, { signal, parameters } = {}) {
        if (!this.isConnected) {
            // console.log("setOperatorType: DEFER");
            this.#type = type;
            this.#deferedType = true;
            if (parameters) {
                this.#deferedParameterValues = parameters;
            } else {
                this.#deferedParameterValues = [];
            }
            if (signal) {
                this.#deferedSignal = "insert";
            } else {
                this.#deferedSignal = null;
            }
            return this;
        }

        this.#type = type;
        this.#deferedType = false;

        // console.log("\tsetOperatorType: START");

        if (this.#operator) {
            signal && this.signal("remove");
            this.#operator.remove();
        }

        const operator = document.createElement(`com-op-${type}`);
        this.#operator = operator;

        // this.appendChild(operator);
        this.shadowRoot.appendChild(operator);

        if (parameters) {
            this.#operator.parameters = parameters;
        }

        signal && this.signal("insert");

        // console.log("\tsetOperatorType: END");

        return this;
    }

    /**@type {number[]} */
    #deferedParameterValues = [];

    /**
     * @param {OperatorType['parameters']} values
     * @param {object} [o]
     * @param {boolean} [o.signalParameters]
     */
    setOperatorParameters(
        values,
        { signalParameters = false } = { signalParameters: false }
    ) {
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
                signalString = `module -c ${cidx} -r ${midx}`;
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
