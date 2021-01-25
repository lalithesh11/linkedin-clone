import { Avatar } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from './features/userSlice'
import './HeaderOption.css'

// Instead of writing the props and then props.title, we can simply destructure the props and can use directly. In Icon, I is caps because we are going to use material ui.
function HeaderOption({avatar,Icon,title,onClick}) {

    const user=useSelector(selectUser);

    return (
        <div onClick={onClick} className='headerOption'>
            {/* if we pass Icon then only render the <Icon /> */}
            {Icon && <Icon className='headerOption__icon' />}

            { avatar && (
            <Avatar className="headerOption__icon" src={user?.photoUrl}>{user?.email[0]} </Avatar>
             )}

            <h3 className='headerOption__title'>{title}</h3>
            
        </div>
    )
}

export default HeaderOption
