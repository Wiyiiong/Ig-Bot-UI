import { Box, Center, Container, Flex, Heading, Spacer, VStack } from '@chakra-ui/layout';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { Button, ButtonGroup, IconButton, Spinner, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { IoCheckmark, IoClose } from 'react-icons/io5';
import { AddIcon } from '@chakra-ui/icons';
import { formatDate } from '../../util/date';
import { isDisabled } from '@chakra-ui/utils';
import { VoucherImageModal } from './imageModal';
import { getToday } from '../../util/date';

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
    const [expiryDates, setExpiryDates] = useState(new Map());

    useEffect(() => {
        fetchVouchers();
        queryExpiryDate();
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
                console.log(response.data);

            }).catch((err) => { console.log(err); });
    };

    let queryExpiryDate = () => {
        if (vouchers.length > 0) {
            var expiredMap = new Map();
            var expiryDateMap = new Map();
            vouchers.forEach(voucher => {
                const now = getToday();
                console.log("Today")
                console.log(now)
                const release_date = new Date(voucher.release_date);
                console.log("Release Date")
                console.log(release_date)
                const duration = parseInt(voucher.valid_duration.toString());
                const expiryDate = new Date(release_date.setDate(release_date.getDate() + duration));
                console.log("Expiry Date")
                console.log(expiryDate)
                const expiryDateStr = formatDate(expiryDate);
                expiryDateMap.set(voucher.code, expiryDateStr);
                if (expiryDate < now && expiryDate != now) {
                    expiredMap.set(voucher.code, true);
                } else {
                    expiredMap.set(voucher.code, false);
                }
            });
            setExpiryDates(expiryDateMap);
            setExpired(expiredMap);
        }
    }

    let setVoucherToRedeemed = async (voucherCode: string): Promise<any> => {
        const request = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "data": { "redeemed": true } })
        };
        var data = await fetch(process.env.backendUrl + "/voucher/redeemed/" + voucherCode, request)
        var dataJson = data.json();

        dataJson.then((response) => {
            let voucherArray = [...vouchers];
            let index = voucherArray.findIndex(e => e.code === voucherCode);
            if (index !== -1) {
                voucherArray[index] = response.data;
                setVouchers(voucherArray);
            }
        }).catch((err) => { console.log(err); });
    }

    return (
        <VStack m={20} spacing={10}>
            <Flex w="100%">
                <Box>
                    <Heading>Vouchers</Heading>
                </Box>
                <Spacer />
                <Box>
                    <Button mr="+px" leftIcon={<AddIcon />} variant="outline">Add Voucher</Button>
                </Box>
            </Flex>
            <Flex>
                <Box>
                    <Table size="lg" variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Voucher Code</Th>
                                <Th>Value</Th>
                                <Th>Name</Th>
                                <Th>Release Date</Th>
                                <Th>Expiry Date</Th>
                                <Th>Duration</Th>
                                <Th>Validity</Th>
                                <Th>Redeemed</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                vouchers ? (
                                    vouchers.map((voucher) => {
                                        return (
                                            <Tr key={voucher.code}>
                                                <Td>{voucher.code}</Td>
                                                <Td>{voucher.value}</Td>
                                                <Td>{voucher.name}</Td>
                                                <Td>{voucher.release_date}</Td>
                                                <Td>{expiryDates.get(voucher.code)}</Td>
                                                <Td><Center>{voucher.valid_duration}</Center></Td>
                                                {expired.get(voucher.code) ?
                                                    <Td color="#E53E3E">Expired</Td> :
                                                    <Td>Valid</Td>}
                                                {voucher.redeemed ?
                                                    <Td><Center><IoCheckmark /></Center><Text><br />Redeemed on: <br />{voucher.redeemed_on}</Text></Td> :
                                                    {
                                                        ...expired.get(voucher.code) ?
                                                            <Td><Center><IconButton aria-label="redeemed" icon={<IoClose />} variant="link" onClick={() => setVoucherToRedeemed(voucher.code)} isDisabled /></Center></Td> :
                                                            <Td><Center><IconButton aria-label="redeemed" icon={<IoClose />} variant="link" onClick={() => setVoucherToRedeemed(voucher.code)} /></Center></Td>
                                                    }}
                                                <Td><VoucherImageModal voucherCode={voucher.code} /></Td>
                                            </Tr>
                                        )
                                    })) : <Spinner />}
                    </Tbody>
                    </Table>
                </Box>
            </Flex>
        </VStack >
    );
}

