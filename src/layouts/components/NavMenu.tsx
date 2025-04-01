import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { type Menu } from '@/types/menu.type';
import { Link, useLocation } from 'react-router-dom';

type MenuProps = {
  menuData: Menu[];
};

export default function NavMenu({ menuData }: MenuProps) {
  const location = useLocation();

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList className="gap-1">
        {menuData.map((d) => {
          const isActive = location.pathname === d.path;
          return (
            <NavigationMenuItem key={d.id}>
              <Link
                className={`${navigationMenuTriggerStyle()} text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 px-4 ${
                  isActive ? 'bg-blue-100 text-blue-700 font-semibold' : ''
                }`}
                to={d.path}
              >
                {d.name}
              </Link>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
