"use client"
import { AiOutlineDashboard } from 'react-icons/ai';
import { HiOutlineCurrencyDollar } from 'react-icons/hi';
import { MdOutlineSell } from 'react-icons/md';
import { LiaKeySolid } from 'react-icons/lia';
import { PiUsersFourThin } from 'react-icons/pi';
import { IoSettingsOutline } from 'react-icons/io5';
import Link from 'next/link';
import {usePathname} from 'next/navigation'

export const SideBar2 = () => {

  const pathName = usePathname();
  return (
    <>
      <div className="relative bg-gray-50 dark:bg-slate-900 pattern">
        <nav className="z-20 flex shrink-0 grow-0 justify-around gap-4 border-t border-gray-200 bg-white/50 p-2.5 shadow-lg backdrop-blur-lg dark:border-slate-600/60 dark:bg-slate-800/50 fixed top-2/4 -translate-y-2/4 left-6 min-h-[auto] min-w-[64px] flex-col rounded-lg border">
        <Link
            href="/dashboard/admin"
            className={`flex aspect-square min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 ${
              pathName === '/dashboard/admin' ? 'bg-green-200 text-green-600' : 'hover:bg-gray-100 dark:hover:bg-slate-800'
            } text-gray-700 dark:text-gray-400 transition duration-300`}
          >
            <AiOutlineDashboard className="w-6 h-6 text-gray-500  flex-shrink-0 transition duration-75" />
            <small className="text-center text-xs font-medium">Dashboard</small>
          </Link>

          <Link
            href="/dashboard/admin/profits"
            className={`flex aspect-square min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 ${
              pathName === '/dashboard/admin/profits' ? 'bg-green-200 text-green-600' : 'hover:bg-gray-100 dark:hover:bg-slate-800'
            } text-gray-700 dark:text-gray-400 transition duration-300`}
          >
            <HiOutlineCurrencyDollar className="w-6 h-6 text-gray-500  flex-shrink-0 transition duration-75" />
            <small className="text-center text-xs font-medium">Profits</small>
          </Link>

          <Link
            href="/dashboard/admin/sales"
            className={`flex aspect-square min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 ${
              pathName === '/dashboard/admin/sales' ? 'bg-green-200 text-green-600' : 'hover:bg-gray-100 dark:hover:bg-slate-800'
            } text-gray-700 dark:text-gray-400 transition duration-300`}
          >
            <MdOutlineSell className="w-6 h-6 text-gray-500  flex-shrink-0 transition duration-75" />
            <small className="text-center text-xs font-medium">Sales</small>
          </Link>

          <Link
            href="/dashboard/admin/rents"
            className={`flex aspect-square min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 ${
              pathName === '/dashboard/admin/rents' ? 'bg-green-200 text-green-600' : 'hover:bg-gray-100 dark:hover:bg-slate-800'
            } text-gray-700 dark:text-gray-400 transition duration-300`}
          >
            <LiaKeySolid className="w-6 h-6 text-gray-500  flex-shrink-0 transition duration-75" />
            <small className="text-center text-xs font-medium">Rents</small>
          </Link>

          <Link
            href="/dashboard/admin/users"
            className={`flex aspect-square min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 ${
              pathName === '/dashboard/admin/users' ? 'bg-green-200 text-green-600' : 'hover:bg-gray-100 dark:hover:bg-slate-800'
            } text-gray-700 dark:text-gray-400 transition duration-300`}
          >
            <PiUsersFourThin className="w-6 h-6 text-gray-500  flex-shrink-0 transition duration-75" />
            <small className="text-center text-xs font-medium">Users</small>
          </Link>

          <Link
            href="/dashboard/admin/settings"
            className={`flex aspect-square min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 ${
              pathName === '/dashboard/admin/settings' ? 'bg-green-200 text-green-600' : 'hover:bg-gray-100 dark:hover:bg-slate-800'
            } text-gray-700 dark:text-gray-400 transition duration-300`}
          >
            <IoSettingsOutline className="w-6 h-6 text-gray-500  flex-shrink-0 transition duration-75" />
            <small className="text-center text-xs font-medium">Settings</small>
          </Link>
        </nav>
      </div>
    </>
  );
};