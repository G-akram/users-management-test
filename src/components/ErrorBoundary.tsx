import { Component } from "react";
import type { ReactNode, ErrorInfo } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // InFo || TODO, here we log/report the error to the error reporting service
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div
          role="alert"
          className="flex flex-col items-center justify-center py-24 text-center gap-4"
        >
          <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center"></div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Something went wrong
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xs font-mono">
              {this.state.error?.message ??
                "An unexpected rendering error occurred."}
            </p>
          </div>
          <button
            onClick={this.handleReset}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-brand-500 text-white text-sm font-medium hover:bg-brand-600 active:bg-brand-700 transition shadow-sm"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
