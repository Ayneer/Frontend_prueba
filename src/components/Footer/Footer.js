import React from 'react';
import './footer.css';

class Footer extends React.Component {
    render() {
        return (
            <div>
                <footer id="pie" className="page-footer font-small blue">
                    <div className="footer-copyright text-center py-3">© 2019 Copyright:
                    <a href="https://mdbootstrap.com/education/bootstrap/"> MDBootstrap.com</a>
                    </div>
                </footer>
            </div>
        )
    }
}

export default Footer;