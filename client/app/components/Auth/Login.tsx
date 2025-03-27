import React, { FC, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';  // Correct import
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';  // Fixed import
import { styles } from '../../../app/styles/style';
import { useLoginMutation } from '@/redux/features/auth/authApi';
import toast from 'react-hot-toast';

type Props = {
    setRoute: (route: string) => void;
    setOpen: (open: boolean) => void;
};

const schema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Login: FC<Props> = ({ setRoute, setOpen }) => {
    const [show, setShow] = useState(false);
    const [login, { isSuccess, error, data }] = useLoginMutation();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: schema,
        onSubmit: async ({ email, password }) => {
            await login({ email, password });
        }
    });

    useEffect(() => {
        if (isSuccess) {

            toast.success('Logged in successfully');
            setOpen(false);
        }
        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData.data.message)

            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess, error]);

    const { values, touched, errors, handleChange, handleSubmit } = formik;

    return (
        <div className='w-full'>
            <h1 className={`${styles.title}`}>
                Login with E Learning
            </h1>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col'>
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
                            className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer'
                            onClick={() => setShow(!show)}
                        >
                            {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </span>
                    </div>
                    {errors.password && touched.password && (
                        <div className='text-red-500'>{errors.password}</div>
                    )}
                </div>


                <button
                    type='submit'
                    className={`${styles.button} hover:bg-blue-600 mt-4`}
                >
                    Login
                </button>
                <div className='mt-4'>
                    <p className='text-center'>Or Join with</p>
                    <div className='flex justify-center items-center mt-2'>
                        <FcGoogle size={25} className='cursor-pointer' />
                        <AiFillGithub size={25} className='cursor-pointer ml-2' />
                    </div>
                </div>
                <h5 className='text-center font-poppins pt-4'> Don't have any Account ?
                    <span
                        className="text-blue-400 cursor-pointer ml-2"
                        onClick={() => setRoute('Sign-Up')}
                    >Sign up
                    </span>
                </h5>
            </form>

        </div>
    );
};

export default Login;
