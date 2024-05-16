import { ComBaseElement } from "./base.js";

const PID_ENUM = {
    dac: 1,
    adc: 2,
    dout: 3,
    din: 4,
    MIDI_1: 5,
    MIDI_2: 6,
    MIDI_3: 7,
    MIDI_DEV: 8,
    MIDI_HOST: 9,
    I2C_1: 10,
    I2C_2: 11,
    osc: 12,
    none: 13,
};

/**@type {ComOutElement[]} */
const OUTS_ARRAY = [];

const comOutTemplate = document.createElement("template");
comOutTemplate.innerHTML = `
<select id="cv-pid">
    ${Object.keys(PID_ENUM)
        .map((key) => `<option>${key}</option>`)
        .join("\n")}
</select>
<select id="cv-ch">
        ${[...Array(16)].map((_, i) => `<option>${i}</option>`).join("\n")}
</select>
<select id="gt-pid">
    ${Object.keys(PID_ENUM)
        .map((key) => `<option>${key}</option>`)
        .join("\n")}
</select>
<select id="gt-ch">
        ${[...Array(16)].map((_, i) => `<option>${i}</option>`).join("\n")}
</select>
`;

/**@typedef {keyof typeof PID_ENUM} PidNames */

export class ComOutElement extends ComBaseElement {
    constructor() {
        super();

        // this.attachShadow({ mode: "open" });

        this.shadowRoot.append(comOutTemplate.content.cloneNode(true));
    }

    /**@type {PidNames} */
    #cv_pid = null;
    /**@type {number} */
    #cv_ch = null;
    /**@type {PidNames} */
    #gt_pid = null;
    /**@type {number} */
    #gt_ch = null;

    get parent() {
        return this.closest("com-module");
    }

    signal(){}

    connectedCallback() {
        console.log(this.parent.isConnectedToIntercom);
    }
    disconnectedCallback() {}
}
