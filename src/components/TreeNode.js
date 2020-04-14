import React, { useState } from "react";
import values from "lodash/values";
import {
  FaFile,
  FaFolder,
  FaFolderOpen,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";
import styled from "styled-components";
import last from "loadsh/last";

const getPaddingLeft = (level, type) => {
  let paddingLeft = level * 20;
  if (type === "file") paddingLeft += 20;
  return paddingLeft;
};

const StyledTreeNode = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 8px;
  padding-left: ${(props) => getPaddingLeft(props.level, props.type)}px;
  &:hover {
    background: lightgray;
  }
`;
const NodeIcon = styled.div`
  font-size: 12px;
  margin-right: ${(props) => (props.marginRight ? props.marginRight : 5)}px;
`;

const onToggle = (node) => {
  // console.log("ontoggle");
  node.isOpen = !node.isOpen;
};

const TreeNode = () => {
  const [nodes, setNodes] = useState([
    {
      id: Math.random(),
      type: "folder",
      isOpen: false,
      isRoot: true,
      children: ["/root/david", "/root/jslancer"],
    },
    {
      id: Math.random(),
      path: "/root/david",
      type: "folder",
      children: ["/root/david/readme.md"],
      isOpen: false,
    },
    {
      id: Math.random(),
      path: "/root/david/readme.md",
      type: "file",
      content: "Thanks for reading me me. But there is nothing here.",
    },
    {
      id: Math.random(),
      path: "/root/jslancer",
      type: "folder",
      children: ["/root/jslancer/projects", "/root/jslancer/vblogs"],
      isOpen: false,
    },
    {
      id: Math.random(),
      path: "/root/jslancer/projects",
      type: "folder",
      children: ["/root/jslancer/projects/treeview"],
      isOpen: false,
    },
    {
      id: Math.random(),
      path: "/root/jslancer/projects/treeview",
      type: "folder",
      children: [],
      isOpen: false,
    },
    {
      id: Math.random(),
      path: "/root/jslancer/vblogs",
      type: "folder",
      children: [],
      isOpen: false,
    },
  ]);
  const getNodeLabel = (node) =>
    node.path ? last(node.path.split("/")) : "root";

  const onNodeSelect = (id) => {
    console.log(id);
    const newArr = [...nodes].map((node) => {
      if (node.id === id) {
        node.isOpen = !node.isOpen;
      }
      return node;
    });
    setNodes(newArr);
  };
  // render child node
  const getChildNodes = (nodes) => {
    nodes.map((node) => {
      if (!node.children) return [];
      return node.children.map((path) => nodes[path]);
    });
  };
  const getRootNodes = (nodes) => {
    return values(nodes).filter((node) => node.isRoot === true);
  };
  console.log(getRootNodes(nodes));
  // end render children node

  return (
    <>
      <StyledTreeNode>
        {nodes.length > 0
          ? nodes.map((node) => (
              <li key={node.id}>
                <NodeIcon onclick={(node) => onToggle(node)}>
                  {node.type === "folder" &&
                    (node.isOpen ? <FaChevronDown /> : <FaChevronRight />)}
                </NodeIcon>
                <NodeIcon marginRight={10}>
                  {node.type === "file" && <FaFile />}
                  {node.type === "folder" && node.isOpen === true && (
                    <FaFolderOpen />
                  )}
                  {node.type === "folder" && !node.isOpen === true && (
                    <FaFolder />
                  )}
                </NodeIcon>
                <span role="button" onClick={(id) => onNodeSelect(node.id)}>
                  {getNodeLabel(node)}
                </span>
              </li>
            ))
          : null}
      </StyledTreeNode>
    </>
  );
};

export default TreeNode;
