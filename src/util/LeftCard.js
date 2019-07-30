import React from 'react'
import {useSpring, animated} from 'react-spring'

export default (props) => (
    <animated.div className="col-md-4 my-2" style={useSpring({opacity: 1, from: {opacity: 0}})}>
        <div className="card shadow mx-2">
            <div className="p-3">
                {props.children}
            </div>
        </div>
    </animated.div>)