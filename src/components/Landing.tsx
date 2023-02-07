import QuizIcon from '@mui/icons-material/Quiz';
import LinkedCameraIcon from '@mui/icons-material/LinkedCamera';
import AddTaskIcon from '@mui/icons-material/AddTask';
import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {

    return (
        <div className='landingContainer'>
            <div>
                <Link to={'jeopardy'}><QuizIcon /> Jeopardy</Link>
            </div>
            <div>
                <Link to={'photos'}><LinkedCameraIcon /> Photos</Link>
            </div>
            <div>
                <Link to={'toDo'}><AddTaskIcon /> ToDo List</Link>
            </div>
        </div>
    )
}

export default Landing
