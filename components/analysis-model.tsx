import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface InvoiceOrDiscrepancyDialogProps {
  showAnalysis: boolean
  setShowAnalysis: (val: boolean) => void
  selectedEmail: any
}

export function AnalysisModal({
  showAnalysis,
  setShowAnalysis,
  selectedEmail,
}: InvoiceOrDiscrepancyDialogProps) {

  const isInvoice = selectedEmail?.type === "Invoice Received" || selectedEmail?.type === "Invoice Missing PO";
  const isDiscrepancy = selectedEmail?.type === "PO Discrepancy Alert";

  return (
    <Dialog open={showAnalysis} onOpenChange={setShowAnalysis}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isInvoice
              ? selectedEmail?.type === "Invoice Missing PO"
                ? "Invoice PO Missing "
                : "Chemical Invoice Analysis"
              : isDiscrepancy
              ? "Discrepancy Analysis"
              : "Analysis"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {isInvoice && selectedEmail?.invoiceAnalysis && (
            <>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">Chemical Compliance Summary</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  {selectedEmail.invoiceAnalysis.complianceNotes.map((note: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                      {note}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border rounded-lg p-4">
                <h3 className="font-semibold text-slate-800 mb-3">Chemical Inventory Details</h3>
                <div className="space-y-3">
                  {selectedEmail.invoiceAnalysis.items
                    .filter((item: any) => item.cas !== "N/A")
                    .map((item: any, index: number) => (
                      <div key={index} className="border-l-4 border-blue-400 pl-4 py-2">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium text-slate-800">{item.description}</h4>
                          <span className="text-sm font-semibold text-slate-600">
                            ${item.total.toLocaleString()}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-xs text-slate-600">
                          <div><span className="font-medium">CAS Number:</span> {item.cas}</div>
                          <div><span className="font-medium">Hazard Class:</span> {item.hazardClass}</div>
                          <div><span className="font-medium">Purity:</span> {item.purity}</div>
                          <div><span className="font-medium">Storage:</span> {item.storageTemp}</div>
                          <div className="col-span-2">
                            <span className="font-medium">SDS Required:</span>
                            <span className={`ml-1 ${item.sdsRequired ? "text-red-600" : "text-green-600"}`}>
                              {item.sdsRequired ? "Yes" : "No"}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="bg-white border rounded-lg p-4">
                <h3 className="font-semibold text-slate-800 mb-3">Cost Breakdown</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Chemical Subtotal:</span>
                    <span className="font-medium">
                      ${selectedEmail.invoiceAnalysis.subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Hazmat Handling:</span>
                    <span className="font-medium">
                      ${selectedEmail.invoiceAnalysis.hazmatFee.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Shipping:</span>
                    <span className="font-medium">
                      ${selectedEmail.invoiceAnalysis.shipping.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Tax:</span>
                    <span className="font-medium">
                      ${selectedEmail.invoiceAnalysis.tax.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t font-semibold">
                    <span>Total Amount:</span>
                    <span className="text-lg">
                      ${selectedEmail.invoiceAnalysis.total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}

          {isDiscrepancy && selectedEmail?.analysis && (
            <>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-semibold text-red-800 mb-2">Summary</h3>
                <p className="text-sm text-red-700">
                  {selectedEmail.analysis.summary}
                </p>
              </div>

              <div className="bg-white border rounded-lg p-4">
                <h3 className="font-semibold text-slate-800 mb-3">Detailed Analysis</h3>
                <ul className="space-y-2">
                  {selectedEmail.analysis.details.map((detail: string, index: number) => (
                    <li key={index} className="text-sm text-slate-600 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
