import { ImageResource } from "../../../../common/image.resource";
import { LogicCircuitElement } from "../../../../logic/interfaces";
import styled from "styled-components";
import cl from "./tools-list.module.css";

const ToolsList = ({
  setTooltipToShow,
  dragStartHandler,
}: {
  setTooltipToShow: (tooltip: string) => void;
  dragStartHandler: (
    event: React.DragEvent<HTMLDivElement>,
    id: string,
    componentType: string
  ) => void;
}) => {
  return (
    <ul className={cl.scrollableList + " list-group"}>
      {(Object.keys(LogicCircuitElement) as LogicCircuitElement[]).map(
        (componentType) => {
          return (
            <li
              className={"list-group-item " + cl.listItem}
              style={{ backgroundColor: "#b3b3b3" }}
              onMouseEnter={() => setTooltipToShow(componentType)}
              onMouseLeave={() => setTooltipToShow("")}
            >
              <div className={cl.leftItem}>{componentType}&emsp;&emsp;</div>
              <div className={cl.rightItem}>
                <img
                  style={{ width: "80%" }}
                  src={ImageResource[componentType]}
                  onDragStart={(event) =>
                    dragStartHandler(event, "", componentType)
                  }
                />
              </div>
            </li>
          );
        }
      )}
    </ul>
  );
};

export default ToolsList;
