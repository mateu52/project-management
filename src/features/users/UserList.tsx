import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { removeUser } from './UsersSlice';

export const UserList = () => {
    const users = useSelector((state: RootState) => state.users);
    const dispatch = useDispatch();

    return (
        <div>
            <ul className='p-2'>
                {users.map((user) => (
                    <li key={user.id}>
                    {user.name} - {user.role}
                    <button onClick={() => dispatch(removeUser(user.id))}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
