import React, { useContext } from 'react';
import { FormContext } from '../../context/FormContext';
import close from '../../Icons/close.svg'
const BottomContainer = ({ children }) => {
    const { setOpen, setData } = useContext(FormContext);
    return (
        <div className="bottomContainer">
            <button
                className="bottomContainer_closeBtn" 
                onClick={() => {
                        setData('');
                        setOpen(false);
                    }
                }
            >
                <img src={close} alt="X"/>
            </button>
            {children}
        </div>
    )
}
   

export default BottomContainer;