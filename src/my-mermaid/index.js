import IoSandbox from "../io-sandboxes";

const mermaidLineRegex = /(-->)|(-\.->)|((--|-.|==)[\w\s]+?(--|.-|$1)>)/;

class MyMermaid extends IoSandbox {
  process = input => {
    let lines = input.split("\n");

    lines = lines.map(l => {
      if (!l.includes("-->")) return l;
      let toks = l.split("-->") || l;
      return joinInPairs(toks, "-->").join("\n");
    });

    lines = lines.map(l => {
      if (!l.includes("-->") || !l.includes(",")) return l;
      let [_, froms, to] = l.match(/([\w\s,]+)-->([\w\s]+)/);
      if (!froms || !to) return l;
      return froms
        .split(",")
        .filter(f => f)
        .map(f => `${f} --> ${to}`)
        .join("\n");
    });

    return lines.join("\n");
  };
}

// ["a","b","c", "d"] => ["ab", "bc", "cd"]
// https://stackoverflow.com/a/58447686/3399416
const joinInPairs = (arr, sep = "") => {
  return new Array(arr.length - 1)
    .fill("")
    .map((v, i) => arr[i] + sep + arr[i + 1]);
};

export default MyMermaid;
