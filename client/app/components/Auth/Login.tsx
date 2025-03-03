import React, { FC, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';  // Correct import
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';  // Fixed import
import { styles } from '../../../app/styles/style';

type Props = {
    setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Login: FC<Props> = (setRoute) => {
    const [show, setShow] = useState(false);
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: schema,
        onSubmit: async ({ email, password }) => {
            console.log(email, password);
        }
    });

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
                            value={values.password}
                            onChange={handleChange}
                            className={`${styles.input} pl-3 pr-10`}
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
                    className={`${styles.button} mt-4`}
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
                <h5>Not have any Account?</h5>

                <span
                    className="text-blue-400 cursor-pointer"
                    onClick={() => setRoute('Signup')}
                  >Sign up
                </span>
            </form>

        </div>
    );
};

export default Login;
