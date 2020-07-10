import React from "react";
import { Menu, Container, Button, Icon } from "semantic-ui-react";
import { Link } from 'react-router-dom';
interface IProps {
    openCreateForm: () => void;
}
const NavBar: React.FC<IProps> = ({ openCreateForm }) => {
    return (
        <Menu fixed="top" inverted>
            <Container>
                <Menu.Item name='home'>
                    <Icon name='react' />
                    Reactivities
                </Menu.Item>
                <Menu.Item name='messages' />
                <Menu.Item>
                    <Button
                        as={Link} to='/createactivity'
                        onClick={openCreateForm}
                        positive
                        content="Create Activity" />
                </Menu.Item>
            </Container>
        </Menu>
    )
}

export default NavBar