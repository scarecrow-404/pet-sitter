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
import profileIcon from "@/asset/images/profileIcon.svg";
import { useDisclosure } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { useUser } from "@/hooks/hooks";
import { useRouter } from "next/navigation";
import supabase from "@/lib/utils/db";
export default function PopUpSitterConfirm() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, userId } = useUser();
  const handleSitterMode = async () => {
    if (user?.user_type === "sitter") {
      router.push("/sitter_management");
    } else {
      const { data, error } = await supabase
        .from("users")
        .update({ user_type: "sitter" })
        .eq("id", userId)
        .select();
    }
    const { data: petSitterData, error: petSitterError } = await supabase
      .from("pet_sitter")
      .upsert([{ user_id: userId }], { returning: "minimal" });

    if (petSitterError) {
    }

    router.push("/sitter_management");
    onClose();
  };

  return (
    <>
      <MenuItem onClick={onOpen}>
        <Image
          src={profileIcon}
          alt="pet sitter component icon 1"
          height={8}
          width={8}
        />
        <Image
          src={profileIcon}
          alt="petsitter component icon 2 "
          height={8}
          width={8}
        />
        Become Pet Sitter
      </MenuItem>

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
