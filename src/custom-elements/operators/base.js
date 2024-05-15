import { InputBaseElement } from "../inputs/base.js";
import { InputNumberElement } from "../inputs/number.js";

const operatorBaseTemplate = document.createElement("template");
operatorBaseTemplate.innerHTML = `
<style>
    :host{
        display: flex;
        flex-direction: column;
    }
</style>
<slot></slot>
`;

export class OperatorBaseElement extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        this.shadowRoot.append(operatorBaseTemplate.content.cloneNode(true));

        this.#setupListeners();
    }

    #setupListeners() {
        this.addEventListener("input", (e) => {
            if (!(e.target instanceof InputBaseElement)) return;
            this.#signalParameter(e.target);
        });
    }

    get parameters() {
        return [...this.querySelectorAll("input-number")].map(
            (inp) => inp.value
        );
    }

    set parameters(values) {
        console.log(values);
        this.querySelectorAll("input-number").forEach((inp, i) => {
            let index = inp.hasAttribute("order")
                ? +inp.getAttribute("order")
                : i;
            let newValue = values[index];
            if (newValue != undefined) {
                inp.value = newValue;
            }
        });
    }

    /**@returns {InputNumberElement} */
    getParameterByIndex(index = 0) {
        return this.querySelector(`:where(input-number)[order="${index}"]`);
    }

    /**
     * @param {number} value
     * @param {number} index
     * @param {object} o
     * @param {boolean} [o.signal]
     */
    setParameterValue(value, index, { signal = false } = {}) {
        console.log(signal);
        let parameter = this.getParameterByIndex(index);
        if (!parameter) {
            return this;
        }
        parameter.value = value;
        signal && this.#signalParameter(parameter);
        return this;
    }

    /**@param {number} index */
    signalParameterByIndex(index) {
        this.#signalParameter(this.getParameterByIndex(index));
    }

    /**@param {InputBaseElement} parameterElement */
    #signalParameter(parameterElement) {
        let index = parameterElement.getAttribute("order");
        let value = parameterElement.value;
        let signalString = `parameter -c ${0}:${0} -v ${index}:${value}`;

        console.log(signalString);
    }

    signalAll() {
        this.querySelectorAll("input-number").forEach((inp) => {
            this.#signalParameter(inp);
        });
    }

    connectedCallback() {}
    disconnectedCallback() {}
}
