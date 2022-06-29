import React from 'react';
import { Anchor, Card, Text } from "@mantine/core";
import { NavLink, Link } from 'react-router-dom';


function Decision({decision}) {
    return (
        <Card key={decision._id}
            shadow='sm'
            p='xl'
            component={Link}
            withBorder
            to={`/decisions/${decision._id}`}
            sx={{
                '&:hover': {
                    backgroundColor: '#EEEEEE',
                },
                marginTop: 25,
                marginBottom: 10
            }}>
            <Text>{decision.name}</Text>
            <Text> Final result is:{decision.result ? decision.options[0]: decision.options[1]}</Text>
        </Card>
    );
}

export default Decision;