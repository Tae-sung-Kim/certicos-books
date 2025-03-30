import HamburgerMenu from './components/HamburgerMenu';
import NavMenu from './components/NavMenu';
import { MAIN_MENU } from '@/constant/menu';

export default function Header() {
  return (
    <div className="fixed top-0 p-1 left-0 w-full z-50 bg-white">
      <span className="absolute ml-4 hidden md:block text-2xl font-bold">
        CERTICOS BOOKS
      </span>
      <header className="container">
        {/* PC 메뉴 */}
        <NavMenu menuData={MAIN_MENU} />
        {/* 모바일 메뉴 */}
        <HamburgerMenu menuData={MAIN_MENU} />
      </header>
    </div>
  );
}
