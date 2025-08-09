// src/components/AWLogo.tsx
export function AWLogo({ compact }: { compact?: boolean }) {
    if (compact) {
      return (
        <div className="flex items-center space-x-2 group">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-105">
            <span className="text-primary-foreground font-bold text-sm">AW</span>
          </div>
          <span className="sr-only">AccessWASH</span>
        </div>
      );
    }
  
    return (
      <div className="flex items-center space-x-3 group">
        <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-105">
          <span className="text-primary-foreground font-bold text-lg">AW</span>
        </div>
        <div className="transition-all duration-300">
          <div className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Access<span className="text-secondary">WASH</span>
          </div>
          <div className="text-sm text-muted-foreground font-medium">Customer & Utility Portal</div>
        </div>
      </div>
    );
  }
  
  export function AWNavLogo() {
    return (
      <div className="flex flex-row items-center space-x-2 text-2xl font-bold group">
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:scale-105 mr-1">
          <span className="text-primary-foreground font-bold text-xs">AW</span>
        </div>
        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Access</span>
        <span className="text-secondary">WASH</span>
      </div>
    );
  }
  