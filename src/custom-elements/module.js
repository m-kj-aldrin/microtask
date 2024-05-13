import { ComBaseElement } from "./base.js";

const comModuleTemplate = document.createElement("template");
comModuleTemplate.innerHTML = `
<slot></slot>
`;

/**
 * @template {OperatorTypes} OperatorType
 */
export class ComModuleElement extends ComBaseElement {
    constructor() {
        super();
        // console.log("module constructing: START");

        this.shadowRoot.append(comModuleTemplate.content.cloneNode(true));

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

    /**@param {OperatorType['inputs']} values */
    setOperatorParameters(values) {
        if (!this.#operator) {
            this.#deferedParameterValues = values;
            return this;
        }

        this.#deferedParameterValues = [];

        // console.log("\t\t\tsetOperatorParameters: START");

        this.#operator.inputs = values;

        // console.log("\t\t\tsetOperatorParameters: END");

        return this;
    }

    /**@type {"insert" | "append" | "remove"} */
    #deferedSignal = null;

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

        this.#deferedSignal = null;

        let signalString = "";

        switch (type) {
            case "append":
                signalString = `module -c ${0} -a ${0} ${this.#type}`;
                this.#connectedToIntercom = true;
                break;
            case "insert":
                signalString = `module -c ${0} -i ${0} ${this.#type} ${
                    this.#operator.inputs
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

    connectedCallback() {
        // console.log("module connected: START");

        // const operator = document.createElement("com-op-lfo");
        // this.appendChild(operator);

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
