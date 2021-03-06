import React, { useRef, useCallback, useContext } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import { Container, Content, Background } from './styles';

import Input from '../../components/input';
import Button from '../../components/button';
import logoImg from '../../assets/logo.svg';

import { AuthContext } from '../../context/auth.context';
import getValidationErros from '../../utils/getValidationsErros';

interface SingInFormData {
  email: string;
  password: string;
}

const SingIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { singIn } = useContext(AuthContext);

  const handleSubmit = useCallback(
    async (data: SingInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required('Senha é obrigatória'),
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Digite um email válido'),
        });

        await schema.validate(data, { abortEarly: false });

        const { email, password } = data;

        singIn({ email, password });
      } catch (error) {
        const errors = getValidationErros(error);
        formRef.current?.setErrors(errors);
      }
    },
    [singIn],
  );

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="gobarber-logo" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>

          <Input name="email" icon={FiMail} type="text" placeholder="E-Mail" />

          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />

          <Button type="submit">Entrar</Button>

          <a href="aa">Esqueci minha senha</a>
        </Form>

        <a href="aaa">
          <FiLogIn />
          Criar conta
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SingIn;
