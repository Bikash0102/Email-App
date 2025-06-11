"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Check, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { ThreeWayMatchModal } from "./three-way-match-modal"

interface InvoiceDetailsModalProps {
  onClose: () => void
  onPaymentApproved: () => void
}

export function InvoiceDetailsModal({ onClose, onPaymentApproved }: InvoiceDetailsModalProps) {
  const [processingPayment, setProcessingPayment] = useState<boolean>(false)
  const [processingComplete, setProcessingComplete] = useState<boolean>(false)
  const [processingStep, setProcessingStep] = useState<number>(0)
  const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false)

  const handleApprovePayment = () => {
    setProcessingPayment(true)

    // Simulate processing steps
    const interval = setInterval(() => {
      setProcessingStep((prev) => {
        if (prev < 3) return prev + 1
        clearInterval(interval)

        // Set complete after all steps are done
        setTimeout(() => {
          setProcessingComplete(true)

          // Close modal after showing completion and notify parent
          setTimeout(() => {
            onClose()
            onPaymentApproved()
          }, 1500)
        }, 500)

        return prev
      })
    }, 800)
  }

  const processingSteps: string[] = [
    "Initiating payment approval...",
    "Validating invoice details...",
    "Sending to accounting system...",
    "Payment approved successfully!",
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white rounded-md shadow-2xl w-[95vw] h-[95vh] overflow-hidden flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {processingPayment ? (
          <div className="p-6 flex flex-col items-center justify-center h-full relative">
           

            <AnimatePresence mode="wait">
              {!processingComplete ? (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center max-w-md w-full z-10"
                >
                  <motion.div
                    className="mb-8 w-24 h-24 rounded-full border-4 border-blue-500 flex items-center justify-center"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  >
                    <motion.div
                      animate={{ y: [5, -5, 5] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M18 15L12 9L6 15"
                          stroke="#3498db"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.div>
                  </motion.div>

                  <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Processing Payment</h2>

                  <div className="w-full space-y-6">
                    {processingSteps.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{
                          opacity: processingStep >= index ? 1 : 0.5,
                          x: processingStep >= index ? 0 : -20,
                        }}
                        className="flex items-center"
                      >
                        <div className="mr-4">
                          {processingStep > index ? (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M20 6L9 17L4 12"
                                  stroke="#4CAF50"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </motion.div>
                          ) : processingStep === index ? (
                            <motion.div
                              animate={{ opacity: [0.4, 1, 0.4] }}
                              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                              className="h-3 w-3 rounded-full bg-blue-500"
                            />
                          ) : (
                            <div className="h-3 w-3 rounded-full bg-gray-300" />
                          )}
                        </div>
                        <p
                          className={`text-lg ${
                            processingStep >= index
                              ? (index === processingSteps.length - 1 && processingStep >= index)
                                ? "text-green-600 font-medium"
                                : "text-gray-900"
                              : "text-gray-400"
                          }`}
                        >
                          {step}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center max-w-md w-full z-10"
                >
                  <div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-6">
                    <div className="p-4 flex items-center gap-2 border-b border-gray-100">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M20 6L9 17L4 12"
                          stroke="#4CAF50"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <h3 className="text-lg font-medium text-green-600">Invoice Processed Successfully</h3>
                    </div>

                    <div className="p-4 border-b border-gray-100">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Invoice Details:</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Invoice Number:</span>
                          <span className="text-gray-900">INV-2025-0078</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">PO Number:</span>
                          <span className="text-gray-900">MRX-2025-0489</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Vendor:</span>
                          <span className="text-gray-900">Detroit Chemical Corporation</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Amount:</span>
                          <span className="text-gray-900">$800.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Due Date:</span>
                          <span className="text-gray-900">June 15, 2025</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">3-Way Match Verification:</h4>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-green-500 flex-shrink-0"
                          >
                            <path
                              d="M20 6L9 17L4 12"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span className="text-gray-700">Purchase Order #MRX-2025-0489 verified</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-green-500 flex-shrink-0"
                          >
                            <path
                              d="M20 6L9 17L4 12"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span className="text-gray-700">Goods Receipt #GR-2025-0112 verified</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-green-500 flex-shrink-0"
                          >
                            <path
                              d="M20 6L9 17L4 12"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span className="text-gray-700">Invoice #INV-2025-0078 validated</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-green-500 flex-shrink-0"
                          >
                            <path
                              d="M20 6L9 17L4 12"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span className="text-gray-700">Perfect 3-way match confirmed in SAP</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-green-500 flex-shrink-0"
                          >
                            <path
                              d="M20 6L9 17L4 12"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span className="text-gray-700">Payment scheduled for June 15, 2025</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      onClose()
                      onPaymentApproved()
                    }}
                    className="w-full py-3 text-lg bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Close
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <>
            <div className="p-5 border-b border-gray-200 flex justify-between items-center bg-blue-600">
              <h2 className="text-2xl font-semibold text-white flex items-center">
                <FileText className="mr-3 h-6 w-6" />
                Invoice Details
              </h2>
              <button onClick={onClose} className="text-white/70 hover:text-white">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex flex-col md:flex-row flex-1 overflow-hidden relative">
              {/* Invoice Document Preview */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="md:w-1/2 p-8 border-r border-gray-200 overflow-y-auto relative"
              >
                <div className="bg-white border border-gray-200 rounded-md p-10 shadow-sm max-w-4xl mx-auto">
                  <div className="flex justify-between items-start mb-10">
                    <div>
                      <h3 className="text-3xl font-bold text-blue-600">INVOICE</h3>
                      <p className="text-gray-600 text-lg mt-1">Invoice #INV-2025-0078</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">Detroit Chemical Corporation</div>
                      <p className="text-gray-600 text-lg">4750 Innovation Boulevard</p>
                      <p className="text-gray-600 text-lg">Detroit, Michigan</p>
                      <p className="text-gray-600 text-lg">USA</p>
                      <p className="text-gray-600 text-lg">accounting@detroitchem.com</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-10 mb-10">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-600 mb-3">BILL TO:</h4>
                      <p className="text-xl text-gray-900">Miraxeon</p>
                      <p className="text-gray-600 text-lg">23817 Miraxeon Drive</p>
                      <p className="text-gray-600 text-lg">Flint, Michigan</p>
                      <p className="text-gray-600 text-lg">USA</p>
                    </div>
                    <div>
                      <div className="grid grid-cols-2 gap-3 text-lg">
                        <div className="text-gray-600 font-semibold">Invoice Date:</div>
                        <div>May 16, 2025</div>

                        <div className="text-gray-600 font-semibold">Due Date:</div>
                        <div>June 15, 2025</div>

                        <div className="text-gray-600 font-semibold">PO Number:</div>
                        <div>MRX-2025-0489</div>

                        <div className="text-gray-600 font-semibold">Terms:</div>
                        <div>Net 30</div>
                      </div>
                    </div>
                  </div>

                  <table className="w-full mb-10 text-lg">
                    <thead className="border-b-2 border-t-2 border-gray-200">
                      <tr>
                        <th className="py-3 text-left text-gray-600">DESCRIPTION</th>
                        <th className="py-3 text-center text-gray-600">QTY</th>
                        <th className="py-3 text-right text-gray-600">UNIT PRICE</th>
                        <th className="py-3 text-right text-gray-600">AMOUNT</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="py-4">Sodium Hypochlorite</td>
                        <td className="py-4 text-center">500 gallons</td>
                        <td className="py-4 text-right">$1.45</td>
                        <td className="py-4 text-right">$725.00</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-4">Delivery Fee</td>
                        <td className="py-4 text-center">1</td>
                        <td className="py-4 text-right">$75.00</td>
                        <td className="py-4 text-right">$75.00</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="flex justify-end mb-10">
                    <div className="w-72">
                      <div className="flex justify-between py-3 text-lg">
                        <span className="text-gray-600">Subtotal:</span>
                        <span>$800.00</span>
                      </div>
                      <div className="flex justify-between py-3 text-lg">
                        <span className="text-gray-600">Tax (0%):</span>
                        <span>$0.00</span>
                      </div>
                      <div className="flex justify-between py-3 border-t-2 border-gray-200 font-bold text-xl">
                        <span>Total:</span>
                        <span>$800.00</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t-2 border-gray-200 pt-6 text-lg text-gray-600">
                    <p className="mb-3">
                      <span className="font-semibold">Payment Instructions:</span> Please make payment via bank transfer
                      to the account below.
                    </p>
                    <p>Bank: Pacific National Bank</p>
                    <p>Account: 7890-1234-5678</p>
                    <p>Routing: 123456789</p>
                    <p className="mt-4">Please include invoice number in the payment reference.</p>
                  </div>
                </div>
              </motion.div>

              {/* Invoice Details and Verification */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="md:w-1/2 p-8 overflow-y-auto relative"
              >
                <div className="max-w-2xl mx-auto">
                  <div className="flex items-center gap-3 mb-8">
                    <Check className="h-8 w-8 text-green-600" />
                    <h3 className="text-2xl font-medium text-green-600">Invoice Processed Successfully</h3>
                  </div>

                  <div className="bg-gray-50 rounded-md p-6 mb-8 border border-gray-200">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Invoice Details:</h4>
                    <div className="space-y-4 text-lg">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Invoice Number:</span>
                        <span className="text-gray-900">INV-2025-0078</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">PO Number:</span>
                        <span className="text-gray-900">MRX-2025-0489</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Vendor:</span>
                        <span className="text-gray-900">Detroit Chemical Corporation</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Amount:</span>
                        <span className="text-gray-900">$800.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Due Date:</span>
                        <span className="text-gray-900">June 15, 2025</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Invoice Date:</span>
                        <span className="text-gray-900">May 16, 2025</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-md p-6 mb-8 border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-lg font-medium text-gray-900">3-Way Match Verification:</h4>
                      <button
                        onClick={() => setShowDetailsModal(true)}
                        className="text-sm bg-blue-500 text-white px-3 py-1 rounded-sm hover:bg-blue-600"
                      >
                        Additional Details
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Check className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-lg text-gray-900">Purchase Order Verification</p>
                          <p className="text-sm text-gray-600">
                            PO #MRX-2025-0489 matches invoice line items, quantities, and prices
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-lg text-gray-900">Goods Receipt Verification</p>
                          <p className="text-sm text-gray-600">
                            Receipt #GR-2025-0112 confirms delivery of 500 gallons of Sodium Hypochlorite
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-lg text-gray-900">Invoice Validation</p>
                          <p className="text-sm text-gray-600">
                            Invoice #INV-2025-0078 correctly reflects ordered and received items
                          </p>
                        </div>
                      </div>
                      <div className="bg-green-50 p-3 rounded-md border border-green-200 mt-2">
                        <div className="flex items-center gap-2 mb-2">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
                              stroke="#22C55E"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M22 4L12 14.01l-3-3"
                              stroke="#22C55E"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <p className="text-lg font-medium text-green-700">Perfect 3-Way Match</p>
                        </div>
                        <p className="text-sm text-green-700">
                          All documents are in complete agreement. The system has verified that what was ordered matches
                          what was received and what is being billed.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-md p-6 mb-8 border border-gray-200">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Process Summary:</h4>
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center">
                        <span className="text-gray-600 mr-2">Payment Terms:</span>
                        <span className="text-gray-900">Net 30</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-600 mr-2">Payment Due:</span>
                        <span className="text-gray-900">June 15, 2025</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-600 mr-2">Payment Status:</span>
                        <span className="text-amber-600 font-medium">Pending Approval</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-10">
                    <Button
                      variant="outline"
                      onClick={onClose}
                      className="flex-1 py-6 text-lg border-gray-200 text-gray-900 hover:bg-gray-100"
                    >
                      Close
                    </Button>
                    <Button
                      onClick={handleApprovePayment}
                      className="flex-1 py-6 text-lg bg-blue-600 text-white hover:bg-blue-700"
                    >
                      <FileText className="mr-2 h-5 w-5" />
                      Approve for Payment
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </motion.div>
      {showDetailsModal && <ThreeWayMatchModal onClose={() => setShowDetailsModal(false)} />}
    </motion.div>
  )
}
