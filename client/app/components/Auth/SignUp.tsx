import React, { FC, use, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';  // Correct import
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';  // Fixed import
import { styles } from '../../../app/styles/style';
import { useRegisterMutation } from '@/redux/features/auth/authApi';
import toast from 'react-hot-toast';

type Props = {
    setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const SignUp: FC<Props> = ({ setRoute }) => {
    const [show, setShow] = useState(false);
  const [register,{isError, isSuccess, data, error}]=  useRegisterMutation();

  useEffect(()=>{
 
    if(isSuccess){
        const message = data?.message || "Registration Successfull";
     toast.success(message);
        setRoute('Verification')
    }       
    if("data" in error){
        const errorData= error as any;
        toast.error(errorData.data.message)
    
    }
},[isSuccess,isError])
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: ''
        },
        validationSchema: schema,
        onSubmit: async ({ name, email, password }) => {
            const data = {
                name, email, password
            };
        }
    });

    const { values, touched, errors, handleChange, handleSubmit } = formik;

    return (
        <div className='w-full'>
            <h1 className={`${styles.title}`}>
                Join to E Learning
            </h1>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col'>
                    <label className={`${styles.label}`} htmlFor='name'>
                        Enter your Name
                    </label>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        placeholder='Ashiqul Islam'
                        value={values.name}

                        onChange={handleChange}
                        className={`${styles.input}`}
                    />
                    {errors.name && touched.name && (
                        <div className='text-red-500'>{errors.name}</div>
                    )}
                </div>
                <div className='flex flex-col mt-4'>
                    <label className={`${styles.label}`} htmlFor='email'>
                        Enter your Email
                    </label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        placeholder='abc@gmail.com'
                        value={values.email}
                        onChange={handleChange}
                        className={`${styles.input}`}
                    />
                    {errors.email && touched.email && (
                        <div className='text-red-500'>{errors.email}</div>
                    )}
                </div>

                <div className='flex flex-col mt-4'>
                    <label className={`${styles.label}`} htmlFor='password'>
                        Enter your Password
                    </label>
                    <div className='relative'>
                        <input
                            type={show ? 'text' : 'password'}
                            id='password'
                            name='password'
                            placeholder='$abc1234#'
                            value={values.password}
                            onChange={handleChange}
                            className={`${styles.input} w-full`}

                        />
                        <span
                            className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500'
                            onClick={() => setShow(!show)}
                        >
                            {show ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                        </span>
                    </div>
                    {errors.password && touched.password && (
                        <div className='text-red-500'>{errors.password}</div>
                    )}
                </div>



                <button
                    type='submit'

                    className={`${styles.button}hover:bg-blue-600 mt-4`}
                >
                    Sign Up
                </button>
                <div className='mt-4'>
                    <p className='text-center'>Or Join with</p>
                    <div className='flex justify-center items-center mt-2'>
                        <FcGoogle size={25} className='cursor-pointer' />
                        <AiFillGithub size={25} className='cursor-pointer ml-2' />
                    </div>
                </div>
                <h5 className='text-center font-poppins pt-4'>Already have an Account ?
                    <span
                        className="text-blue-400 text-black cursor-pointer ml-2"
                        onClick={() => setRoute('Login')}
                    >Login
                    </span>
                </h5>
            </form>

        </div>
    );
};

export default SignUp;
