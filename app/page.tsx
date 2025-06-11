"use client"

import { useState } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { EmailHeader } from "@/components/email-header"
import { EmailSidebar } from "@/components/email-sidebar"
import { EmailList } from "@/components/email-list"
import { EmailDetail } from "@/components/email-detail"
import { InvoiceDialog } from "@/components/invoice-dialog"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AnalysisModal } from "@/components/analysis-model"
import {
  AlertTriangle,
  TrendingUp,
  X,
  CheckCircle,
  Beaker,
  MessageSquare,
  Send,
  Edit3,
  Copy,
  FileText,
  ArrowRight,
  Share2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ReviewChangesModal } from "@/components/review-changes-modal"
import { InvoiceDetailsModal } from "@/components/invoice-details-modal"

// Type definitions
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

interface PurchaseOrder {
  poNumber: string
  date: string
  supplier: string
  items: EmailItem[]
  subtotal: number
  shipping: number
  hazmatFee: number
  total: number
}

interface EmailAnalysis {
  summary?: string
  reason?: string
  details: string[]
  suggestedResponse?: string
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
  analysis?: EmailAnalysis
  originalPO?: PurchaseOrder
  modifiedPO?: PurchaseOrder
  invoiceAnalysis?: InvoiceAnalysis
}

interface EmailCounts {
  inbox: number
  drafts: number
  sent: number
  trash: number
}

// ChangesDialog Component
function ChangesDialog({ email, onClose }: { email: Email; onClose: () => void }) {
  if (!email || !email.originalPO || !email.modifiedPO) {
    return null
  }

  const { originalPO, modifiedPO } = email
  const priceDifference = modifiedPO.total - originalPO.total
  const percentageChange = ((priceDifference / originalPO.total) * 100).toFixed(1)

  const getChangeType = (original: number, modified: number) => {
    if (modified > original) return { type: "increase", color: "text-red-600", symbol: "+" }
    if (modified < original) return { type: "decrease", color: "text-green-600", symbol: "" }
    return { type: "no-change", color: "text-slate-600", symbol: "" }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Beaker className="h-5 w-5 text-red-600" />
            Chemical Purchase Order Changes - {originalPO.poNumber}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Summary Card */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-red-800 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Price Change Summary
              </h3>
              <div className="text-right">
                <p className="text-sm text-red-600">Total Impact</p>
                <p className="text-2xl font-bold text-red-600">
                  +${priceDifference.toLocaleString()} ({percentageChange}%)
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-slate-600">Original Total:</span>
                <p className="font-semibold text-slate-800">${originalPO.total.toLocaleString()}</p>
              </div>
              <div>
                <span className="text-slate-600">Revised Total:</span>
                <p className="font-semibold text-red-600">${modifiedPO.total.toLocaleString()}</p>
              </div>
              <div>
                <span className="text-slate-600">Supplier:</span>
                <p className="font-semibold text-slate-800">{originalPO.supplier}</p>
              </div>
            </div>
          </div>

          {/* Detailed Changes Table */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Chemical Line Item Changes
            </h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="text-left p-4 font-medium text-slate-700">Chemical Description</th>
                    <th className="text-center p-4 font-medium text-slate-700">CAS Number</th>
                    <th className="text-right p-4 font-medium text-slate-700">Original Price</th>
                    <th className="text-right p-4 font-medium text-slate-700">New Price</th>
                    <th className="text-right p-4 font-medium text-slate-700">Change</th>
                    <th className="text-right p-4 font-medium text-slate-700">Impact</th>
                  </tr>
                </thead>
                <tbody>
                  {originalPO.items.map((originalItem, index) => {
                    const modifiedItem = modifiedPO.items[index]
                    const priceChange = modifiedItem.unitPrice - originalItem.unitPrice
                    const totalChange = modifiedItem.total - originalItem.total
                    const changeInfo = getChangeType(originalItem.unitPrice, modifiedItem.unitPrice)
                    const hasChange = priceChange !== 0

                    return (
                      <tr key={index} className={cn("border-t", hasChange && "bg-red-50")}>
                        <td className="p-4">
                          <div>
                            <div className="font-medium text-slate-800">{originalItem.description}</div>
                            <div className="text-xs text-slate-500">Quantity: {originalItem.quantity}</div>
                          </div>
                        </td>
                        <td className="p-4 text-center text-xs font-mono">{originalItem.cas}</td>
                        <td className="p-4 text-right font-medium">${originalItem.unitPrice.toFixed(2)}</td>
                        <td className={cn("p-4 text-right font-medium", hasChange && "text-red-600 font-bold")}>
                          ${modifiedItem.unitPrice.toFixed(2)}
                        </td>
                        <td className={cn("p-4 text-right font-medium", changeInfo.color)}>
                          {hasChange ? (
                            <>
                              {changeInfo.symbol}${Math.abs(priceChange).toFixed(2)}
                              <div className="text-xs">
                                ({changeInfo.symbol}
                                {Math.abs((priceChange / originalItem.unitPrice) * 100).toFixed(1)}%)
                              </div>
                            </>
                          ) : (
                            "No change"
                          )}
                        </td>
                        <td className={cn("p-4 text-right font-bold", hasChange ? "text-red-600" : "text-slate-600")}>
                          {hasChange ? `+$${totalChange.toLocaleString()}` : "$0"}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Cost Breakdown Comparison */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-slate-50 border rounded-lg p-4">
              <h4 className="font-semibold text-slate-800 mb-3">Original Costs</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Chemical Subtotal:</span>
                  <span className="font-medium">${originalPO.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="font-medium">${originalPO.shipping.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Hazmat Fee:</span>
                  <span className="font-medium">${originalPO.hazmatFee.toLocaleString()}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>${originalPO.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 mb-3">Revised Costs</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Chemical Subtotal:</span>
                  <span
                    className={cn(
                      "font-medium",
                      modifiedPO.subtotal !== originalPO.subtotal && "text-red-600 font-bold",
                    )}
                  >
                    ${modifiedPO.subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span
                    className={cn(
                      "font-medium",
                      modifiedPO.shipping !== originalPO.shipping && "text-red-600 font-bold",
                    )}
                  >
                    ${modifiedPO.shipping.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Hazmat Fee:</span>
                  <span
                    className={cn(
                      "font-medium",
                      modifiedPO.hazmatFee !== originalPO.hazmatFee && "text-red-600 font-bold",
                    )}
                  >
                    ${modifiedPO.hazmatFee.toLocaleString()}
                  </span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold text-red-600">
                  <span>Total:</span>
                  <span>${modifiedPO.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Market Analysis */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h3 className="font-semibold text-amber-800 mb-3">Market Analysis & Recommendations</h3>
            <div className="space-y-2 text-sm text-amber-700">
              <p>
                • <strong>Primary Driver:</strong> Petrochemical supply chain disruptions affecting solvent prices
              </p>
              <p>
                • <strong>Market Trend:</strong> Upward pressure expected to continue through Q1 2024
              </p>
              <p>
                • <strong>Alternative Options:</strong> Consider bulk purchasing or alternative suppliers
              </p>
              <p>
                • <strong>Budget Impact:</strong> 16.7% increase requires budget reallocation approval
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-4 border-t">
            <Button variant="outline" onClick={onClose} className="flex items-center gap-2">
              <X className="h-4 w-4" />
              Close
            </Button>
            <div className="flex gap-3">
              <Button variant="destructive">Reject Changes</Button>
              <Button variant="outline">Request Alternative Quote</Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Approve Changes
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ResponseDialog Component
function ResponseDialog({ email, onClose }: { email: Email; onClose: () => void }) {
  const [responseText, setResponseText] = useState(email?.analysis?.suggestedResponse || "")
  const [isEditing, setIsEditing] = useState(false)

  if (!email || !email.analysis) {
    return null
  }

  const handleCopyResponse = () => {
    navigator.clipboard.writeText(responseText)
  }

  const handleSendResponse = () => {
    console.log("Sending response:", responseText)
    onClose()
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <MessageSquare className="h-5 w-5 text-amber-600" />
            Response for Missing PO Invoice - {email.subject.split("#")[1]?.split(" ")[0]}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Analysis Summary */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <h3 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Analysis Summary
            </h3>
            <div className="space-y-3">
              <div>
                <span className="font-medium text-amber-800">Issue:</span>
                <p className="text-sm text-amber-700 mt-1">{email.analysis.reason}</p>
              </div>
              <div>
                <span className="font-medium text-amber-800">Key Details:</span>
                <ul className="text-sm text-amber-700 mt-1 space-y-1">
                  {email.analysis.details.map((detail: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Response Composition */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-800">Suggested Response</h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-1"
                >
                  <Edit3 className="h-3 w-3" />
                  {isEditing ? "Preview" : "Edit"}
                </Button>
                <Button variant="outline" size="sm" onClick={handleCopyResponse} className="flex items-center gap-1">
                  <Copy className="h-3 w-3" />
                  Copy
                </Button>
              </div>
            </div>

            {isEditing ? (
              <Textarea
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                className="min-h-[300px] font-mono text-sm"
                placeholder="Edit your response here..."
              />
            ) : (
              <div className="bg-white border border-slate-200 rounded-lg p-4 min-h-[300px]">
                <div className="space-y-4">
                  {/* Email Header */}
                  <div className="border-b pb-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-slate-600">To:</span>
                        <p className="text-slate-800">{email.from}</p>
                      </div>
                      <div>
                        <span className="font-medium text-slate-600">From:</span>
                        <p className="text-slate-800">{email.to}</p>
                      </div>
                      <div className="col-span-2">
                        <span className="font-medium text-slate-600">Subject:</span>
                        <p className="text-slate-800">Re: {email.subject}</p>
                      </div>
                    </div>
                  </div>

                  {/* Email Body */}
                  <div className="whitespace-pre-line text-sm text-slate-700 leading-relaxed">{responseText}</div>
                </div>
              </div>
            )}
          </div>

          {/* Response Options */}
          <div className="bg-slate-50 border rounded-lg p-4">
            <h4 className="font-semibold text-slate-800 mb-3">Response Options</h4>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <Badge variant="outline" className="mb-2">
                  Standard
                </Badge>
                <p className="text-xs text-slate-600">Professional tone, requests PO number</p>
              </div>
              <div className="text-center">
                <Badge variant="outline" className="mb-2">
                  Urgent
                </Badge>
                <p className="text-xs text-slate-600">Expedited processing request</p>
              </div>
              <div className="text-center">
                <Badge variant="outline" className="mb-2">
                  Escalation
                </Badge>
                <p className="text-xs text-slate-600">Involves management approval</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-4 border-t">
            <Button variant="outline" onClick={onClose} className="flex items-center gap-2">
              <X className="h-4 w-4" />
              Cancel
            </Button>
            <div className="flex gap-3">
              <Button variant="outline">Save as Draft</Button>
              <Button
                onClick={handleSendResponse}
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
              >
                <Send className="h-4 w-4" />
                Send Response
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Mock email data with chemical company context
const mockEmails: Record<string, Email[]> = {
  inbox: [
    {
      id: 1,
      type: "PO Acknowledgment",
      subject: "PO #CHM-12345 - Chemical Order Acknowledgment",
      from: "orders@chemicalsupplier.com",
      to: "procurement@chemcorp.com",
      date: "2024-01-15",
      time: "10:30 AM",
      preview: "Thank you for your chemical order. We acknowledge receipt...",
      body: `Dear ChemCorp Procurement Team,

We acknowledge receipt of your Purchase Order #CHM-12345 dated January 15, 2024.

Chemical Order Details:
- Sodium Hydroxide (NaOH) - 500kg
- Sulfuric Acid (H2SO4) - 200L
- Acetone (C3H6O) - 100L
- Total Amount: $8,500.00

All chemicals will be shipped with proper SDS documentation and hazmat certifications.

Expected delivery: January 25, 2024
Carrier: ChemLogistics Express

Thank you for your business.

Best regards,
Chemical Supplier Inc.
Order Processing Team`,
      isRead: false,
      priority: "normal",
    },
  ],
  drafts: [
    {
      id: 2,
      type: "PO Discrepancy Alert",
      subject: "ALERT: Chemical Price Discrepancy in PO #CHM-12346",
      from: "alerts@chemsystem.com",
      to: "procurement@chemcorp.com",
      date: "2024-01-16",
      time: "2:15 PM",
      preview: "Price discrepancy detected in chemical purchase order...",
      body: `CHEMICAL PURCHASE ORDER DISCREPANCY ALERT

PO Number: #CHM-12346
Discrepancy Type: Price Mismatch
Chemical Category: Industrial Solvents

Original PO Amount: $15,000.00
Received Quote: $17,500.00
Difference: +$2,500.00 (+16.7%)

Affected Chemicals:
- Methanol (CH3OH): Price increased from $2.50/L to $3.00/L
- Ethanol (C2H5OH): Price increased from $3.00/L to $3.50/L
- Benzene (C6H6): Price increased from $4.00/L to $4.75/L

Reason: Raw material cost inflation and supply chain disruptions

Please review and take appropriate action.
Best regards,
System Generated Alert
ChemCorp Procurement Management System`,
      isRead: false,
      priority: "high",
      analysis: {
        summary:
          "Chemical price discrepancy of $2,500 (16.7% increase) detected in PO #CHM-12346 due to market volatility",
        details: [
          "Original quoted price: $15,000.00",
          "New quoted price: $17,500.00",
          "Primary cause: Raw material shortage in petrochemical sector",
          "Supplier: Industrial Chemical Solutions Ltd.",
          "Impact: Budget overrun of 16.7%",
          "Market trend: Upward price pressure expected to continue Q1 2024",
        ],
      },
      originalPO: {
        poNumber: "CHM-12346",
        date: "2024-01-10",
        supplier: "Industrial Chemical Solutions Ltd.",
        items: [
          {
            description: "Methanol (CH3OH) - 99.9% Purity",
            quantity: "2000L",
            unitPrice: 2.5,
            total: 5000,
            cas: "67-56-1",
            hazardClass: "3",
          },
          {
            description: "Ethanol (C2H5OH) - 95% Purity",
            quantity: "1500L",
            unitPrice: 3.0,
            total: 4500,
            cas: "64-17-5",
            hazardClass: "3",
          },
          {
            description: "Benzene (C6H6) - Technical Grade",
            quantity: "1000L",
            unitPrice: 4.0,
            total: 4000,
            cas: "71-43-2",
            hazardClass: "1",
          },
        ],
        subtotal: 13500,
        shipping: 1000,
        hazmatFee: 500,
        total: 15000,
      },
      modifiedPO: {
        poNumber: "CHM-12346-REV1",
        date: "2024-01-16",
        supplier: "Industrial Chemical Solutions Ltd.",
        items: [
          {
            description: "Methanol (CH3OH) - 99.9% Purity",
            quantity: "2000L",
            unitPrice: 3.0,
            total: 6000,
            cas: "67-56-1",
            hazardClass: "3",
          },
          {
            description: "Ethanol (C2H5OH) - 95% Purity",
            quantity: "1500L",
            unitPrice: 3.5,
            total: 5250,
            cas: "64-17-5",
            hazardClass: "3",
          },
          {
            description: "Benzene (C6H6) - Technical Grade",
            quantity: "1000L",
            unitPrice: 4.75,
            total: 4750,
            cas: "71-43-2",
            hazardClass: "1",
          },
        ],
        subtotal: 16000,
        shipping: 1000,
        hazmatFee: 500,
        total: 17500,
      },
    },
    {
      id: 3,
      type: "Invoice Missing PO",
      subject: "Invoice #INV-CHM-789 - Missing Purchase Order",
      from: "billing@chemvendor.com",
      to: "accounts@chemcorp.com",
      date: "2024-01-17",
      time: "11:45 AM",
      preview: "Chemical invoice received without corresponding PO...",
      body: `Dear ChemCorp Accounts Payable Team,

CHEMICAL INVOICE PROCESSING ALERT

Invoice Number: INV-CHM-789
Vendor: Specialty Chemicals Inc.
Amount: $12,800.00
Date: January 17, 2024
Service Period: December 2023

Issue: No matching purchase order found in system.

Chemical Invoice Details:
- Laboratory Grade Reagents: $8,400.00
- Analytical Standards: $2,900.00
- Custom Synthesis Services: $1,500.00

All chemicals shipped with COA and SDS documentation.

Please provide PO number or approve invoice for payment.

Best regards,
Specialty Chemicals Inc.
Billing Department`,
      isRead: true,
      priority: "normal",
      analysis: {
        reason: "No matching purchase order found for specialty chemical invoice",
        details: [
          "Invoice amount: $12,800.00",
          "Vendor: Specialty Chemicals Inc.",
          "Service period: December 2023",
          "Chemical category: Laboratory reagents and analytical standards",
          "Possible causes: Emergency purchase, PO number mismatch, or R&D direct order",
        ],
        suggestedResponse: `Dear Specialty Chemicals Inc.,

We have received your invoice #INV-CHM-789 for laboratory chemicals and services. However, we cannot locate the corresponding purchase order in our procurement system.

Please provide the PO number or contact our procurement team at procurement@chemcorp.com to resolve this issue.

If this was an emergency purchase, please provide the authorization details from our R&D department.

Best regards,
ChemCorp Accounts Payable Team`,
      },
    },
    {
      id: 4,
      type: "Invoice Received",
      subject: "Chemical Invoice #INV-CHM-456 Received",
      from: "invoices@chemicalsupply.com",
      to: "accounts@chemcorp.com",
      date: "2024-01-18",
      time: "9:20 AM",
      preview: "Chemical invoice received for PO #CHM-12347...",
      body: `Dear ChemCorp Customer,
Chemical Invoice #INV-CHM-456 has been received and is ready for processing.

Invoice Details:
PO Reference: #CHM-12347
Amount: $24,750.00
Due Date: February 15, 2024

Chemical Line Items:
- Hydrochloric Acid (HCl) - 37% (1000L): $3,500.00
- Sodium Chloride (NaCl) - Industrial Grade (2000kg): $1,200.00
- Calcium Carbonate (CaCO3) - Precipitated (500kg): $2,800.00
- Laboratory Analysis Services: $4,250.00
- Hazmat Handling & Transportation: $1,500.00

All chemicals include SDS, COA, and regulatory compliance documentation.
Payment Terms: Net 30
Payment Method: Bank Transfer
Please process payment by the due date.

Best regards,
Premium Chemical Supply Co.
Billing Department`,
      isRead: false,
      priority: "normal",
      invoiceAnalysis: {
        poNumber: "CHM-12347",
        invoiceNumber: "INV-CHM-456",
        vendor: "Premium Chemical Supply Co.",
        invoiceDate: "2024-01-18",
        dueDate: "2024-02-15",
        items: [
          {
            description: "Hydrochloric Acid (HCl) - 37%",
            quantity: "1000L",
            unitPrice: 3.5,
            total: 3500,
            cas: "7647-01-0",
            hazardClass: "8",
            sdsRequired: true,
            storageTemp: "Room Temperature",
            purity: "37%",
          },
          {
            description: "Sodium Chloride (NaCl) - Industrial Grade",
            quantity: "2000kg",
            unitPrice: 0.6,
            total: 1200,
            cas: "7647-14-5",
            hazardClass: "Non-hazardous",
            sdsRequired: false,
            storageTemp: "Room Temperature",
            purity: "99.5%",
          },
          {
            description: "Calcium Carbonate (CaCO3) - Precipitated",
            quantity: "500kg",
            unitPrice: 5.6,
            total: 2800,
            cas: "471-34-1",
            hazardClass: "Non-hazardous",
            sdsRequired: false,
            storageTemp: "Room Temperature",
            purity: "98.5%",
          },
          {
            description: "Laboratory Analysis Services",
            quantity: "1",
            unitPrice: 4250,
            total: 4250,
            cas: "N/A",
            hazardClass: "N/A",
            sdsRequired: false,
            storageTemp: "N/A",
            purity: "N/A",
          },
        ],
        subtotal: 11750,
        hazmatFee: 1500,
        shipping: 2000,
        tax: 1175,
        total: 16425,
        paymentTerms: "Net 30",
        status: "Approved for Payment",
        complianceNotes: [
          "All chemicals meet FDA/EPA regulatory standards",
          "SDS documentation provided for hazardous materials",
          "COA certificates included for all chemical lots",
          "Proper hazmat labeling and packaging confirmed",
        ],
      },
    },
  ],
  sent: [],
  trash: [],
}

export default function OutlookEmailApp() {
  const [selectedCategory, setSelectedCategory] = useState<string>("inbox")
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)
  const [showInvoiceDialog, setShowInvoiceDialog] = useState<boolean>(false)
  const [showChangesDialog, setShowChangesDialog] = useState<boolean>(false)
  const [showResponseDialog, setShowResponseDialog] = useState<boolean>(false)
  const [showAnalysis, setShowAnalysis] = useState<boolean>(false)
  const [showReviewChangesModal, setShowReviewChangesModal] = useState<boolean>(false)
  const [showInvoiceDetailsModal, setShowInvoiceDetailsModal] = useState<boolean>(false)
  const [referringEmail, setReferringEmail] = useState<Email | null>(null)
  const [showReferralOptions, setShowReferralOptions] = useState<boolean>(false)

  const handleEmailSelect = (email: Email) => {
    setSelectedEmail(email)
    setShowAnalysis(false)

    // Auto-show analysis for Invoice Received emails
    
  }

  const handleShowInvoiceDialog = () => {
    setShowInvoiceDialog(true)
  }

  const handleCloseInvoiceDialog = () => {
    setShowInvoiceDialog(false)
  }

  const handleShowChangesDialog = () => {
    setShowReviewChangesModal(true)
  }

  const handleCloseChangesDialog = () => {
    setShowChangesDialog(false)
  }

  const handleShowResponseDialog = () => {
    setShowResponseDialog(true)
  }

  const handleCloseResponseDialog = () => {
    setShowResponseDialog(false)
  }

  const handleShowAnalysis = () => {
    setShowAnalysis(true)
  }

  const handleCloseReviewChangesModal = () => {
    setShowReviewChangesModal(false)
  }

  const handleAcceptChanges = () => {
    setShowReviewChangesModal(false)
  }

  const handleShowInvoiceDetailsModal = () => {
    setShowInvoiceDetailsModal(true)
  }

  const handleCloseInvoiceDetailsModal = () => {
    setShowInvoiceDetailsModal(false)
  }

  const handlePaymentApproved = () => {
    console.log("Payment approved")
  }

  const handleReferEmail = (email: Email) => {
    setReferringEmail(email)
    setShowReferralOptions(true)
  }

  const handleCloseReferralOptions = () => {
    setShowReferralOptions(false)
    setReferringEmail(null)
  }
  const hanelSelectedCategory=(vale:any)=>{
  setSelectedCategory(vale)
  
  
   setSelectedEmail(null)
   setShowAnalysis(false)

  


  }

  return (
    <div className="h-screen bg-slate-50 flex flex-col">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <EmailHeader />
      </div>


   

{/* Main layout with header padding */}
<div className="pt-12 h-screen flex overflow-hidden">
  {/* Sidebar */}
  <div className="w-1/5 bg-white border-r border-slate-200 h-full">
    <EmailSidebar
      selectedCategory={selectedCategory}
      onCategorySelect={hanelSelectedCategory}
      emailCounts={{
        inbox: mockEmails.inbox.length,
        drafts: mockEmails.drafts.length,
        sent: mockEmails.sent.length,
        trash: mockEmails.trash.length,
         "all-mail": 0,
  starred: 0,
  archive: 0,
  spam: 0
      }}
    />
  </div>

  {/* Email list and detail section */}
  <div className="flex-1 flex h-full mt-16">
    {/* Email list (left section) */}
    <div className="w-80 md:w-2/5 bg-slate-50 border-r border-slate-200 h-full">
      <EmailList
        emails={mockEmails[selectedCategory] || []}
        selectedEmail={selectedEmail}
        onEmailSelect={handleEmailSelect}
        category={selectedCategory}
        onReferEmail={handleReferEmail}
      />
    </div>

    {/* Email detail (right section, scrollable) */}
    <div className="flex-1  h-100vh overflow-y-auto  bg-white">
      <EmailDetail
        email={selectedEmail}
        onShowInvoiceDialog={handleShowInvoiceDetailsModal}
        onShowChangesDialog={handleShowChangesDialog}
        onShowResponseDialog={handleShowResponseDialog}
        onShowAnalysis={handleShowAnalysis}
        showAnalysis={showAnalysis}
        onReferEmail={handleReferEmail}
      />
    </div>
  </div>
</div>

   
      {/* Dialogs */}
      < AnalysisModal
  showAnalysis={showAnalysis}
  setShowAnalysis={setShowAnalysis}
  selectedEmail={selectedEmail}
/>
      {showInvoiceDialog && selectedEmail && <InvoiceDialog email={selectedEmail} onClose={handleCloseInvoiceDialog} />}
      {showChangesDialog && selectedEmail && <ChangesDialog email={selectedEmail} onClose={handleCloseChangesDialog} />}
      {showResponseDialog && selectedEmail && (
        <ResponseDialog email={selectedEmail} onClose={handleCloseResponseDialog} />
      )}

      {/* Modals */}
      {showReviewChangesModal && selectedEmail && (
        <ReviewChangesModal onClose={handleCloseReviewChangesModal} onAccept={handleAcceptChanges} />
      )}
      {showInvoiceDetailsModal && selectedEmail && (
        <InvoiceDetailsModal onClose={handleCloseInvoiceDetailsModal} onPaymentApproved={handlePaymentApproved} />
      )}

      {/* Referral Options Dialog */}
      {showReferralOptions && referringEmail && (
        <Dialog open={true} onOpenChange={handleCloseReferralOptions}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Share2 className="h-5 w-5 text-blue-600" />
                Refer Email
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <p className="text-sm text-slate-600">
                Referring: <span className="font-medium text-slate-800">{referringEmail.subject}</span>
              </p>

              <div className="space-y-3">
                <Button className="w-full justify-between" variant="outline">
                  Forward to Manager
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                <Button className="w-full justify-between" variant="outline">
                  Share with Procurement Team
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                <Button className="w-full justify-between" variant="outline">
                  Escalate to Finance Department
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                <Button className="w-full justify-between" variant="outline">
                  Send to External Vendor
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
            <div className="flex justify-end">
              <Button variant="outline" onClick={handleCloseReferralOptions}>
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
