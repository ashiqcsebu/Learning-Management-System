import React, { FC, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AiOutlineEye from 'react-icons/ai';
import AiOutlineEyeInvisible from 'react-icons/ai';
import { AiFillGithub } from 'react-icons/ai';
import FCgoogle from 'react-icons/fc';
import { styles } from '../../../app/styles/style';

type Props = {
    setRoute: (route: string) => void;
}

const schema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
});

const Login: FC<Props> = (props: Props) => {
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
        <div className='w-full"'>
            <h1 className={`${styles.title}`}>
                Login with E Learning
            </h1>
        </div>
    );
}

export default Login;