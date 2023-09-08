import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import Label from 'react-bootstrap/FormLabel'
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../features/auth/authAction';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { loading, userInfo, error } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const { register, handleSubmit } = useForm()

    const navigate = useNavigate()


    // useEffect(() => {
    //     // if (userInfo) {
    //     //     navigate('/home')
    //     // }
    // }, [userInfo])

    const submitForm = (data: any) => {
        dispatch(userLogin(data))
        .unwrap()
        .then((res : any) => {
            navigate('/home')
        });
    }

    return (
        <>
            <Container>
                <Row>
                    <Form onSubmit={handleSubmit(submitForm)}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="text" placeholder="username"   {...register('username')} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="password" placeholder="Password"   {...register('password')} />
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={loading}>
                            {loading ? 'Loading...' : 'Login'}
                        </Button>
                    </Form>
                </Row>
            </Container>
        </>
    )
}

export default Login