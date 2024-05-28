import Button from "./Button";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="flex h-dvh w-full items-center justify-center">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl">Something went wrong 🙄</h1>
        <p>{error.message}</p>
        <Button style="empty" callback={resetErrorBoundary}>
          Try again
        </Button>
      </div>
    </div>
  );
}

export default ErrorFallback;
