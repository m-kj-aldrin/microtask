// const network = document.createElement("com-network");

// document.body.innerHTML = `
// <com-network>
//     <com-chain signal>
//         <com-module signal type="lfo" parameters=",,0.1"></com-module>
//         <com-module signal type="lfo" parameters="100,200,300"></com-module>
//         <com-module signal type="pth"></com-module>
//     </com-chain>
//     <com-chain signal>
//         <com-module signal type="lfo" parameters="999,999,999"></com-module>
//         <com-module signal type="lfo" parameters="100,200,300"></com-module>
//         <com-module signal type="pth"></com-module>
//     </com-chain>
// </com-network>
// `;

// console.log("\n");

// setTimeout(() => {
//     document
//         .querySelector("com-chain:nth-child(2) com-module:nth-child(2)")
//         .signal("remove")
//         .remove();

//     setTimeout(() => {
//         document
//             .querySelector("com-chain:nth-child(1)")
//             .signal("remove")
//             .remove();
//     }, 500);
// }, 500);

// const network = document.querySelector("com-network");

// setTimeout(() => {
//     console.log("\n");

//     const chain0 = document.createElement("com-chain");

//     const module00 = document
//         .createElement("com-module")
//         .setOperatorType("lfo")
//         .setOperatorParameters([1, 2, 3])
//         .signal("insert");

//     const module01 = document
//         .createElement("com-module")
//         .setOperatorType("lfo")
//         .signal("insert");

//     document.body.append(network);

//     network.append(chain0);

//     chain0.append(module00, module01);

//     chain0.signal("new");

//     setTimeout(() => {
//         console.log("\n");
//         chain0
//             .querySelector("com-module:nth-child(2)")
//             .setOperatorParameters([0, , 0], true);
//     }, 1000);
// }, 2000);

////// -----

const network = document.createElement("com-network");

const chain0 = document.createElement("com-chain").signal("new");

const module00 = document
    .createElement("com-module")
    .setOperatorType("lfo", { signal: true, parameters: [123123, , 1000] });

const out00 = document.createElement("com-out");

module00.appendChild(out00);

document.body.appendChild(network);
network.appendChild(chain0);
chain0.append(module00);

// setTimeout(() => {
//     module00.setOperatorType("lfo", { signal: true, parameters: [1, 2, 3] });
//     setTimeout(() => {
//         module00.setOperatorParameters([500, 400, 300], {
//             signalParameters: true,
//         });
//     }, 100);
// }, 100);

// const lfo = document.createElement("com-op-lfo");

// document.body.appendChild(lfo);

// lfo.parameters = [12];
// console.log(lfo.parameters);

// lfo.setParameterValue(1000, 0, { signal: true });

// setTimeout(() => {
//    lfo.signalParameterByIndex(0)
// }, 100);
