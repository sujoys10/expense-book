import React from 'react';
import AuthState from "./AuthContext";
import TemplateState from "./TemplateContext";
import ExpenseState from "./ExpenseContext";
import FormState from "./FormContext";

const GlobalState = ({ children }) => (
    <AuthState>
        <TemplateState>
            <ExpenseState>
                <FormState>
                    {children}
                </FormState>
            </ExpenseState>
        </TemplateState>
    </AuthState>
)

export default GlobalState;