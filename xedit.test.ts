/// <reference lib="dom" />

import { expect, test } from "bun:test";
import { XML } from "./xedit";
import { DOMParser, XMLSerializer } from "xmldom";

const xmlString = `
  <library>
    <book id="1">
      <title>Book 1</title>
    </book>
    <book id="2">
      <title>Book 2</title>
    </book>
  </library>
`;

const xml: XML = {
  parser: new DOMParser(),
  serializer: new XMLSerializer(),
  document: new XMLDocument(),
};

xml.document = xml.parser.parseFromString(xmlString, "text/xml");

test("document name", () => {
  expect(xml.document.nodeName).toBe("#document");
});

test("find nodes", () => {
  expect(XML.findNodesByPath(xml.document, "//library/book").length).toBe(2);
});

test("find node", () => {
  expect(
    XML.findNodeByPath(xml.document, "//library/book[1]/title")?.textContent
  ).toBe("Book 1");
});

test("delete node", () => {
  XML.deleteNode(XML.findNodeByPath(xml.document, "//library/book")!);
  expect(XML.findNodesByPath(xml.document, "//library/book").length).toBe(1);
});

test("modify text", () => {
  expect(
    XML.findNodeByPath(xml.document, "//library/book[1]/title")!.textContent
  ).toBe("Book 2");
  XML.modifyNodeText(
    XML.findNodeByPath(xml.document, "//library/book[1]/title")!,
    "Modify Test"
  );
  expect(
    XML.findNodeByPath(xml.document, "//library/book[1]/title")!.textContent
  ).toBe("Modify Test");
});

test("modify attribute", () => {
  XML.modifyNodeAttribute(
    <Element>XML.findNodeByPath(xml.document, "//library/book[1]")!,
    "id",
    "42"
  );
  expect(
    (<Element>(
      XML.findNodeByPath(xml.document, "//library/book[1]")!
    )).getAttribute("id")
  ).toBe("42");
});

test("create node", () => {
  XML.createNode(
    xml.document,
    <Element>XML.findNodeByPath(xml.document, "//library[1]")!,
    "book"
  );
  console.log(XML.serialize(xml));
  expect(XML.findNodesByPath(xml.document, "//library/book").length).toBe(2);
});
