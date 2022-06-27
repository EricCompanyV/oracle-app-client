import React, { useEffect, useState } from 'react';

function AllUserDecisionsPage(props) {
    const [userDecisions, setDecisions] = useState({})

    const fetchDecisions = async () => {
        const response = await fetch(`decisions/}`)
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