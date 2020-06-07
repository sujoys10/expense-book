import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        hasError: false,
      };
    }
  
    static getDerivedStateFromError(error) {
        return { hasError: true };  
    }
    componentDidCatch(error, errorInfo) { 
        console.log(error);  
    }

    componentDidMount(){
      const role = localStorage.getItem('role');
      this.setState({ role })
    }
    render() {
      if (this.state.hasError) {
        return  <p className="msg">Something went wrong</p> 
      }
      return this.props.children; 
    }
}

export default ErrorBoundary;