import { Component } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

/**
 * ErrorBoundary 컴포넌트
 *
 * 하위 컴포넌트가 그리는 도중 오류가 나도 화면 전체가 하얗게 사라지지 않도록,
 * 안내 문구와 '다시 시도' 버튼을 대신 보여준다. (오류 경계는 클래스 컴포넌트로만 만들 수 있어요)
 *
 * Props:
 * @param {React.ReactNode} children - 보호할 화면 [Required]
 *
 * Example usage:
 * <ErrorBoundary><HomePage /></ErrorBoundary>
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    this.handleRetry = this.handleRetry.bind(this);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('화면을 그리는 중 오류가 발생했어요.', error, info.componentStack);
  }

  handleRetry() {
    this.setState({ hasError: false });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Alert
          severity="error"
          action={ <Button color="inherit" size="small" onClick={ this.handleRetry }>다시 시도</Button> }
        >
          이 화면을 표시하는 중 문제가 생겼어요.
        </Alert>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
