// src/components/AWLogo.tsx
export function AWLogo({ compact }: { compact?: boolean }) {
    if (compact) {
      return (
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">AW</span>
          </div>
          <span className="sr-only">AccessWASH</span>
        </div>
      );
    }
  
    return (
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
          <span className="text-primary-foreground font-bold">AW</span>
        </div>
        <div>
          <div className="text-lg font-semibold">Access<span className="text-blue-500">WASH</span></div>
          <div className="text-xs text-muted-foreground">Customer & Utility Portal</div>
        </div>
      </div>
    );
  }
  
  export function AWNavLogo() {
    return (
      <div className="flex flex-row items-center space-x-2 text-xl">
        <span className="text-gray-800">Access</span>
        <span className="text-blue-500">WASH</span>
      </div>
    );
  }
  