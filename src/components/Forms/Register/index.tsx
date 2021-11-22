import { Form, Input, Button, Checkbox } from 'antd';
import {useState} from "react";
import "antd/dist/antd.css";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {postRegistration} from "../../../../store/actions/auth";
import {useRouter} from "next/router";

interface IUserData {
    name: string,
    lastName: string,
    email: string,
    company: string,
    password: string,
    passwordConf: string,
}

const initialState = {
    name: '',
    lastName: '',
    email: '',
    company: '',
    password: '',
    passwordConf: '',
}

const Register = () => {

    const dispatch = useDispatch();
    const router = useRouter();
    const goStartPage = () => {
        router.push('/')
    }

    const [userData, setUserData] = useState<IUserData>(initialState)

    const onUpdateData = (field: string) => (e: any) => {
        const value = e.target.value
        setUserData({
            ...userData,
            [field]: value,
        })
    }

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const onSubmit = async () => {
        if (userData.passwordConf !== userData.password) {
            alert('Пароли не совпалают')
            return false
        }
        try {
            await dispatch(postRegistration(userData, goStartPage))
        } catch (e) {
            console.log(e, 'registration error')
        }
    }

    return (
        <Form
            style={{ padding: '0 50px', marginTop: 64 }}
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 12 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            onSubmitCapture={onSubmit}
            autoComplete="off"
        >
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
            >
                <Input onChange={onUpdateData('name')}/>
            </Form.Item>

            <Form.Item
                label="Last name"
                name="lastName"
                rules={[{ required: true, message: 'Please input your last name!' }]}
            >
                <Input onChange={onUpdateData('lastName')}/>
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input onChange={onUpdateData('email')}/>
            </Form.Item>

            <Form.Item
                label="Company"
                name="company"
                rules={[{ required: true, message: 'Please input your company name!' }]}
            >
                <Input onChange={onUpdateData('company')}/>
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
            >
                <Input onChange={onUpdateData('password')}/>
            </Form.Item>
            <Form.Item
                label="PasswordConf"
                name="passwordConf"
            >
                <Input onChange={onUpdateData('passwordConf')}/>
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 6, span: 12 }}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Register