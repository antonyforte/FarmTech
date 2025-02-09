export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>; // No wrapper, so no layout is inherited
  }
  