import UserCircle from "../icons/UserCircle";
import DarkThemeToggle from "./DarkThemeToggle";

function Navbar() {
  return (
    <nav className="flex justify-between items-center w-full h-14 bg-slate-400 px-4 p-2">
      <div>FitnessTrack</div>
      <div className="flex justify-end">
        <DarkThemeToggle />
        <UserCircle className="w-10 h-10" />
      </div>
    </nav>
  );
}

export default Navbar;
