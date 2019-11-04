import IoSandbox from "./IoSandbox";
const mergePatch = require("tiny-merge-patch").apply;

const WIP = () => <p>WIP!</p>;

export class AddFullStop extends IoSandbox {
  process = input => input + ".";
  testInputs = ["phrase with(out) full stop", "trailing dots..."];
}

export class CsvToSqlInsert extends IoSandbox {
  process = input => {
    let lines = input.split("\n");
    let first = `INSERT INTO table(${lines[0]}) VALUES\n`;
    lines.shift();
    return (
      `INSERT INTO table(${first}) VALUES\n` +
      lines.map(l => `(${l.replace("\n", "")}),\n`)
    );
  };
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

export class RemoveDuplicates extends IoSandbox {
  process = input =>
    input
      .split("\n")
      .filter(onlyUnique)
      .join("\n");
}

const recombine = (array, sep = ",") =>
  array.flatMap((v, i) => array.slice(i + 1).map(w => v + sep + w));

export class RecombineComp extends IoSandbox {
  process = input => recombine(input.split("\n")).join("\n");

  testPairs = [
    [
      "banana\nchocolate\npeanut-butter",
      "banana,chocolate\nbanana,peanut-butter\nchocolate,peanut-butter"
    ]
  ];
}

export class JsonMerge extends IoSandbox {
  process = input => {
    let [file, patch] = input
      .split("%")
      .map(str => str.trim())
      .map(str => JSON.parse(str));
    return JSON.stringify(mergePatch(file, patch));
  };

  testPairs = [['{"a": "b"} % {"a": "c"}']];
}

export class ClipboardyComp extends IoSandbox {
  process = input => {
    Clipboardy.writeSync("something");
    return input;
  };
}

export class CountLines extends IoSandbox {
  process = input => {
    return input.split("\n").length;
  };
}
