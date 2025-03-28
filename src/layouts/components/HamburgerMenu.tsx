import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { GiHamburgerMenu } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu } from '@/types/menu.type';

type MenuProps = {
  menuData: Menu[];
};

export default function HamburgerMenu({ menuData }: MenuProps) {
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
            return (
              <Link key={d.id} to={d.path}>
                <DropdownMenuItem>{d.name}</DropdownMenuItem>
              </Link>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
