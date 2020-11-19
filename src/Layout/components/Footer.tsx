import React from 'react'

export interface FooterProps {

}

const Footer = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: '#BDBDBD',
                position: 'absolute',
                bottom: '0',
                width: '100%'
            }}
        >
            <p
                style={{ color: 'white', padding: ' 10px 0' }}
            >dev.olanord@gmail.com</p>
        </div>
    );
}

export default Footer;