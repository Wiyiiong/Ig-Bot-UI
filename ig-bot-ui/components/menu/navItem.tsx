import { Button, Flex, Icon, Text } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';


type NavItemProps = {
    icon: any;
    title: string;
    active?: false;
    navSize: string;
    link: string;
};

export const NavItem = (props: NavItemProps) => {
    return (
        <Flex
            mt={30}
            flexDir="column"
            w="100%"
            alignItems={props.navSize == "small" ? "center" : "flex-start"}
        >
            <Link href={props.link}>
                <Button variant="ghost" width="100%" justifyContent="flex-start">
                    <Flex>
                        <Icon as={props.icon} fontSize="xl" color={props.active ? "brand.100" : "gray.500"} />
                        <Text ml={5} color="brand.100" display={props.navSize == "small" ? "none" : "flex"}>{props.title}</Text>
                    </Flex>
                </Button>
            </Link>
        </Flex>
    );
};