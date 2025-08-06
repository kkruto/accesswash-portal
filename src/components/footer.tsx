export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">AccessWASH</h3>
            <p className="text-gray-600 text-sm">
              Connecting communities to clean water and sanitation services.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="/help" className="hover:text-gray-900">Help Center</a></li>
              <li><a href="/contact" className="hover:text-gray-900">Contact Us</a></li>
              <li><a href="/status" className="hover:text-gray-900">Service Status</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="/privacy" className="hover:text-gray-900">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-gray-900">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-gray-900">Twitter</a></li>
              <li><a href="#" className="hover:text-gray-900">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
          <p>&copy; 2024 AccessWASH. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
