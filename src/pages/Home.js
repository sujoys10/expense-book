import React, { useState, useContext, lazy, Suspense } from 'react';
import { AuthContext } from '../context/AuthContext';
import ErrorBoundary from '../components/ErrorBoundary';
import LayoutSpinner from '../components/utils/LayoutSpinner';
import SignupForm from '../components/SignupForm';
const LoginForm = lazy(() => import('../components/Login'));

const Home = () => {
    const { googleLogin } = useContext(AuthContext);
    const [ old, setOld ] = useState(true);    
    return(
        <Suspense fallback={<LayoutSpinner />}>
            <ErrorBoundary>
                    <div className="home">
                    <h2 >Paisa Tracker</h2>
                    <div className="home__authBox">
                        {old ? <LoginForm /> : <SignupForm />}
                        <div className="auth__switch"
                            onClick={() => setOld(!old)}
                        >
                            {old
                                ? 'New user ?' : 
                                'Existing user ?'
                            }
                        </div>
                        <button className="home__googleLogin" onClick={() => googleLogin()}>
                            login with google
                        </button>
                    </div>
                </div>   
            </ErrorBoundary>
        </Suspense>
    )
}

export default Home;