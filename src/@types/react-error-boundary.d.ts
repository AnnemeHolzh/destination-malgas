declare module 'react-error-boundary' {
  import { Component, ReactNode } from 'react';

  export interface ErrorBoundaryProps {
    FallbackComponent: ComponentType<{ error: Error; resetErrorBoundary: () => void }>;
    onReset?: () => void;
    children: ReactNode;
  }

  export class ErrorBoundary extends Component<ErrorBoundaryProps> {}
} 