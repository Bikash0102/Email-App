"use client"

import { motion } from "framer-motion"
import { X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"


interface ReviewChangesModalProps {
  onClose: () => void
  onAccept: () => void
}

export function ReviewChangesModal({ onClose, onAccept }: ReviewChangesModalProps) {
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
        className="bg-white rounded-md shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
     
        {/* Main content */}
        <div className="flex-1 flex flex-col max-h-[90vh] relative z-10">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Review PO Changes</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Current PO */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Current PO</h3>
                <div className="border border-gray-200 rounded-md overflow-hidden">
                  <div className="bg-gray-50 p-4 border-b border-gray-200">
                    <h4 className="font-medium text-gray-900">Purchase Order #MRX-2025-0489</h4>
                    <p className="text-sm text-gray-600">Created: May 13, 2025</p>
                  </div>

                  <div className="p-4">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Vendor</p>
                        <p className="text-gray-900">Detroit Chemicals</p>
                        <p className="text-xs text-gray-600">4750 Innovation Boulevard</p>
                        <p className="text-xs text-gray-600">Detroit, Michigan</p>
                      </div>

                      <div className="border-t border-gray-200 pt-4">
                        <p className="text-sm font-medium text-gray-600 mb-2">Items</p>

                        <div className="border border-gray-200 rounded-md">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                  Item
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                  Qty
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                  Unit Price
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                  Total
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              <tr>
                                <td className="px-4 py-3 text-sm text-gray-900">Sodium Hypochlorite</td>
                                <td className="px-4 py-3 text-sm text-gray-900">500 gallons</td>
                                <td className="px-4 py-3 text-sm text-gray-900">$1.25/gallon</td>
                                <td className="px-4 py-3 text-sm text-gray-900">$625.00</td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 text-sm text-gray-900">Delivery Fee</td>
                                <td className="px-4 py-3 text-sm text-gray-900">1</td>
                                <td className="px-4 py-3 text-sm text-gray-900">$75.00</td>
                                <td className="px-4 py-3 text-sm text-gray-900">$75.00</td>
                              </tr>
                            </tbody>
                            <tfoot className="bg-gray-50">
                              <tr>
                                <td colSpan={3} className="px-4 py-2 text-sm font-medium text-gray-900 text-right">
                                  Total:
                                </td>
                                <td className="px-4 py-2 text-sm font-medium text-gray-900">$700.00</td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Updated PO */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Updated PO</h3>
                <div className="border border-gray-200 rounded-md overflow-hidden">
                  <div className="bg-gray-50 p-4 border-b border-gray-200">
                    <h4 className="font-medium text-gray-900">Purchase Order #MRX-2025-0489 (Updated)</h4>
                    <p className="text-sm text-gray-600">Modified: May 16, 2025</p>
                  </div>

                  <div className="p-4">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Vendor</p>
                        <p className="text-gray-900">Detroit Chemicals</p>
                        <p className="text-xs text-gray-600">4750 Innovation Boulevard</p>
                        <p className="text-xs text-gray-600">Detroit, Michigan</p>
                      </div>

                      <div className="border-t border-gray-200 pt-4">
                        <p className="text-sm font-medium text-gray-600 mb-2">Items</p>

                        <div className="border border-gray-200 rounded-md">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                  Item
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                  Qty
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                  Unit Price
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                  Total
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              <tr className="bg-green-50">
                                <td className="px-4 py-3 text-sm text-gray-900">Sodium Hypochlorite</td>
                                <td className="px-4 py-3 text-sm text-gray-900">500 gallons</td>
                                <td className="px-4 py-3 text-sm font-medium text-green-600">$1.45/gallon</td>
                                <td className="px-4 py-3 text-sm font-medium text-green-600">$725.00</td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 text-sm text-gray-900">Delivery Fee</td>
                                <td className="px-4 py-3 text-sm text-gray-900">1</td>
                                <td className="px-4 py-3 text-sm text-gray-900">$75.00</td>
                                <td className="px-4 py-3 text-sm text-gray-900">$75.00</td>
                              </tr>
                            </tbody>
                            <tfoot className="bg-gray-50">
                              <tr>
                                <td colSpan={3} className="px-4 py-2 text-sm font-medium text-gray-900 text-right">
                                  Total:
                                </td>
                                <td className="px-4 py-2 text-sm font-medium text-green-600">$800.00</td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Changes Summary */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Changes Summary</h3>
              <div className="border border-gray-200 rounded-md overflow-hidden">
                <div className="bg-gray-50 p-4 border-b border-gray-200">
                  <h4 className="font-medium text-gray-900">Modifications to PO #MRX-2025-0489</h4>
                </div>
                <div className="p-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900 mb-2">Price Update:</p>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-red-500 flex-shrink-0"></div>
                          <p className="text-sm text-gray-900">
                            Sodium Hypochlorite unit price: <span className="line-through">$1.25/gallon</span>
                          </p>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-4 h-4 rounded-full bg-green-500 flex-shrink-0"></div>
                          <p className="text-sm text-gray-900">
                            Sodium Hypochlorite unit price: <span className="font-medium">$1.45/gallon</span>
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-900 mb-2">Total Impact:</p>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-red-500 flex-shrink-0"></div>
                          <p className="text-sm text-gray-900">
                            Previous total: <span className="line-through">$700.00</span>
                          </p>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-4 h-4 rounded-full bg-green-500 flex-shrink-0"></div>
                          <p className="text-sm text-gray-900">
                            New total: <span className="font-medium">$800.00</span> (14.3% increase)
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-900 mb-2">Justification:</p>
                        <p className="text-sm text-gray-900">
                          Previous purchase history shows we ordered 100 gallons of Sodium Hypochlorite at $1.45/gallon
                          in March 2025. The updated price aligns with our previous purchase history.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 flex justify-end">
            <Button
              variant="outline"
              onClick={onClose}
              className="mr-2 border-gray-200 text-gray-900 hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button onClick={onAccept} className="bg-blue-600 text-white hover:bg-blue-700">
              <Check className="mr-2 h-4 w-4" />
              Accept Changes
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
