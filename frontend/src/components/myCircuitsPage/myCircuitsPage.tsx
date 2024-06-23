import CircuitDataList from "../circuitsDataList/circuits-data-list";
import cl from "./myCircuitsPage.module.css";

export const MyCircuitsPage = ({ importContent }: { importContent: any }) => {
  return (
    <div className={cl.wrapper}>
      <h1 className={cl.pageLabel}>Ваші схеми</h1>

      <div className={cl.listBackground}>
        <CircuitDataList
          importContent={importContent}
          onOpenClick={() => {}}
          isDeleteButtonVisible={true}
        />
      </div>
    </div>
  );
};

export default MyCircuitsPage;
