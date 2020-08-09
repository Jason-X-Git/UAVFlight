import React from 'react';
import Link from '@material-ui/core/Link';
import moment from "moment";


function setIntervalImmediately(func, interval) {
    func();
    return setInterval(func, interval);
}

class HeaderTitle extends React.Component {
    state = {
        curTime: undefined
    };

    componentDidMount() {
        setIntervalImmediately(() => {
            this.setState({
                curTime: new moment().local().format('YYYY-MM-DD HH:mm:ss')
            })
        }, 1000)
    }

    render() {
        return (
            <Link href="/" color="inherit" style={{textDecoration:"none"}}>
                UAV Motion DashBoard - {this.state.curTime}
            </Link>
        )
    }
}

export default HeaderTitle;
