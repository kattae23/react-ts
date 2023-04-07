import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import './App.css'
import { List } from './components/List'
import Form from './components/Form'
import {Sub, SubsResponseFromApi} from './types'
import axios from 'axios'

// const initialState = [
//     {
//         nick: 'dapelu',
//         subMonths: 3,
//         avatar: 'https://i.pravatar.cc/150?u=dapelu',
//         description: 'Dapelu hace de moderador aveces'
//     },
//     {
//         nick: 'sergio_serrano',
//         subMonths: 7,
//         avatar: 'https://i.pravatar.cc/150?u=sergio_serrano'
//     }
// ]

interface AppState {
    subs: Array<Sub>,
    newSubsNumber: number
    // subs: Sub[]
}

// type AppStateSubs = Array<Sub>

function App() {

    // const [subs, setSubs ] = useState<Array<Sub>>([])
    // const [subs, setSubs ] = useState<Sub[]>([])
    const [newSubsNumber, setNewSubsNumber ] = useState<AppState['newSubsNumber']>(5)
    const [subs, setSubs ] = useState<AppState['subs']>([])
    // const [subs, setSubs ] = useState<AppStateSubs>([])
    const divRef = useRef<HTMLDivElement>(null)
    

    useEffect(()=> {
        const fetchSubs = (): Promise<SubsResponseFromApi> => {
            return axios
                .get('http://localhost:3000/subs')
                .then( response => response.data)
        }

        const mapFromApiToSubs = (apiResponse: SubsResponseFromApi): Array<Sub> => {
            return apiResponse.map(subFromApi => {
                const {
                    months: subMonths,
                    profileUrl: avatar,
                    nick,
                    description
                } = subFromApi

                return {
                    nick,
                    description,
                    avatar,
                    subMonths
                }
            })
        }

        fetchSubs()
            .then(mapFromApiToSubs)
            .then(setSubs)
    }, [])

    const handleNewSub = (newSub: Sub): void => {
        setSubs(subs => [...subs, newSub])
        setNewSubsNumber(n => n + 1)
    }

    return (
        <div className='App' ref={divRef}>
            <h1>Alfonzo Subs</h1>
            <List subs={subs} />
            New Subs: {newSubsNumber}
            <Form onNewSub={handleNewSub} />
        </div>
    )
}

export default App
