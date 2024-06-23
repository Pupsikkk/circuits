import { ImageResource } from "../../../../common/image.resource";
import { LogicCircuitElement } from "../../../../logic/interfaces";
import { dataToDisplayForElement } from "./tooltip-data";
import cl from "./tooltip.module.css";

const TooltipScreen = ({
  isRunning,
  tooltipToShow,
}: {
  tooltipToShow: LogicCircuitElement;
  isRunning: boolean;
}) => {
  const dataToDisplay = dataToDisplayForElement[tooltipToShow];
  if (!dataToDisplay)
    return (
      <div className={cl.tooltipDefault}>
        <img
          src={ImageResource.INVERTED_CHIP}
          className={cl.tooltipDefaultImg}
        />
        <span
          className={
            isRunning
              ? cl.tooltipDefaultInfo + " badge badge-pill badge-warning"
              : cl.tooltipDefaultInfo + " badge badge-pill badge-info"
          }
        >
          {isRunning ? "Симуляція..." : "Призупинено"}
        </span>
      </div>
    );

  return (
    <div className={cl.tooltip}>
      <h2>{dataToDisplay.name}</h2>
      {dataToDisplay.description}
      {dataToDisplay.truthTable && (
        <table className={cl.tooltipTable}>
          <thead>
            {dataToDisplay.truthTable.headers.map((header) => (
              <th className={cl.tooltipTableHeader}>{header}</th>
            ))}
          </thead>
          {dataToDisplay.truthTable.rows.map((row) => (
            <tr>
              {row.map((value) => (
                <td className={cl.tooltipTableData}>{value}</td>
              ))}
            </tr>
          ))}
        </table>
      )}
    </div>
  );
};

export default TooltipScreen;
