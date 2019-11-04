import MyMermaid from "./my-mermaid";
import GamesApp from "./tags/game-list";
import {
  AddFullStop,
  RemoveDuplicates,
  ClipboardyComp,
  CountLines,
  JsonMerge,
  RecombineComp,
  WIP,
  CsvToSqlInsert
} from "./io-sandboxes";

export const pathponents = [
  { path: "/add-full-stop", text: "Add Full Stop", component: AddFullStop },
  { path: "/rd", text: "Remove duplicates", component: RemoveDuplicates },
  { path: "/cl", text: "Count lines", component: CountLines },
  { path: "/recombine", text: "Recombine", component: RecombineComp },
  {
    path: "/json-merge",
    text: "JSON Merge Patch (RFC 7396)",
    component: JsonMerge
  },
  { path: "/files-diff", text: "Files Diff (WIP)", component: WIP },
  { path: "/mmm", text: "My Mermaid", component: MyMermaid },
  { path: "/csv2sql", text: "CSV to SQL insert", component: CsvToSqlInsert },
  { path: "/games", text: "Games App", component: GamesApp },
  { path: "/clipboardy", text: "Clipboardy", component: ClipboardyComp }
];
