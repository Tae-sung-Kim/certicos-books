import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { type Menu } from '@/types/menu.type';

import { Link } from 'react-router-dom';

type MenuProps = {
  menuData: Menu[];
};

export default function NavMenu({ menuData }: MenuProps) {
  return (
    <NavigationMenu className="container justify-center hidden md:flex">
      <NavigationMenuList>
        {menuData.map((d) => {
          return (
            <NavigationMenuItem key={d.id}>
              <Link className={navigationMenuTriggerStyle()} to={d.path}>
                {d.name}
              </Link>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
