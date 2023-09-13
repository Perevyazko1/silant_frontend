import {memo, ReactNode, useState, useEffect} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import Container from 'react-bootstrap/Container';
import {Navbar,Button, Modal, Form, Nav, NavDropdown} from 'react-bootstrap';
import {Link} from "react-router-dom";
import cls from "./Navbar.module.scss"
import brand from "../../app/style/icons/Logotype accent RGB 2.jpg"
import {postApi} from "../../providers/Api/RtkService";
import {User} from "../../providers/Api/models/User";
import {useAppdispatch, useAppSelector} from "../../shared/hooks/Redux/redux";
import {authPageSlice} from "../../providers/Api/slice/AuthSlice";
import {useDispatch} from "react-redux";


interface NavbarProps {
    className?: string
    children?: ReactNode
}


export const NavbarComponent = memo((props: NavbarProps) => {

      const dispatch = useAppdispatch()
      const {isRole} = authPageSlice.actions
      const {isUsername} = authPageSlice.actions
      const {resetAuth} = authPageSlice.actions
      const {username} = useAppSelector(state=>state.authReducer)


      const {isAuthenticated} = authPageSlice.actions
      const {authenticated} =useAppSelector(state=>state.authReducer)

      const [auth, setAuth] = useState(authenticated)
      const [user, setUser] = useState(username)
      const [show, setShow] = useState(false);

      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
      const localStorageСlear = () => {
          setAuth(false)
          setUser("")
          dispatch(resetAuth())
          localStorage.setItem("token","22548518cfa3d41af718c4b4a34aae335c89b606")
        }

      const [login, setLogin] = useState("")
      const [password, setPassword] = useState("")




      const [loginApi,{data, isLoading, error}] = postApi.useLoginApiMutation()

        const onLogin = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        try {
            const dataUser = {
              username: login,
              password: password
            };
            await loginApi(dataUser as User)


        } catch (error) {
            console.log(`Ошибка ${error}`)
        }

      };
        useEffect(()=>{
            if(data){
                dispatch(isAuthenticated(data.authenticated))
                dispatch(isUsername(data.username))
                dispatch((isRole(data.role)))
                if (data.authenticated){
                   handleClose()
                   localStorage.setItem("token",data.token)

                }

                else {
                    alert("Неверный логин или пароль")
                }
                setUser(data.username)
                setAuth(data.authenticated)

            }
        }
        ,[data]
    )




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
                <Navbar.Brand href="#"><img className={cls.Brand} src={brand}/> </Navbar.Brand>
                <Nav className="me-auto">
                  <Nav.Link href="tel:+7-8352-20-12-09">+7-8352-20-12-09</Nav.Link>
                  <Nav.Link href="https://telegram.org">Telegram</Nav.Link>
                </Nav>
                  {auth &&
                    <NavDropdown className="text-white m-2" title="Выбор страницы" id="basic-nav-dropdown">
                        <Link className="dropdown-item" to={"/"}>
                          Главная
                        </Link>
                        <Link className="dropdown-item" to={"/listcar"}>
                          Список машин
                        </Link>
                      </NavDropdown>
                  }
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <h6 className="text-white">{user}</h6>
                  <Nav className="ms-auto">
                    <Nav.Link href="#">Электронная сервисная книжка Мой Силант</Nav.Link>
                      {auth?(<Button onClick={localStorageСlear} className="m-2" variant="warning" type="submit">Выйти</Button>):(<Button  onClick={handleShow}  variant="warning">Авторизация</Button>)}

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
                      <Form.Control onChange={(event)=> setLogin(event.target.value)} type="text" placeholder="Введите логин" />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                      <Form.Label>Пароль</Form.Label>
                      <Form.Control onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Введите пароль" />
                    </Form.Group>
                      <Button className={cls.Button} onClick={onLogin}   variant="warning" type="submit">Войти</Button>
                  </Form>
                </Modal.Body>
          </Modal>
        </div>
    );
});