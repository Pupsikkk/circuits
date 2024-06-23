import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Xarrow, { Xwrapper, useXarrow } from "react-xarrows";
import { v4 as uuidv4 } from "uuid";
import cl from "./editor.module.css";

import { CircuitItem, ArrowItem } from "../Examples";

import { ImageResource } from "../../common/image.resource";
import { LogicCircuitElement } from "../../logic/interfaces";
import Toolbox from "./toolbox/toolbox";
import { getDragNDropHandlers } from "./drag-n-drop.logic";
import { UserService } from "../../API/user.service";
import Modal from "../modal/modal";
import { CircuitService } from "../../API/circuit.service";
import { AuthContext } from "../../context";
import SaveCircuitForm from "./saveCircuit/save-circuit";
import CircuitDataItem from "../circuitsDataList/circuitDataItem/circuit-data-item";
import OpenCircuit from "./openCircuit/open-circuit";

// Style
const Wrapper = styled.section`
padding 0.5em;
background: #25a07f;
height: 90vh;
display: flex;
flex-grow: 1;
justify-content:center;
margin: 0 auto;
`;

const PlayArea = styled.div`
  display: flex;
  position: relative;
  float: right;
  width: 85%;
  border: solid #444853;
  border-radius: 0 10px 10px 0;
  background: #b3b3b3;
  justify-content: center;
  align-items: center;
`;

const Node = styled.button`
  font-size: 10px;
  width: 20px;
  height: 20px;
  border: solid black;
  border-radius: 50%;
  background: #25a07f;
  color: #25a07f;
  display: inline-block;
  cursor: crosshair;
  z-index: 10;
`;
// Offset map for connection nodes.
const nodeOffset = [
  { type: "LED", inputs: { y1: -10, x1: -60 } },
  {
    type: "AND",
    inputs: { y1: -20, x1: -60, y2: 0, x2: -60 },
    outputs: { y1: -10, x1: 45 },
  },
  {
    type: "NAND",
    inputs: { y1: -20, x1: -60, y2: 0, x2: -60 },
    outputs: { y1: -10, x1: 48 },
  },
  {
    type: "OR",
    inputs: { y1: -20, x1: -60, y2: 0, x2: -60 },
    outputs: { y1: -10, x1: 45 },
  },
  {
    type: "NOR",
    inputs: { y1: -20, x1: -60, y2: 0, x2: -60 },
    outputs: { y1: -10, x1: 45 },
  },
  {
    type: "XOR",
    inputs: { y1: -20, x1: -60, y2: 0, x2: -60 },
    outputs: { y1: -10, x1: 45 },
  },
  {
    type: "XNOR",
    inputs: { y1: -20, x1: -60, y2: 0, x2: -60 },
    outputs: { y1: -10, x1: 48 },
  },
  { type: "NOT", inputs: { y1: -13, x1: -60 }, outputs: { y1: -13, x1: 42 } },
  { type: "INPUT", outputs: { y1: -10, x1: 40 } },
];

const Editor = ({
  importContent,
  circuit,
  setCircuit,
  arrows,
  setArrows,
}: {
  importContent: (circuit: CircuitItem[], arrows: ArrowItem[]) => void;
  circuit: CircuitItem[];
  setCircuit: React.Dispatch<React.SetStateAction<CircuitItem[]>>;
  arrows: ArrowItem[];
  setArrows: React.Dispatch<React.SetStateAction<ArrowItem[]>>;
}) => {
  // Get states of various things
  const { authData, setAuthData } = useContext<any>(AuthContext);
  const [start, setStart] = useState<string>("");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [tooltipShow, setTooltipShow] = useState<string>("");
  const [storage, setStorage] = useState<any>(null);
  const [saveModal, setSaveModal] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    if (Array.isArray(circuit) || Array.isArray(arrows)) {
      setCircuit(circuit);
      setArrows(arrows);
    }
  }, []);

  function resetPlay(): void {
    setCircuit([]);
    setArrows([]);
  }

  useEffect(() => {
    if (!isRunning) return;
    const timer = setInterval(simLogic, 500);
    return () => clearInterval(timer);
  }, [isRunning]);

  const { dragStartHandler, dropHandler } = getDragNDropHandlers({
    isRunning,
    circuit,
    setCircuit,
  });

  // Called when user starts dragging from start node.
  const handleNodeStart = (event: React.MouseEvent<HTMLButtonElement>) => {
    setStart((event.target as HTMLElement).id);
  };

  // Connects start to end node.
  const handleNodeEnd = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isRunning || start === "") return;

    const target = event.target as HTMLElement;
    if (start !== target.id) {
      const startBtn = document.getElementById(start);
      const endBtn = document.getElementById(target.id);
      if (startBtn) {
        startBtn.style.backgroundColor = "yellow";
        startBtn.style.color = "yellow";
      }
      if (endBtn) {
        endBtn.style.backgroundColor = "yellow";
        endBtn.style.color = "yellow";
      }

      setArrows((previous) => [
        ...previous,
        { start: start, end: target.id, active: false, key: uuidv4() },
      ]);
      setTimeout(() => {
        if (startBtn) {
          startBtn.style.backgroundColor = "#25a07f";
          startBtn.style.color = "#25a07f";
        }
        if (endBtn) {
          endBtn.style.backgroundColor = "#25a07f";
          endBtn.style.color = "#25a07f";
        }
      }, 1000);
    }

    setStart("");
  };

  // Clear all connections from selected node.
  const handleClearConnections = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (!isRunning && event.button === 1) {
      const target = event.target as HTMLElement;
      const arrowsToKeep = arrows.filter(
        (item) => !(item.start === target.id || item.end === target.id)
      );

      setArrows(arrowsToKeep);
    }
  };

  // Set node buttons
  function setupNodes(type: string, componentId: string, itemPos: number[]) {
    let index = 0;
    for (let i = 0; i < nodeOffset.length; i++) {
      if (nodeOffset[i].type === type) {
        index = i;
      }
    }
    var returnArr = [];
    if (typeof nodeOffset[index].inputs !== "undefined") {
      returnArr.push(
        <Node
          id={componentId + "-input0"}
          onMouseUp={handleNodeEnd}
          style={{
            position: "fixed",

            left: itemPos[0] + nodeOffset[index].inputs!.x1,
            top: itemPos[1] + nodeOffset[index].inputs!.y1,
          }}
          onAuxClick={handleClearConnections}
        ></Node>
      );
      if (typeof nodeOffset[index].inputs!.y2 !== "undefined") {
        returnArr.push(
          <Node
            id={componentId + "-input1"}
            onMouseUp={handleNodeEnd}
            style={{
              position: "fixed",

              left: itemPos[0] + nodeOffset[index].inputs!.x2!,
              top: itemPos[1] + nodeOffset[index].inputs!.y2!,
            }}
            onAuxClick={handleClearConnections}
          >
            B
          </Node>
        );
      }
    }
    if (typeof nodeOffset[index].outputs !== "undefined") {
      returnArr.push(
        <Node
          id={componentId + "-output0"}
          onMouseDown={handleNodeStart}
          style={{
            position: "fixed",

            left: itemPos[0] + nodeOffset[index].outputs!.x1,
            top: itemPos[1] + nodeOffset[index].outputs!.y1,
          }}
          onAuxClick={handleClearConnections}
        >
          B
        </Node>
      );
    }

    return returnArr;
  }

  function topologicalSort(circuit: CircuitItem[], arrows: ArrowItem[]) {
    let graph: { [key: string]: any } = {};
    circuit.forEach((item) => {
      graph[item.id] = [];
    });
    arrows.forEach((arrow) => {
      graph[arrow.start.slice(0, 36)].push(arrow.end.slice(0, 36));
    });

    let visited: Set<Object> = new Set();
    let stack: any[] = [];

    for (let node in graph) {
      if (!visited.has(node)) {
        dfs(node, visited, stack, graph);
      }
    }

    return stack.reverse();
  }

  function dfs(
    node: string,
    visited: Set<Object>,
    stack: any[],
    graph: { [key: string]: any }
  ) {
    visited.add(node);
    for (let neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        dfs(neighbor, visited, stack, graph);
      }
    }
    stack.push(node);
  }

  // Simulate logical operations for the circuit.
  function simLogic() {
    let updatedArrows = [...arrows];
    let updatedCircuit = [...circuit];

    let topoOrder = topologicalSort(circuit, arrows);

    for (let i = 0; i < topoOrder.length; i++) {
      let item = updatedCircuit.find((item) => item.id === topoOrder[i]);

      // Process logic for inputs

      if (item?.type === "INPUT") {
        let outputArrows = updatedArrows.filter(
          (arrow) => arrow.start === item.id + "-output0"
        );

        for (let j = 0; j < outputArrows.length; j++) {
          for (let k = 0; k < updatedArrows.length; k++) {
            if (
              updatedArrows[k].start === outputArrows[j].start ||
              updatedArrows[k].end === outputArrows[j].end
            ) {
              updatedArrows[k].active = item.outputHigh;
            }
          }
        }
      }
      // Process logic for AND
      if (item?.type === "AND") {
        let inputArrows0 = updatedArrows.some(
          (arrow) => arrow.end === item.id + "-input0" && arrow.active === true
        );
        let inputArrows1 = updatedArrows.some(
          (arrow) => arrow.end === item.id + "-input1" && arrow.active === true
        );
        let outputArrows = updatedArrows.filter(
          (arrow) => arrow.start === item.id + "-output0"
        );

        for (let j = 0; j < outputArrows.length; j++) {
          for (let k = 0; k < updatedArrows.length; k++) {
            if (
              updatedArrows[k].start === outputArrows[j].start ||
              updatedArrows[k].end === outputArrows[j].end
            ) {
              updatedArrows[k].active = inputArrows0 && inputArrows1;
            }
          }
        }
      }

      // Process logic for NAND
      if (item?.type === "NAND") {
        let inputArrows0 = updatedArrows.some(
          (arrow) => arrow.end === item.id + "-input0" && arrow.active === true
        );
        let inputArrows1 = updatedArrows.some(
          (arrow) => arrow.end === item.id + "-input1" && arrow.active === true
        );
        let outputArrows = updatedArrows.filter(
          (arrow) => arrow.start === item.id + "-output0"
        );

        for (let j = 0; j < outputArrows.length; j++) {
          for (let k = 0; k < updatedArrows.length; k++) {
            if (
              updatedArrows[k].start === outputArrows[j].start ||
              updatedArrows[k].end === outputArrows[j].end
            ) {
              updatedArrows[k].active = !(inputArrows0 && inputArrows1);
            }
          }
        }
      }

      // Process logic for NOT
      if (item?.type === "NOT") {
        let inputArrows = updatedArrows.filter(
          (arrow) => arrow.end === item.id + "-input0" && arrow.active === true
        );
        let outputArrows = updatedArrows.filter(
          (arrow) => arrow.start === item.id + "-output0"
        );

        const isActive = inputArrows.length > 0;

        for (let j = 0; j < outputArrows.length; j++) {
          for (let k = 0; k < updatedArrows.length; k++) {
            if (updatedArrows[k].start === outputArrows[j].start) {
              updatedArrows[k].active = !(isActive && item.outputHigh);
            }
          }
        }
      }

      // Process logic for OR
      if (item?.type === "OR") {
        let inputArrows0 = updatedArrows.some(
          (arrow) => arrow.end === item.id + "-input0" && arrow.active === true
        );
        let inputArrows1 = updatedArrows.some(
          (arrow) => arrow.end === item.id + "-input1" && arrow.active === true
        );
        let outputArrows = updatedArrows.filter(
          (arrow) => arrow.start === item.id + "-output0"
        );

        for (let j = 0; j < outputArrows.length; j++) {
          for (let k = 0; k < updatedArrows.length; k++) {
            if (
              updatedArrows[k].start === outputArrows[j].start ||
              updatedArrows[k].end === outputArrows[j].end
            ) {
              updatedArrows[k].active = inputArrows0 || inputArrows1;
            }
          }
        }
      }

      // Process logic for NOR
      if (item?.type === "NOR") {
        let inputArrows0 = updatedArrows.some(
          (arrow) => arrow.end === item.id + "-input0" && arrow.active === true
        );
        let inputArrows1 = updatedArrows.some(
          (arrow) => arrow.end === item.id + "-input1" && arrow.active === true
        );
        let outputArrows = updatedArrows.filter(
          (arrow) => arrow.start === item.id + "-output0"
        );

        for (let j = 0; j < outputArrows.length; j++) {
          for (let k = 0; k < updatedArrows.length; k++) {
            if (
              updatedArrows[k].start === outputArrows[j].start ||
              updatedArrows[k].end === outputArrows[j].end
            ) {
              updatedArrows[k].active = !(inputArrows0 || inputArrows1);
            }
          }
        }
      }

      // Process logic for XOR
      if (item?.type === "XOR") {
        let inputArrows0 = updatedArrows.some(
          (arrow) => arrow.end === item.id + "-input0" && arrow.active === true
        );
        let inputArrows1 = updatedArrows.some(
          (arrow) => arrow.end === item.id + "-input1" && arrow.active === true
        );
        let outputArrows = updatedArrows.filter(
          (arrow) => arrow.start === item.id + "-output0"
        );

        for (let j = 0; j < outputArrows.length; j++) {
          for (let k = 0; k < updatedArrows.length; k++) {
            if (
              updatedArrows[k].start === outputArrows[j].start ||
              updatedArrows[k].end === outputArrows[j].end
            ) {
              updatedArrows[k].active = inputArrows0 != inputArrows1;
            }
          }
        }
      }

      // Process logic for XNOR
      if (item?.type === "XNOR") {
        let inputArrows0 = updatedArrows.some(
          (arrow) => arrow.end === item.id + "-input0" && arrow.active === true
        );
        let inputArrows1 = updatedArrows.some(
          (arrow) => arrow.end === item.id + "-input1" && arrow.active === true
        );
        let outputArrows = updatedArrows.filter(
          (arrow) => arrow.start === item.id + "-output0"
        );

        for (let j = 0; j < outputArrows.length; j++) {
          for (let k = 0; k < updatedArrows.length; k++) {
            if (
              updatedArrows[k].start === outputArrows[j].start ||
              updatedArrows[k].end === outputArrows[j].end
            ) {
              updatedArrows[k].active = !(inputArrows0 != inputArrows1);
            }
          }
        }
      }

      // Process logic for LEDs

      if (item?.type === "LED") {
        let inputArrows = updatedArrows.filter(
          (arrow) => arrow.end === item.id + "-input0" && arrow.active === true
        );

        if (inputArrows.length > 0) {
          updatedCircuit = updatedCircuit.map((comp) =>
            comp.id === item.id
              ? { ...comp, outputHigh: true, src: ImageResource["LED-ON"] }
              : { ...comp }
          );
        } else if (inputArrows.length === 0) {
          updatedCircuit = updatedCircuit.map((comp) =>
            comp.id === item.id
              ? { ...comp, outputHigh: false, src: ImageResource.LED }
              : { ...comp }
          );
        }
      }
    }
    setArrows(updatedArrows);
    setCircuit(updatedCircuit);
  }

  // Toggle output for input components.
  const switchInput = (id: string) => {
    const foundItem = circuit.find(
      (item) => item.id === id && item.type === LogicCircuitElement.INPUT
    );
    if (!foundItem) return;

    const newOutputHigh = !foundItem.outputHigh;
    Object.assign(foundItem, {
      src: newOutputHigh ? ImageResource["INPUT-ON"] : ImageResource["INPUT"],
      outputHigh: newOutputHigh,
    });

    setCircuit([...circuit]);
  };

  // Delete selected circuit component.
  const handleDeleteComponent = (event: React.MouseEvent<HTMLImageElement>) => {
    event.preventDefault();
    const target = event.target as HTMLElement;
    if (!isRunning && event.button === 1) {
      const arrowsToKeep = arrows.filter(
        (item) =>
          !(
            item.start.slice(0, 36) === target.id ||
            item.end.slice(0, 36) === target.id
          )
      );
      const circuitToKeep = circuit.filter((item) => !(item.id === target.id));

      setArrows(arrowsToKeep);
      setCircuit(circuitToKeep);
    }
  };

  const CircuitComponent: React.FunctionComponent<{ id: string }> = ({
    id,
  }) => {
    const updateXarrow = useXarrow();

    const foundItem = circuit.find((item) => item.id === id);
    if (!foundItem) return <div></div>;

    let imgSrc = foundItem?.src;
    if (foundItem?.type === "LED" && foundItem.outputHigh) {
      imgSrc = ImageResource["LED-ON"];
    }

    const inputSwap = (id: string) => {
      if (isRunning) {
        setTimeout(() => {
          setIsRunning(false);
          switchInput(id);
          setTimeout(() => {
            setIsRunning(true);
          }, 100);
        }, 100);
      } else {
        switchInput(id);
      }
    };

    return (
      <>
        <img
          id={id}
          className="compo"
          src={imgSrc}
          style={{
            position: "fixed",
            height: "50px",
            left: foundItem.x - 50,
            top: foundItem.y - 25,
            cursor: "move",
            zIndex: 5,
          }}
          onDrag={() => updateXarrow}
          onDragStart={(event) => {
            dragStartHandler(event, id, foundItem.type);
          }}
          onDragEnd={() => {
            setTimeout(() => {
              updateXarrow();
            }, 500);
          }}
          onClick={
            foundItem.type === "INPUT"
              ? () => inputSwap(foundItem.id)
              : () => {}
          }
          onAuxClick={handleDeleteComponent}
          onMouseEnter={() => setTooltipShow(foundItem.type)}
          onMouseLeave={() => setTooltipShow("")}
        />
      </>
    );
  };

  return (
    <div>
      <Modal visible={saveModal} setVisible={setSaveModal}>
        <SaveCircuitForm
          setSaveModal={setSaveModal}
          circuitData={{ circuit, arrows }}
        ></SaveCircuitForm>
      </Modal>
      <Modal visible={openModal} setVisible={setOpenModal}>
        <OpenCircuit
          setOpenModal={setOpenModal}
          importContent={importContent}
        />
      </Modal>
      <div className={cl.controlButtonsGroup}>
        <button
          className={cl.controlButton}
          onClick={() => {
            setSaveModal(true);
            setStorage({ circuit, arrows });
          }}
        >
          Зберегти
        </button>
        <button
          className={cl.controlButton}
          onClick={() => {
            // if (!storage) return;
            setIsRunning(false);
            setOpenModal(true);
            // setCircuit(storage.circuit);
            // setArrows(storage.arrows);
          }}
        >
          Відкрити
        </button>
      </div>
      <Wrapper>
        <Toolbox
          dragStartHandler={dragStartHandler}
          resetField={resetPlay}
          isRunning={isRunning}
          setIsRunning={setIsRunning}
          tooltipToShow={tooltipShow as LogicCircuitElement}
          setTooltipToShow={setTooltipShow}
        />

        <PlayArea
          id="playArea"
          onDragOver={(e) => e.preventDefault()}
          onDrop={dropHandler}
        >
          <Xwrapper>
            {circuit.map((item, index) => (
              <div id={item.id} key={item.id + "div"}>
                <CircuitComponent id={item.id} key={item.id} />
                {setupNodes(item.type, item?.id || "", [item.x, item.y])}
              </div>
            ))}
            {arrows.map((ar) => (
              <Xarrow
                showHead={false}
                showTail={false}
                animateDrawing={true}
                path="grid"
                gridBreak="10%10"
                start={ar.start}
                end={ar.end}
                color={ar.active ? "#25A07F" : "#444853"}
                startAnchor="bottom"
                endAnchor="top"
                zIndex={ar.active ? 2 : 1}
                SVGcanvasStyle={{ margin: 20 }}
              />
            ))}
          </Xwrapper>
        </PlayArea>
      </Wrapper>
    </div>
  );
};

export default Editor;
