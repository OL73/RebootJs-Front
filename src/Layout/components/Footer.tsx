import React from 'react'

export interface FooterProps {
    
}
 
const Footer = () => {
    return (  
        <div
            style={ {display: 'flex', justifyContent: 'center', backgroundColor: '#BDBDBD'} }
        >
            <p
                style={ {color: 'white', padding: ' 20px 0'} }
            >dev.olanord@gmail.com</p>
        </div>
    );
}
 
export default Footer;