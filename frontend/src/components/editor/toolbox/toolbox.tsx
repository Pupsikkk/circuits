import { ImageResource } from "../../../common/image.resource";
import { LogicCircuitElement } from "../../../logic/interfaces";
import React from "react";
import TooltipScreen from "./tooltip/tooltip";
import ToolsList from "./toolsList/tools-list";
import cl from "./toolbox.module.css";

const Toolbox = ({
  isRunning,
  setIsRunning,
  tooltipToShow,
  setTooltipToShow,
  dragStartHandler,
  resetField,
}: {
  isRunning: boolean;
  setIsRunning: (isRunning: boolean) => void;
  tooltipToShow: LogicCircuitElement;
  setTooltipToShow: (tooltip: string) => void;
  dragStartHandler: (
    event: React.DragEvent<HTMLDivElement>,
    id: string,
    componentType: string
  ) => void;
  resetField: () => void;
}) => {
  return (
    <div className={cl.toolbox}>
      <TooltipScreen isRunning={isRunning} tooltipToShow={tooltipToShow} />
      <div
        className="btn-group"
        role="group"
        aria-label="Basic mixed styles example"
      >
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => {
            setIsRunning(false);
            resetField();
          }}
          title="Reset all gates and connections."
        >
          Скинути
        </button>

        <button
          type="button"
          className={isRunning ? "btn btn-warning" : "btn btn-success"}
          onClick={() => setIsRunning(!isRunning)}
          title={isRunning ? "Pause logic" : "Run logic"}
        >
          {isRunning ? "Пауза" : "Симуляція"}
        </button>
      </div>
      <ToolsList
        setTooltipToShow={setTooltipToShow}
        dragStartHandler={dragStartHandler}
      />
    </div>
  );
};

export default Toolbox;
