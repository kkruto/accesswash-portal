// src/components/footer.tsx
export function Footer() {
    return (
      <footer className="bg-gray-50 dark:bg-gray-900 border-t">
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} AccessWASH Technologies. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="/privacy" className="text-gray-500 text-sm">Privacy</a>
            <a href="/terms" className="text-gray-500 text-sm">Terms</a>
          </div>
        </div>
      </footer>
    );
  }
  