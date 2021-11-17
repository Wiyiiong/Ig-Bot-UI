import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Image, useDisclosure, Spinner } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"

type ImageModalProps = {
    voucherCode: string
};

export const VoucherImageModal = (props: NavItemProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [image, setImage] = useState();

    let fetchImage = (voucherCode: string) => {
        fetch(process.env.backendUrl + "/voucher/" + voucherCode + "?type=image")
            .then((response) => response.json())
            .then((response) => {
                var imageRaw = response.data.toString();
                var imageStr = imageRaw.substring(2, imageRaw.length - 1)
                setImage(imageStr);
            }).catch((err) => { console.log(err); });
    }

    return (
        <>
            <Button onClick={() => { fetchImage(props.voucherCode); onOpen() }}>Generate Image</Button>
            <Modal blockScrollOnMount={false} size="full" isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Voucher Image</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {image ?
                            <Image src={'data:image/jpg;base64,' + image} /> :
                            <Spinner />
                        }
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}


