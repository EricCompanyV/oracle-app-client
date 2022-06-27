import React, { useEffect, useState } from 'react';
import { BASE_API_URL } from '../utils/constants';

function AllUserDecisionsPage(props) {
    const [userDecisions, setDecisions] = useState({})

    const fetchDecisions = async () => {
        const response = await fetch(`${BASE_API_URL}/decisions/`)
        setDecisions(response)
    }
    
    useEffect(() => {
        fetchDecisions()
      }, [])

    return (
        <div>
            {userDecisions.map((decision) => {
                return (
                    <p>decision.name decision.result</p>
                )
            })}
        </div>
    );
}

export default AllUserDecisionsPage;