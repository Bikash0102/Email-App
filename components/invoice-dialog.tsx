"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, X, Beaker, AlertTriangle, FileText, Calendar, Building } from "lucide-react"

interface EmailItem {
  description: string
  quantity: string
  unitPrice: number
  total: number
  cas: string
  hazardClass: string
  sdsRequired?: boolean
  storageTemp?: string
  purity?: string
}

interface InvoiceAnalysis {
  poNumber: string
  invoiceNumber: string
  vendor: string
  invoiceDate: string
  dueDate: string
  items: EmailItem[]
  subtotal: number
  hazmatFee: number
  shipping: number
  tax: number
  total: number
  paymentTerms: string
  status: string
  complianceNotes: string[]
}

interface Email {
  id: number
  type: string
  subject: string
  from: string
  to: string
  date: string
  time: string
  preview: string
  body: string
  isRead: boolean
  priority: string
  invoiceAnalysis?: InvoiceAnalysis
}

interface InvoiceDialogProps {
  email: Email
  onClose: () => void
}

export function InvoiceDialog({ email, onClose }: InvoiceDialogProps) {
  if (!email || !email.invoiceAnalysis) {
    return null
  }

  const { invoiceAnalysis } = email

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Beaker className="h-5 w-5 text-blue-600" />
            Chemical Invoice Details - {invoiceAnalysis.invoiceNumber}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Invoice Header */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Vendor Information
                </h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Company:</span> {invoiceAnalysis.vendor}
                  </div>
                  <div>
                    <span className="font-medium">Invoice #:</span> {invoiceAnalysis.invoiceNumber}
                  </div>
                  <div>
                    <span className="font-medium">PO Reference:</span> {invoiceAnalysis.poNumber}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Payment Information
                </h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Invoice Date:</span> {invoiceAnalysis.invoiceDate}
                  </div>
                  <div>
                    <span className="font-medium">Due Date:</span> {invoiceAnalysis.dueDate}
                  </div>
                  <div>
                    <span className="font-medium">Payment Terms:</span> {invoiceAnalysis.paymentTerms}
                  </div>
                  <div>
                    <span className="font-medium">Status:</span>
                    <Badge className="ml-2 bg-green-100 text-green-700">{invoiceAnalysis.status}</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chemical Items Table */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Chemical Line Items
            </h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="text-left p-3 font-medium text-slate-700">Chemical Description</th>
                    <th className="text-right p-3 font-medium text-slate-700">Quantity</th>
                    <th className="text-right p-3 font-medium text-slate-700">Unit Price</th>
                    <th className="text-right p-3 font-medium text-slate-700">Total</th>
                    <th className="text-center p-3 font-medium text-slate-700">CAS Number</th>
                    <th className="text-center p-3 font-medium text-slate-700">Hazard Class</th>
                    <th className="text-center p-3 font-medium text-slate-700">SDS</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceAnalysis.items.map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-3">
                        <div>
                          <div className="font-medium">{item.description}</div>
                          {item.purity !== "N/A" && <div className="text-xs text-slate-500">Purity: {item.purity}</div>}
                        </div>
                      </td>
                      <td className="p-3 text-right">{item.quantity}</td>
                      <td className="p-3 text-right">${item.unitPrice}</td>
                      <td className="p-3 text-right font-medium">${item.total.toLocaleString()}</td>
                      <td className="p-3 text-center text-xs font-mono">{item.cas}</td>
                      <td className="p-3 text-center">
                        {item.hazardClass !== "N/A" && (
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              item.hazardClass.includes("8")
                                ? "border-red-300 text-red-700"
                                : item.hazardClass.includes("3")
                                  ? "border-orange-300 text-orange-700"
                                  : "border-green-300 text-green-700"
                            }`}
                          >
                            {item.hazardClass}
                          </Badge>
                        )}
                      </td>
                      <td className="p-3 text-center">
                        {item.sdsRequired ? (
                          <AlertTriangle className="h-4 w-4 text-red-500 mx-auto" />
                        ) : (
                          <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Cost Summary */}
          <div className="bg-slate-50 border rounded-lg p-6">
            <h3 className="font-semibold text-slate-800 mb-4">Cost Breakdown</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Chemical Subtotal:</span>
                <span className="font-medium">${invoiceAnalysis.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Hazmat Handling Fee:</span>
                <span className="font-medium">${invoiceAnalysis.hazmatFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Shipping & Transportation:</span>
                <span className="font-medium">${invoiceAnalysis.shipping.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Tax:</span>
                <span className="font-medium">${invoiceAnalysis.tax.toLocaleString()}</span>
              </div>
              <Separator className="my-3" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total Amount:</span>
                <span className="text-blue-600">${invoiceAnalysis.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Compliance Notes */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Chemical Compliance & Safety
            </h3>
            <ul className="space-y-2">
              {invoiceAnalysis.complianceNotes.map((note, index) => (
                <li key={index} className="text-sm text-green-700 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                  {note}
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-4 border-t">
            <Button variant="outline" onClick={onClose} className="flex items-center gap-2">
              <X className="h-4 w-4" />
              Close
            </Button>
            <div className="flex gap-3">
              <Button variant="outline">Request Clarification</Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Approve Payment
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
