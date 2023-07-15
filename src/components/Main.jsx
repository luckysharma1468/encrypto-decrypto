import React, {useState} from 'react'
import Choice from './Choice'
import Heading from './Heading';
import Encrypt from './Encrypt';
import Decrypt from './Decrypt';
import { AiFillHome } from 'react-icons/ai';


export default function Main() {

    const [choosed, setChoosed] = useState(false);
    const [choice, setChoice] = useState(null);

    const choiceHandler = (choiceChoosed) => {
        setChoosed(true);
        setChoice(choiceChoosed);
    }

    const labels = ['Encrypt', 'Decrypt'];
    return (
        <div>
            <div
                className='d-flex flex-row gap-1 m-4 homeDiv'
                onClick={() => setChoosed(false)}
            >
                <h3>Home</h3>
                <AiFillHome className='homeIcon'/>
            </div>
            <div className='mt-5'>
                <Heading />
                {!choosed &&
                    <Choice
                        labels={labels}
                        choiceHandler={choiceHandler}
                    />
                }
                {
                    choosed ? choice === 0 ?
                        <Encrypt />
                        : <Decrypt />
                        : null
                }
            </div>
        </div>
    )
}
