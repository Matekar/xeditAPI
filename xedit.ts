/// <reference lib="dom" />

import { XPathResult } from "xpath";

export interface XML {
  parser: DOMParser;
  serializer: XMLSerializer;
  document: XMLDocument;
}

export module XML {
  /**
   * serialize XMLDocument from root node
   * @param xmlp XMLProcessor
   * @param root root Node to be serialized
   * @returns serialized XMLDocument from root node
   */
  export const serialize = (xmlp: XML, root: Node = xmlp.document) => {
    return xmlp.serializer.serializeToString(root);
  };

  /**
   * find single node using XPath
   * @param document XMLDocument to be searched
   * @param path XPath string
   * @returns found Node
   */
  export const findNodeByPath = (xdoc: XMLDocument, path: string) => {
    return document.evaluate(
      path,
      xdoc,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE
    ).singleNodeValue;
  };

  /**
   * find nodes using XPath
   * @param document XMLDocument to be searched
   * @param path XPath string
   * @returns Array of Node
   */
  export const findNodesByPath = (xdoc: XMLDocument, path: string) => {
    const resultArray: Node[] = [];
    const result = document.evaluate(
      path,
      xdoc,
      null,
      XPathResult.ORDERED_NODE_ITERATOR_TYPE,
      null
    );

    let currentNode: Node | null = result.iterateNext();
    while (currentNode) {
      resultArray.push(currentNode);
      currentNode = result.iterateNext();
    }

    return resultArray;
  };

  /**
   * find nodes using querySelectorAll
   * @param root root to begin with
   * @param node name of node to search
   * @param attribute attribute name to search
   * @param value attribute value to search
   * @returns Array of nodes
   */
  export const findNodesByAttribute = (
    root: Element,
    node: string,
    attribute: string,
    value: string
  ) => {
    return Array.from(
      root.querySelectorAll(`${node}[${attribute}='${value}']`)
    );
  };

  /**
   * append new Node of name to parent
   * @param xdoc XMLDocument used to create element
   * @param parent paren of new Node
   * @param name name to be given for new Node
   */
  export const createNode = (xdoc: XMLDocument, parent: Node, name: string) => {
    parent.appendChild(xdoc.createElement(name));
  };

  /**
   * delete given Node
   * @param node Node to be deleted
   */
  export const deleteNode = (node: Node) => {
    node.parentNode?.removeChild(node);
  };

  /**
   * delete given Nodes
   * @param nodes array of Node
   */
  export const deleteNodes = (nodes: Node[]) => {
    for (let node of nodes) {
      node.parentNode?.removeChild(node);
    }
  };

  /**
   * modify text of given Node
   * @param node Node to be modified
   * @param newText new text to be applied
   */
  export const modifyNodeText = (node: Node, newText: string) => {
    node.textContent = newText;
  };

  /**
   * modify text of given Nodes
   * @param nodesIterable array of Node
   * @param newText new text to be applied
   */
  export const modifyNodesText = (nodes: Node[], newText: string) => {
    for (let node of nodes) {
      modifyNodeText(node, newText);
    }
  };

  /**
   * modify attribute value of given Node
   * @param node Node to be modified
   * @param attribute name of attribute to be modified
   * @param newValue new value to be set
   */
  export const modifyNodeAttribute = (
    node: Element,
    attribute: string,
    newValue: string
  ) => {
    node.setAttribute(attribute, newValue);
  };

  /**
   * modify attribute value of given Nodes
   * @param nodes Array of Node to be modified
   * @param attribute name of attribute to be modified
   * @param newValue new value to be set
   */
  export const modifyNodesAttribute = (
    nodes: Element[],
    attribute: string,
    newValue: string
  ) => {
    for (let node of nodes) {
      modifyNodeAttribute(node, attribute, newValue);
    }
  };

  /**
   * remove attribute from given Node
   * @param node Node to be modified
   * @param attribute attribute to be removed
   */
  export const removeNodeAttribute = (node: Element, attribute: string) => {
    node.removeAttribute(attribute);
  };
}
