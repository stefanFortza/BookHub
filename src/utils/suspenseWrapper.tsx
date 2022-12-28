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
}

const SuspenseWrapper = <T,>({
  resolve,
  children,
  errorElement,
}: SuspenseWrapperProps<T>) => {
  return (
    <Suspense fallback={<Spinner />}>
      <Await
        resolve={resolve}
        children={children}
        errorElement={errorElement}
      />
    </Suspense>
  );
};

export default SuspenseWrapper;
