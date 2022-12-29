import { Suspense } from "react";
import { Spinner } from "react-bootstrap";
import { Await } from "react-router-dom";

interface SuspenseWrapperProps<T> {
  resolve: Promise<T>;
  children:
    | React.ReactNode
    | {
        (data: Awaited<T>): React.ReactElement;
      };
  errorElement?: React.ReactNode;
  loadingComponent?: React.ReactNode;
}

const SuspenseWrapper = <T,>({
  resolve,
  children,
  errorElement,
  loadingComponent = <Spinner />,
}: SuspenseWrapperProps<T>) => {
  return (
    <Suspense fallback={loadingComponent}>
      <Await
        resolve={resolve}
        children={children}
        errorElement={errorElement}
      />
    </Suspense>
  );
};

export default SuspenseWrapper;
