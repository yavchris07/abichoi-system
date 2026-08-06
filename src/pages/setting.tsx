import MainLayout from "../components/main-layout"
import PwaButton from "../components/pwa-button"

const SettingPage = () => {
  return (
      <MainLayout>
      <div className="flex justify-between">
        <h3 className="text-gray-900 font-bold text-sm items-center">
          <span className="text-gray-500">Parametres </span>
        </h3>
      </div>
      <PwaButton/>
      </MainLayout>
  )
}

export default SettingPage
