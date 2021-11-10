import { Center, Container, Divider, Flex, Heading } from '@chakra-ui/layout';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import React, { useEffect, useState } from 'react';

type Voucher = {
    code: string
    name: string
    redeemed: boolean
    redeemed_on?: ""
    release_date: string
    value: string
    valid_duration: number
    voucher_type: string
};


export default function Vouchers() {
    const [vouchers, setVouchers] = useState<Voucher[]>([]);
    const [expired, setExpired] = useState(new Map());

    useEffect(() => {
        fetchVouchers();
    }, []);

    useEffect(() => {
        queryExpiryDate();
        console.log('Called queryExpiryDate')
    }, [vouchers]);

    let fetchVouchers = () => {
        fetch(process.env.backendUrl + "vouchers/")
            .then((response) => response.json())
            .then((response) => {
                setVouchers(response.data);

            }).catch((err) => { console.log(err); });
    };

    let queryExpiryDate = () => {
        if (vouchers.length > 0) {
            var expiredMap = new Map();
            vouchers.forEach(voucher => {
                const now = Date.now();
                const release_date = new Date(voucher.release_date);
                const expiryDate = release_date.setDate(release_date.getDate() + voucher.valid_duration)
                if (expiryDate >= now) {
                    expiredMap.set(voucher.code, true);
                } else {
                    expiredMap.set(voucher.code, false);
                }
            });
            setExpired(expiredMap);
        }
    }

    return (
        <Container>
            <Flex w="100%" m={10} display="block">
                <Center><Heading>Vouchers</Heading></Center>
            </Flex>
            <Flex w="100%" m={10} display="block">
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Voucher Code</Th>
                            <Th>Name</Th>
                            <Th>Validity</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {console.log(expired)}
                        {vouchers.map((voucher) => {
                            return (
                                <Tr key={voucher.code}>
                                    <Td>{voucher.code}</Td>
                                    <Td>{voucher.name}</Td>
                                    {console.log(expired.get(voucher.code))}
                                    {expired.get(voucher.code) ?
                                        <Td color="#E53E3E">Expired</Td> :
                                        <Td>Valid</Td>}
                                </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
            </Flex>

        </Container >
    );
}

