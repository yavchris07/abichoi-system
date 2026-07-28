import MainLayout from "../components/main-layout";

const DashboardPage = () => {
  return (
    <MainLayout>
      <div className="flex justify-between">
        <h3 className="text-gray-900 font-bold text-sm items-center">
          <span className="text-gray-500">Tableau de bord / </span> bienvenu
        </h3>
      </div>
      <div className="flex gap-2">
        <div className="border border-gray-100 py-10 px-6 shadow rounded">
          <div>Caisse dollars</div>
         <strong>700 USD</strong>
        </div>
        <div className="border border-gray-100 py-10 px-6 shadow rounded">
          <div className="text-gray-500">Caisse Francs</div>
          <strong>111.700 CDF</strong>
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
