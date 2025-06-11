"use client"

import { motion } from "framer-motion"
import { X, Check, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ThreeWayMatchModalProps {
  onClose: () => void
}

export function ThreeWayMatchModal({ onClose }: ThreeWayMatchModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white rounded-md shadow-xl w-full max-w-4xl max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-gray-200 flex justify-between items-center bg-blue-600">
          <h2 className="text-xl font-semibold text-white flex items-center">
            <FileText className="mr-3 h-5 w-5" />
            3-Way Match Details
          </h2>
          <button onClick={onClose} className="text-white/70 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <div className="bg-gray-50 p-3 border-b border-gray-200">
                <h3 className="font-medium text-gray-800">Purchase Order</h3>
                <p className="text-sm text-gray-500">MRX-2025-0489</p>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Vendor:</p>
                    <p className="text-gray-800">Detroit Chemical Corporation</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Date:</p>
                    <p className="text-gray-800">May 13, 2025</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Items:</p>
                    <ul className="text-sm text-gray-800 space-y-2 mt-1">
                      <li className="flex justify-between">
                        <span>Sodium Hypochlorite (500 gal)</span>
                        <span>$725.00</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Delivery Fee</span>
                        <span>$75.00</span>
                      </li>
                    </ul>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-sm font-medium text-gray-600">Total:</p>
                    <p className="text-gray-800 font-medium">$800.00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-md overflow-hidden">
              <div className="bg-gray-50 p-3 border-b border-gray-200">
                <h3 className="font-medium text-gray-800">Goods Receipt</h3>
                <p className="text-sm text-gray-500">GR-2025-0112</p>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Received By:</p>
                    <p className="text-gray-800">John Smith</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Date:</p>
                    <p className="text-gray-800">May 15, 2025</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Items Received:</p>
                    <ul className="text-sm text-gray-800 space-y-2 mt-1">
                      <li className="flex justify-between">
                        <span>Sodium Hypochlorite</span>
                        <span>500 gal</span>
                      </li>
                    </ul>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-sm font-medium text-gray-600">Status:</p>
                    <p className="text-green-600 font-medium">Complete</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-md overflow-hidden">
              <div className="bg-gray-50 p-3 border-b border-gray-200">
                <h3 className="font-medium text-gray-800">Invoice</h3>
                <p className="text-sm text-gray-500">INV-2025-0078</p>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Vendor:</p>
                    <p className="text-gray-800">Detroit Chemical Corporation</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Date:</p>
                    <p className="text-gray-800">May 16, 2025</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Items:</p>
                    <ul className="text-sm text-gray-800 space-y-2 mt-1">
                      <li className="flex justify-between">
                        <span>Sodium Hypochlorite (500 gal)</span>
                        <span>$725.00</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Delivery Fee</span>
                        <span>$75.00</span>
                      </li>
                    </ul>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-sm font-medium text-gray-600">Total:</p>
                    <p className="text-gray-800 font-medium">$800.00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-md p-5 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-green-800">Perfect 3-Way Match Confirmed</h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-green-800 font-medium">Purchase Order and Invoice Match</p>
                  <p className="text-sm text-green-700">All line items, quantities, and prices match exactly</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-green-800 font-medium">Goods Receipt and Purchase Order Match</p>
                  <p className="text-sm text-green-700">All ordered items were received in the correct quantities</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-green-800 font-medium">Invoice and Goods Receipt Match</p>
                  <p className="text-sm text-green-700">Invoice correctly reflects what was received</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-md p-5">
            <h3 className="text-lg font-medium text-blue-800 mb-3">Verification Details</h3>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-blue-800 mb-1">Document Flow:</p>
                <ol className="list-decimal list-inside text-sm text-blue-700 space-y-1 ml-2">
                  <li>Purchase Order created on May 13, 2025</li>
                  <li>Goods Receipt processed on May 15, 2025</li>
                  <li>Invoice received on May 16, 2025</li>
                  <li>3-way match verification completed on May 16, 2025</li>
                </ol>
              </div>

              <div>
                <p className="text-sm font-medium text-blue-800 mb-1">Verification Method:</p>
                <p className="text-sm text-blue-700">
                  Automated system verification with manual review by Accounts Payable department.
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-blue-800 mb-1">Next Steps:</p>
                <p className="text-sm text-blue-700">
                  Invoice is approved for payment according to payment terms (Net 30). Payment will be processed
                  automatically on the due date.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 flex justify-end">
          <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700 text-white">
            Close
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}
