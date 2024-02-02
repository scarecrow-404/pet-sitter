import Image from "next/image";
import profile from "@/asset/images/Frame427321006.svg";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
export function NavBar() {
  return (
    <div className="headBar flex items-center gap-5 p-5 bg-white justify-between">
      <div className="flex flex-col items-center md:flex-row md:gap-5">
        <Image src={profile} width={40} height={40} alt="profile" />
        <p>Jane Maison</p>
      </div>

      <div className="lg:hidden">
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
          />
          <MenuList>
            <MenuItem>Pet Sitter Profile</MenuItem>
            <MenuItem>Booking List</MenuItem>
            <MenuItem>Payout Option</MenuItem>
            <MenuItem>Log Out</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
}
