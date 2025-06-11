"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, AlertTriangle, TrendingUp, Beaker } from "lucide-react"
import { cn } from "@/lib/utils"

interface ComparisonViewProps {
  email: any
  onBack: () => void
}

export function ComparisonView({ email, onBack }: ComparisonViewProps) {
  if (!email || !email.originalPO || !email.modifiedPO) {
    return (
      <div className="p-6 bg-white">
        <Button onClick={onBack} variant="outline" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Email
        </Button>
        <p>No comparison data available</p>
      </div>
    )
  }

  const { originalPO, modifiedPO } = email

  const renderPOCard = (po: any, title: string, isModified = false) => (
    <Card className={cn("h-fit shadow-sm", isModified && "border-red-200")}>
      <CardHeader className={cn("pb-4 bg-slate-50", isModified && "bg-red-50 border-b border-red-100")}>
        <CardTitle className="flex items-center justify-between">
          <span className="text-slate-800 flex items-center gap-2">
            <Beaker className="h-4 w-4" />
            {title}
          </span>
          {isModified && (
            <Badge variant="destructive" className="flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              Modified
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-500 font-medium">PO Number:</span>
            <p className="font-semibold text-slate-800">{po.poNumber}</p>
          </div>
          <div>
            <span className="text-slate-500 font-medium">Date:</span>
            <p className="font-semibold text-slate-800">{po.date}</p>
          </div>
          <div className="col-span-2">
            <span className="text-slate-500 font-medium">Chemical Supplier:</span>
            <p className="font-semibold text-slate-800">{po.supplier}</p>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-slate-800">Chemical Line Items</h4>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left p-3 font-medium text-slate-700">Chemical Description</th>
                  <th className="text-right p-3 font-medium text-slate-700">Qty</th>
                  <th className="text-right p-3 font-medium text-slate-700">Unit Price</th>
                  <th className="text-right p-3 font-medium text-slate-700">Total</th>
                  <th className="text-center p-3 font-medium text-slate-700">CAS</th>
                  <th className="text-center p-3 font-medium text-slate-700">Hazard</th>
                </tr>
              </thead>
              <tbody>
                {po.items.map((item: any, index: number) => {
                  const originalItem = originalPO.items[index]
                  const isChanged =
                    isModified &&
                    originalItem &&
                    (item.unitPrice !== originalItem.unitPrice || item.total !== originalItem.total)

                  return (
                    <tr key={index} className={cn("border-t", isChanged && "bg-red-50")}>
                      <td className="p-3">{item.description}</td>
                      <td className="p-3 text-right">{item.quantity}</td>
                      <td className={cn("p-3 text-right", isChanged && "font-bold text-red-600")}>${item.unitPrice}</td>
                      <td className={cn("p-3 text-right", isChanged && "font-bold text-red-600")}>
                        ${item.total.toLocaleString()}
                      </td>
                      <td className="p-3 text-center text-xs">{item.cas}</td>
                      <td className="p-3 text-center">
                        <Badge variant="outline" className="text-xs">
                          Class {item.hazardClass}
                        </Badge>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-2 pt-4 border-t">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Chemical Subtotal:</span>
            <span
              className={cn(
                "font-medium",
                isModified && po.subtotal !== originalPO.subtotal && "text-red-600 font-bold",
              )}
            >
              ${po.subtotal.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Shipping:</span>
            <span
              className={cn(
                "font-medium",
                isModified && po.shipping !== originalPO.shipping && "text-red-600 font-bold",
              )}
            >
              ${po.shipping.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Hazmat Fee:</span>
            <span
              className={cn(
                "font-medium",
                isModified && po.hazmatFee !== originalPO.hazmatFee && "text-red-600 font-bold",
              )}
            >
              ${po.hazmatFee.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-lg font-bold pt-2 border-t">
            <span>Total:</span>
            <span className={cn(isModified && po.total !== originalPO.total && "text-red-600")}>
              ${po.total.toLocaleString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const priceDifference = modifiedPO.total - originalPO.total
  const percentageChange = ((priceDifference / originalPO.total) * 100).toFixed(1)

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-6 border-b border-slate-200 bg-slate-50">
        <Button onClick={onBack} variant="outline" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Email
        </Button>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-slate-800">Chemical Purchase Order Comparison</h1>
          <div className="text-right">
            <p className="text-sm text-slate-500 flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              Price Change
            </p>
            <p className={cn("text-lg font-bold", priceDifference > 0 ? "text-red-600" : "text-green-600")}>
              {priceDifference > 0 ? "+" : ""}${priceDifference.toLocaleString()} ({percentageChange}%)
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-2 gap-6">
          {renderPOCard(originalPO, "Original Chemical Order")}
          {renderPOCard(modifiedPO, "Modified Chemical Order", true)}
        </div>

        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h3 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Chemical Price Changes Summary
          </h3>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• Methanol (CH3OH) unit price increased from $2.50/L to $3.00/L (+$0.50/L)</li>
            <li>• Ethanol (C2H5OH) unit price increased from $3.00/L to $3.50/L (+$0.50/L)</li>
            <li>• Benzene (C6H6) unit price increased from $4.00/L to $4.75/L (+$0.75/L)</li>
            <li>
              • Total chemical cost increase: ${priceDifference.toLocaleString()} ({percentageChange}%)
            </li>
            <li>• Reason: Petrochemical supply chain disruptions</li>
          </ul>
        </div>

        <div className="flex gap-3 mt-6">
          <Button variant="destructive">Reject Changes</Button>
          <Button className="bg-blue-600 hover:bg-blue-700">Approve Changes</Button>
          <Button variant="outline">Request Alternative Suppliers</Button>
        </div>
      </div>
    </div>
  )
}
