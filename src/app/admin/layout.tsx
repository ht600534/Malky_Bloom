export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`body{background:#fff!important}`}</style>
      {children}
    </>
  );
}

