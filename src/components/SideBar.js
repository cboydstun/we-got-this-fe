import React from 'react';
import { Drawer, Button } from '@material-ui/core';

const styles = {
    width: '240px',
    flexShrink: 0,
};

const SideBar = ({ children }) => {
    return (
        <Drawer variant="persistent" open={true} anchor="left" style={styles}>
            <Button variant="contained">Hello World!</Button>
            <div>
                A bunch of text here to test how wide the text will move the
                stuff around
            </div>
        </Drawer>
    );
};

export default SideBar;
