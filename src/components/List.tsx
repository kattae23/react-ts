import React from 'react'
import {Sub} from '../types'

interface Props {
    subs: Array<Sub>
}

export const List = ({subs}: Props) => {
    const renderList = (): JSX.Element[] => {
        return subs.map((sub, index) => {
            return (<li key={index}>
                <img src={sub.avatar} alt={`Avatar for ${sub.nick}`} />
                <h4>{ sub.nick } (<small>{sub.subMonths}</small>)</h4>
                <p>{sub.description?.substring(0,100)}</p>
            </li>
            )
        })
    }

    
    return (
        <ul>
            {renderList()}
        </ul>
    )
}
