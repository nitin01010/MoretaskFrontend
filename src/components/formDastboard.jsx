import React, { useEffect, useState } from 'react';
import UserList from './userList';
import axios from 'axios';
import { toast } from 'react-toastify';

const FormDastboard = () => {
    const [tabStatus, setTabStatus] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        email: '',
        phone: '',
        address: ''
    });
    const [errors, setErrors] = useState({});
    const [previewMode, setPreviewMode] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateStep1 = () => {
        let newErrors = {};
        if (!formData.firstName) newErrors.firstName = "First name is required";
        if (!formData.lastName) newErrors.lastName = "Last name is required";
        if (!formData.gender) newErrors.gender = "Gender is required";
        return newErrors;
    };

    const validateStep2 = () => {
        let newErrors = {};
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.phone) newErrors.phone = "Phone number is required";
        if (!formData.address) newErrors.address = "Address is required";
        return newErrors;
    };

    const handleNext = () => {
        const step1Errors = validateStep1();
        if (Object.keys(step1Errors).length === 0) {
            setErrors({});
            setTabStatus(true);
        } else {
            setErrors(step1Errors);
        }
    };

    const handleSubmit = async () => {
        const step2Errors = validateStep2();

        if (Object.keys(step2Errors).length === 0) {
            setErrors({});
            setPreviewMode(true);

            try {
                const apiUrl = 'https://morestakq1.onrender.com/api/v1/users'; // Replace with your API endpoint
                const response = await axios.post(apiUrl, formData);

                toast.success('Form data submitted successfully');

                // Reset form data after successful submission
                setFormData({
                    firstName: '',
                    lastName: '',
                    gender: '',
                    email: '',
                    phone: '',
                    address: ''
                });

            } catch (error) {
                toast.error('Error submitting form data:', error);
                // Handle error (e.g., show error message to the user)
            }

        } else {
            setErrors(step2Errors);
        }
    };


    const handlePreview = () => {
        setPreviewMode(false);
        setTabStatus(false);
    };

    return (
        <div className='bg-slate-950 h-screen flex flex-col items-center p-4'>
            <h1 className='font-semibold text-white text-2xl mb-4'>College Collaboration Form</h1>
            <div className='flex flex-col md:flex-row gap-5 justify-center bg-white text-black p-4 w-full md:w-2/3 lg:w-1/2'>
                {
                    !tabStatus ? (
                        <div className='flex flex-col p-4 w-full'>
                            <h1 className='text-center bg-blue-400 py-3 rounded-sm text-white font-semibold'>Step 1</h1>
                            <div className='mt-4'>
                                <p className='mb-2'>First name</p>
                                <input
                                    name='firstName'
                                    value={ formData.firstName }
                                    onChange={ handleInputChange }
                                    placeholder='Enter your first name'
                                    className={ `w-full font-normal border bg-slate-100 rounded-sm shadow-sm p-2 outline-none ${errors.firstName ? 'border-red-500' : ''}` }
                                    required
                                />
                                { errors.firstName && <p className='text-red-500'>{ errors.firstName }</p> }
                            </div>

                            <div className='mt-4'>
                                <p className='mb-2'>Last name</p>
                                <input
                                    name='lastName'
                                    value={ formData.lastName }
                                    onChange={ handleInputChange }
                                    placeholder='Enter your last name'
                                    className={ `w-full font-normal border bg-slate-100 rounded-sm shadow-sm p-2 outline-none ${errors.lastName ? 'border-red-500' : ''}` }
                                    required
                                />
                                { errors.lastName && <p className='text-red-500'>{ errors.lastName }</p> }
                            </div>

                            <div className='mt-4'>
                                <p className='mb-2'>Select Gender</p>
                                <select
                                    name='gender'
                                    value={ formData.gender }
                                    onChange={ handleInputChange }
                                    className={ `w-full p-1 outline-none rounded-sm shadow-sm py-2 bg-slate-100 ${errors.gender ? 'border-red-500' : ''}` }
                                >
                                    <option value=''>Select</option>
                                    <option value='Male'>Male</option>
                                    <option value='Female'>Female</option>
                                    <option value='Others'>Others</option>
                                </select>
                                { errors.gender && <p className='text-red-500'>{ errors.gender }</p> }
                            </div>

                            <button className='w-full p-2 mt-4 bg-blue-600 text-white rounded-sm' onClick={ handleNext }>Next</button>
                        </div>
                    ) : (
                        <div className='flex flex-col p-4 w-full'>
                            <h1 className='text-center bg-blue-400 py-3 rounded-sm text-white font-semibold'>Step 2</h1>
                            <div className='mt-4'>
                                <p className='mb-2'>Email</p>
                                <input
                                    name='email'
                                    value={ formData.email }
                                    onChange={ handleInputChange }
                                    placeholder='Enter your email'
                                    className={ `w-full font-normal border bg-slate-100 rounded-sm shadow-sm p-2 outline-none ${errors.email ? 'border-red-500' : ''}` }
                                    required
                                />
                                { errors.email && <p className='text-red-500'>{ errors.email }</p> }
                            </div>

                            <div className='mt-4'>
                                <p className='mb-2'>Phone Number</p>
                                <input
                                    name='phone'
                                    value={ formData.phone }
                                    onChange={ handleInputChange }
                                    placeholder='Enter your phone number'
                                    className={ `w-full font-normal border bg-slate-100 rounded-sm shadow-sm p-2 outline-none ${errors.phone ? 'border-red-500' : ''}` }
                                    required
                                />
                                { errors.phone && <p className='text-red-500'>{ errors.phone }</p> }
                            </div>

                            <div className='mt-4'>
                                <p className='mb-2'>Address</p>
                                <input
                                    name='address'
                                    value={ formData.address }
                                    onChange={ handleInputChange }
                                    placeholder='Enter your address'
                                    className={ `w-full font-normal border bg-slate-100 rounded-sm shadow-sm p-2 outline-none ${errors.address ? 'border-red-500' : ''}` }
                                    required
                                />
                                { errors.address && <p className='text-red-500'>{ errors.address }</p> }
                            </div>


                            <button className='w-full p-2 mt-4 bg-blue-600 text-white rounded-sm' onClick={ handlePreview }>Preview</button>
                            <button className='w-full p-2 mt-4 bg-blue-600 text-white rounded-sm' onClick={ handleSubmit }>Submit</button>
                        </div>
                    )
                }
            </div>
            <UserList />
        </div>
    );
}

export default FormDastboard;
