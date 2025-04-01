import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { GiHamburgerMenu } from 'react-icons/gi';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu } from '@/types/menu.type';

type MenuProps = {
  menuData: Menu[];
};

export default function HamburgerMenu({ menuData }: MenuProps) {
  const location = useLocation();

  return (
    <div className="md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <GiHamburgerMenu />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {menuData.map((d) => {
            const isActive = location.pathname === d.path;
            return (
              <Link key={d.id} to={d.path}>
                <DropdownMenuItem
                  className={`cursor-pointer ${
                    isActive ? 'bg-blue-100 text-blue-700 font-semibold' : ''
                  }`}
                >
                  {d.name}
                </DropdownMenuItem>
              </Link>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
