import React, { useContext, useEffect, useState } from 'react';
import { SessionContext } from '../contexts/SessionContext';
import { BASE_API_URL } from '../utils/constants';
import { Title } from "@mantine/core";
import Decision from '../components/Decision';


function AllDecisionsPage(props) {
    const {token} = useContext(SessionContext)
    const [decisions, setDecisions] = useState([])

    const fetchDecisions = async () => {
        const response = await fetch(`${BASE_API_URL}/api/decisions/`,
        {method: 'GET',headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }})
        const responseParsed = await response.json()
        setDecisions(responseParsed.decisions)
    }
    
    useEffect(() => {
        fetchDecisions()
      }, [])

    return (
        <div>
            <Title order={1}>These are all the decisions that have been made.</Title>
            {decisions.map((decision) => (
                    <Decision decision={decision}/>
                )
            )}
        </div>
    );
}

export default AllDecisionsPage;