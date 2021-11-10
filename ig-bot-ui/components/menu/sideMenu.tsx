import { Flex, IconButton, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { IoAccessibilityOutline, IoHomeOutline, IoMenuOutline } from 'react-icons/io5';

import { NavItem } from './navItem';


export default function SideMenu() {
    const [navSize, changeNavSize] = useState("large")

    return (
        <Flex
            pos="sticky"
            left="5"
            h="95vh"
            marginTop="2.5vh"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            borderRadius={navSize == "small" ? "15px" : "30px"}
            w={navSize == "small" ? "75px" : "200px"}
            flexDir="column"
            justifyContent="space-between"
        >
            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                as="nav"
            >
                <IconButton
                    aria-label="menuToggle"
                    background="none"
                    mt={5}
                    _hover={{ background: 'none' }}
                    icon={<IoMenuOutline />}
                    onClick={() => {
                        if (navSize == "small")
                            changeNavSize("large")
                        else
                            changeNavSize("small")
                    }}
                />
                <VStack w="100%">
                    <NavItem navSize={navSize} icon={IoHomeOutline} title="Home" link="/" />
                    <NavItem navSize={navSize} icon={IoAccessibilityOutline} title="Voucher" link="/voucher" />
                </VStack>
            </Flex>
        </Flex>
    )
}