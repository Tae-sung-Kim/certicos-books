
import HamburgerMenu from './components/HamburgerMenu';
import NavMenu from './components/NavMenu';
import { MAIN_MENU } from '@/constant/menu';

export default function Header() {
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between relative">
          <span className="md:flex items-center space-x-2 w-1/4">
            <span className="text-2xl whitespace-nowrap font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-blue-600 transition-all cursor-pointer">
              CERTICOS BOOKS
            </span>
          </span>
          <div className="absolute left-1/2 transform -translate-x-1/2 md:flex items-center justify-center">
            <NavMenu menuData={MAIN_MENU} />
          </div>
          <div className="w-1/4 flex justify-end">
            <HamburgerMenu menuData={MAIN_MENU} />
          </div>
        </div>
      </div>
    </div>
  );
}
