import Header from './Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container flex flex-col min-h-screen">
      <Header />
      <main className="mt-6">{children}</main>
    </div>
  );
}
