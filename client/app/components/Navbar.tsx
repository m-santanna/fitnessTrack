import UserCircle from "../icons/UserCircle";

function Navbar() {
  return (
    <nav className="w-full h-14 bg-slate-400 px-4 p-2">
      <ul className="flex justify-between items-center">
        <li>Hello</li>
        <li>
          <UserCircle className="w-10 h-10" />
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
