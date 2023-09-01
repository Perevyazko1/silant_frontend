import {memo, ReactNode, useState} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import Container from 'react-bootstrap/Container';
import {Navbar,Button, Modal, Form, Nav} from 'react-bootstrap';
import cls from "./Navbar.module.scss"


interface NavbarProps {
    className?: string
    children?: ReactNode
}


export const NavbarComponent = memo((props: NavbarProps) => {

      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

      // const handleSubmit = (event) => {
      //   event.preventDefault();
      //   // Ваши действия по обработке данных формы авторизации
      //   // Например, вызов функции для проверки логина и пароля
      // }



    const {
        className,
        children,
        ...otherProps
    } = props

    const mods: Mods = {
        
    };
    
    return (
        <div

        >
            <Navbar className={classNames(cls.Navbar, mods, [className])}
            {...otherProps}
                bg="dark" variant="dark" expand="lg" >
              <Container>
                <Navbar.Brand href="#">Силант</Navbar.Brand>
                <Nav className="me-auto">
                  <Nav.Link href="tel:+7-8352-20-12-09">+7-8352-20-12-09</Nav.Link>
                  <Nav.Link href="https://telegram.org">Telegram</Nav.Link>
                </Nav>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="ms-auto">
                    <Nav.Link href="#">Электронная сервисная книжка Мой Силант</Nav.Link>
                    <Button  onClick={handleShow}  variant="warning">Авторизация</Button>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Авторизация</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form >
                    <Form.Group controlId="formLogin">
                      <Form.Label>Логин</Form.Label>
                      <Form.Control type="text" placeholder="Введите логин" />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                      <Form.Label>Пароль</Form.Label>
                      <Form.Control type="password" placeholder="Введите пароль" />
                    </Form.Group>

                    <Button className="m-2" variant="warning" type="submit">
                      Войти
                    </Button>
                  </Form>
                </Modal.Body>
          </Modal>
        </div>
    );
});