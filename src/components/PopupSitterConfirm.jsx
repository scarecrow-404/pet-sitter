import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  MenuItem,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import React from "react";
import { useUser } from "@/hooks/hooks";
import { useRouter } from "next/navigation";
import supabase from "@/lib/utils/db";
export default function PopUpSitterConfirm() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, userId } = useUser();
  const handleSitterMode = async () => {
    console.log("Sitter Mode");
    if (user?.user_type === "sitter") {
      router.push("/sitter_management");
    } else {
      const { data, error } = await supabase
        .from("users")
        .update({ user_type: "sitter" })
        .eq("id", userId)
        .select();
      console.log(data);
      router.push("/sitter_management");
    }
    onClose();
  };
  return (
    <>
      <MenuItem onClick={onOpen}>Sitter Mode</MenuItem>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pet Sitter</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to switch to sitter mode?</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={handleSitterMode}>
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
