import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Container */}
      <main className="container mx-auto p-4">
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6">
          {children}
        </div>
      </main>

      {/* Alerts */}
      <Toaster position="top-center" richColors theme="light" />
    </div>
  );
}

export default Layout;
