import React from 'react';
import AppContent from './appContent';
import AppMenu from './appMenu';


class AppLayout extends React.Component {
    render() {
        return (
            <>
                <AppMenu />
                <AppContent />
            </>
        )
    }
}

export default AppLayout;