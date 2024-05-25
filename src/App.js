import './App.css';
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import UserIcon from './Assets/usericon.jpg';
import { userPhotos } from './userPhotoData';
import { v4 as createId } from 'uuid';

function App() {

  const [users, setUsers] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [activeForm, setActiveForm] = useState(false);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(userList => setUsers(userList))
      .catch(err => console.log(err));
  }, []);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const onSubmit = data => {
    const cleansedData = { ...data, id: createId(), company: { name: data.company, catchPhrase: 'Implemented secondary concept' }, }
    setUsers(prevUsers => [...prevUsers, cleansedData]);
    setActiveForm(false);
    reset();
  };

  const handleDelete = (id) => {
     const remainingUsers = users.filter(user => user.id !== id);
     setUsers(remainingUsers);
  }

  return (
    <main className={`flex justify-center bg-gray-200 p-8 dark:bg-slate-800 duration-500 ${darkMode ? 'dark' : ''}`}>
      <div className='border max-w-6xl w-full p-6 bg-white rounded-lg shadow-lg dark:bg-slate-600 duration-500 dark:border-none'>
        <div className='flex justify-between flex-col-reverse lg:flex-row dark:text-gray-200'>
          <div className='mb-6'>
            <h4 className='font-bold text-gray-700 dark:text-gray-200'>All Users</h4>
            <p>You can find users information including their status.</p>
          </div>
          <div className='flex justify-end items-center'>
            <button className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-400 dark:bg-slate-800 duration-300" type='button' onClick={() => setDarkMode(!darkMode)}>{darkMode ? 'Light' : 'Dark'} mode</button>
            <button className='ml-4 px-4 py-2 bg-purple-700 rounded-lg text-purple-100 hover:bg-purple-800 duration-300' type='button' onClick={() => setActiveForm(!activeForm)}>Add user</button>
          </div>
        </div>
        <div className='overflow-x-auto'>
          {activeForm &&
            <form className='flex flex-col sm:flex-row sm:m-auto border-2 items-center p-2 max-w-3xl rounded-lg' onSubmit={handleSubmit(onSubmit)}>
              <div className='flex flex-col items-center w-full sm:m-2'>
                <label htmlFor='name' className='sr-only'>Name</label>
                <input id='name' type='text' placeholder='Name' className='border mb-2 w-full bg-gray-200 shadow border rounded-lg px-3 py-2 focus:bg-blue-100 placeholder-gray-500' {...register("name", { required: true, maxLength: 50 })} />
                {errors.name && <span className='text-sm text-red-600'>Name is required.</span>}
                <label htmlFor='email' className='sr-only'>Email</label>
                <input id='email' type='text' placeholder='Email' className='border mb-2 w-full bg-gray-200 shadow border rounded-lg px-3 py-2 focus:bg-blue-100 placeholder-gray-500' {...register("email", { required: true })} />
                {errors.email && <span className='text-sm text-red-600'>Email is required</span>}
              </div>
              <div className='flex flex-col items-center w-full'>
                <label htmlFor='company' className='sr-only'>Company Name</label>
                <input id='company' type='text' placeholder='Company Name' className='border mb-2 w-full  shadow border rounded-lg px-3 py-2 focus:bg-blue-100 bg-gray-200 placeholder-gray-500' {...register("company", { required: true })} />
                {errors.company && <span className='text-sm text-red-600'>Company name is required</span>}
                <label htmlFor='phone' className='sr-only'>Phone Number</label>
                <input id='phone' type='tel' placeholder='Phone Number' className='border mb-2 w-full bg-gray-200 shadow border rounded-lg px-3 py-2 focus:bg-blue-100 placeholder-gray-500' {...register("phone", { required: true })} />
                {errors.phone && <span className='text-sm text-red-600'>Phone number is required</span>}
              </div>
              <button type='submit' className='ml-4 px-4 py-2 bg-purple-700 rounded-lg text-purple-100 hover:bg-purple-800 text-sm shadow duration-300'>+ Add User</button>
            </form>}
          <table className='lg:w-full'>
            <thead className='text-gray-700 dark:text-gray-200'>
              <tr>
                <th className='py-4 px-2 text-left'>Name</th>
                <th className='py-4 px-2 text-left'>Company</th>
                <th className='py-4 px-2 text-left'>Phone</th>
                <th className='py-4 px-2 text-left'>Status</th>
              </tr>
            </thead>
            <tbody className='text-gray-800 dark:text-gray-200'>
              {
                users.map((user) => (
                  <tr key={user.id} className='border-gray-200 border-t hover:bg-gray-100 dark:hover:bg-slate-700'>
                    <td className='min-w-64 lg:w-3/12 py-4 px-2 flex'>
                      <img className='w-12 h-12 rounded-full mx-2' src={userPhotos[user.id - 1] || UserIcon} alt='User' />
                      <div className='flex flex-col'>
                        <span>{user.name}</span>
                        <span className='text-sm text-gray-500 dark:text-gray-400'>{user.email}</span>
                      </div>
                    </td>
                    <td className='w-3/12 py-4 px-2 min-w-64'>
                      <div className='flex flex-col'>
                        <span>{user.company.name}</span>
                        <span className='text-sm text-gray-500 dark:text-gray-400'>{user.company.catchPhrase}</span>
                      </div>
                    </td>
                    <td className='w-3/12 py-4 px-2'>{user.phone}</td>
                    <td className='w-2/12 py-4 px-2'>
                      {
                        user.id % 2 === 0 ? <span className='font-bold text-green-700 text-xs border-green-700 border px-2 py-1 rounded-lg dark:bg-slate-600'>Active</span> : <span className='font-bold text-red-500 text-xs border-red-500 border px-2 py-1 rounded-lg dark:bg-slate-600'>Offline</span>
                      }
                    </td>
                    <td className='w-1/12 py-4 px-2'>
                      <div className='w-full flex justify-center'>
                        <button className='text-red-600 hover:text-red-700 dark:text-red-500 duration-500' type='button' onClick={() => handleDelete(user.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default App;
