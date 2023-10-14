import React from "react";
import Link from "next/link";
import MenuItem from "./MenuItem";

function Navbar() {
  return (
    <div className="navbar h-18 bg-base-200">
      <div className="flex-1 w-12 rounded-full">
        <Link
          href={"/"}
          className="btn btn-ghost btn-circle normal-case text-xl"
        >
          <img width={40} height={40} src="/favicon.ico" />
        </Link>
      </div>
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img
              src="https://img.icons8.com/ios/100/user-male-circle--v1.png"
              alt="user-male-circle--v1"
            />
          </div>
        </label>
        <ul
          tabIndex={0}
          className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
        >
          <MenuItem name="Profile" a="/users" />
          <MenuItem name="Settings" a="/" />
          <MenuItem name="Logout" a="/logout" />
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
