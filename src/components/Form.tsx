import React from 'react'
import { Sub } from '../types'
import useNewSubForm from '../hooks/useNewSubForm'


interface FormProps{
    onNewSub: (newSub: Sub) => void
}


const Form = ({onNewSub}: FormProps) => {

    // const [ inputValues, setInputValues ] = useState<FormState['inputValues']>(INITIAL_STATE)

    const [inputValues, dispatch] = useNewSubForm()

    const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault()
        onNewSub(inputValues)
        dispatch({
            type: 'clear'
        })
        // setInputValues(INITIAL_STATE)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        const {name, value} = e.target
        dispatch({
            type: 'change_value',
            payload: {
                inputName: name,
                inputValue: value
            }
        })
        // setInputValues({
        //     ...inputValues,
        //     [e.target.name]: e.target.value
        // })
    }

    const handleClear = () => {
        dispatch({
            type: 'clear'
        })
        // setInputValues(INITIAL_STATE)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} value={ inputValues.nick } type="text" name="nick" placeholder="nick" />
                <input onChange={handleChange} value={ inputValues.subMonths } type="text" name="subMonths" placeholder="subMonths" />
                <input onChange={handleChange} value={ inputValues.avatar } type="text" name="avatar" placeholder="avatar" />
                <textarea onChange={handleChange} value={ inputValues.description } name="description" placeholder="description" style={{resize: 'none'}}/>
                <button type='button' onClick={handleClear}>Clear the Form</button>
                <button type='submit'>Save new Sub!</button>

            </form>
        </div>
    )


}


export default Form