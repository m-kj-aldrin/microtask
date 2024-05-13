const network = document.createElement("com-network");

document.body.append(network);

const chain0 = document.createElement("com-chain");

network.append(chain0);

const module00 = document
    .createElement("com-module")
    .setOperatorType("lfo")
    .setOperatorParameters([1, 2, 3])
    .signal("insert");

const module01 = document
    .createElement("com-module")
    .setOperatorType("lfo")
    .signal("insert");

chain0.append(module00, module01);

let chain0Modules = document.querySelectorAll(
    `com-chain:nth-child(${1}) com-module`
);


chain0Modules.forEach((module) => {
    console.log(module);
    module.signal("insert")
});
