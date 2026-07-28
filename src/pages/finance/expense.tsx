import MainLayout from "../../components/main-layout";

const ExpensePage = () => {
  return (
    <MainLayout>
      <div className="flex justify-between">
        <h3 className="text-gray-900 font-bold text-sm items-center">
          <span className="text-gray-500">Tableau de bord / </span> Depenses
        </h3>
      </div>
    </MainLayout>
  );
};

export default ExpensePage;
