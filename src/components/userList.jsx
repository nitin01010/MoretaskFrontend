import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Trash } from 'lucide-react';

import { toast } from 'react-toastify';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://morestakq1.onrender.com/api/v1/users");
                setUsers(response.data.users);
            } catch (error) {
                toast.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const HandlerDelete = (id) => {
        console.log(id);
        axios.post(`https://morestakq1.onrender.com/api/v1/users/delete`, { id })
            .then(response => {
                toast.success(`Item with ID ${id} successfully deleted`);
            })
            .catch(error => {
                toast.error('Error deleting item:', error);
            });
    };
    return (
        <div className='bg-white w-full md:w-1/2 mt-4 p-3'>
            <h2 className=' font-semibold mb-3'>User List</h2>
            <ul>
                { users.map(user => {
                    return (
                        <div key={ user._id } className=' flex justify-center items-center gap-5 mb-2'>
                            <li className='  w-[100%] md:w-[50%]  capitalize p-2 border'>{ user.firstName }</li>
                            <Trash onClick={ () => HandlerDelete(user._id) } />
                        </div>
                    )
                }) }
            </ul>
        </div>
    );
};

export default UserList;
