// Headers, paragraphs etc. with fixed styles to use all over the app

interface Children {
  children: string;
}

function H1({ children }: Children) {
  return <h1 className="text-3xl font-bold tracking-wide">{children}</h1>;
}
function H2({ children }: Children) {
  return <h2 className="text-2xl font-semibold">{children}</h2>;
}
function H3({ children }: Children) {
  return <h3 className="text-xl font-semibold">{children}</h3>;
}

export { H1, H2, H3 };
