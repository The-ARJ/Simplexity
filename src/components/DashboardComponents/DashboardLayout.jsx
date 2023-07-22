import Sidebar from "./Sidebar";
import ComplexNavbar from "../Header/Header";
const backgroundImage = "./assets/doodle.png";
const style = {
  container: `h-screen overflow-hidden relative`,
  mainContainer: `flex flex-col h-screen pl-0 w-full  mt-20 lg:pl-20 lg:space-y-4`,
  main: `h-screen overflow-auto pb-36 pt-4 px-2 md:pb-8 md:pt-4 lg:pt-0 lg:px-4`,
};
export default function DashboardLayout({ children }) {
  return (
    
    <div className={style.container}>
      <div className="flex items-start ">
        <Sidebar />
        <ComplexNavbar />
        <div className={style.mainContainer}>
          <main className={style.main}>{children}</main>
        </div>
      </div>
    </div>
  );
}
