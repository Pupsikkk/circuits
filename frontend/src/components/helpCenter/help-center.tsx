import cl from "./help-center.module.css";
import { VideoResource } from "../../common/video.resource";

const HelpCenter = () => {
  return (
    <div className={cl.help}>
      <h1>Video Tutorials</h1>
      <br />
      <table>
        <tr>
          <td className={cl.helpTableData}>
            <b>Adding, removing & repositioning components.</b> <br />
            Drag items with left click, remove with middle click. (Circuit must
            be paused)
            <br />
            <video width="500" controls muted>
              <source src={VideoResource.ADD_MOVE} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </td>
          <td className={cl.helpTableData}>
            <b>Linking components. (Circuit must be paused)</b>
            <br /> Drag from an output node to an input node.
            <br />
            <video width="500" controls muted>
              <source src={VideoResource.LINK} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </td>
        </tr>
        <tr>
          <td className={cl.helpTableData}>
            <b>Toggling input components & isRunning the circuit.</b>
            <br /> Left click the component. (Circuit must be paused to toggle
            inputs)
            <br />
            <video width="500" controls muted>
              <source src={VideoResource.ADD_MOVE} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </td>
          <td className={cl.helpTableData}>
            <b>Resetting the circuit.</b>
            <br />
            Clears the entire circuit and stops the circuit isRunning.
            <br />
            <video width="500" controls muted>
              <source src={VideoResource.INPUT} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default HelpCenter;
