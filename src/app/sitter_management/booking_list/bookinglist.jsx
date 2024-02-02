import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Image,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { NavBar } from "@/app/sitter_management/navbar";
const BookingListPage = () => {
  return (
    <>
      <div className="">
        <div className="flex justify-between items-center py-3 w-[375px] md:w-full px-5">
          <div className="text-sm">Booking List</div>
          <div className="flex gap-2 ">
            <Input
              placeholder="Search..."
              className="md:hidden"
              size="sm"
              width={20}
            />
            <Input
              placeholder="Status"
              className="md:hidden"
              size="sm"
              width={20}
            />
            <Input placeholder="Search..." className="hidden md:block" />
            <Input placeholder="All Status" className="hidden md:block" />
          </div>
        </div>
        <div className="table">
          <table className="rounded-t-lg m-5 mx-auto bg-gray-800 text-gray-200 w-[375px] text-sm md:w-[716px]">
            <tr className="text-left border-b border-gray-300">
              <th className="">Pet Owner Name</th>
              <th className="">Pet(s)</th>
              <th className="">Duration</th>
              <th className="">Booked Date</th>
              <th className="">Status</th>
            </tr>
            <tr className="bg-white border-b border-gray-600">
              <td className="px-4 py-3">Jill</td>
              <td className="px-4 py-3">Smith</td>
              <td className="px-4 py-3">50</td>
              <td className="px-4 py-3">Male</td>
              <td className="px-4 py-3">Male</td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
};

export default BookingListPage;
