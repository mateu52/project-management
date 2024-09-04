import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser, updateUser } from './UsersSlice';

export const UserForm = ({ existingUser }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState(existingUser?.name || '');
    const [role, setRole] = useState(existingUser?.role || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (existingUser) {
        dispatch(updateUser({ id: existingUser.id, name, role }));
        } else {
        dispatch(addUser({ name, role }));
        }
        setName('');
        setRole('');
    };

    return (
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="User Name"
        />
        <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Role"
        />
        <button type="submit">{existingUser ? 'Update' : 'Add'} User</button>
        </form>
    );
};
