"use client"

import { useState } from "react"
// Removed Button import as we'll style basic elements
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Mail,
  Eye,
  Send,
  X,
  User,
  Clock,
  Loader2,
  BarChart3,
  Receipt,
  MessageSquare,
  Share2,
  FileText,
} from "lucide-react"

import { cn } from "@/lib/utils"

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
}

interface EmailDetailProps {
  email: Email | null
  onShowInvoiceDialog: () => void
  onShowChangesDialog: () => void
  onShowResponseDialog: () => void
  onShowAnalysis: () => void
  showAnalysis: boolean
  onReferEmail?: (email: Email) => void
}

const getEmailTypeColor = (type: string): string => {
  switch (type) {
    case "PO Acknowledgment":
      return "bg-green-100 text-green-700 border-green-200"
    case "PO Discrepancy Alert":
      return "bg-red-100 text-red-700 border-red-200"
    case "Invoice Missing PO":
      return "bg-amber-100 text-amber-700 border-amber-200"
    case "Invoice Received":
      return "bg-blue-100 text-blue-700 border-blue-200"
    default:
      return "bg-gray-100 text-gray-700 border-gray-200"
  }
}

export function EmailDetail({
  email,
  onShowInvoiceDialog,
  onShowChangesDialog,
  onShowResponseDialog,
  onShowAnalysis,
  showAnalysis,
  onReferEmail,
}: EmailDetailProps) {


  const handleAnalyze = () => {
    
   
    onShowAnalysis()
   
  }

  if (!email) {
    return (
      <div className="flex items-center justify-center h-full text-slate-500 bg-slate-50">
        <div className="text-center">
          <Mail className="h-16 w-16 mx-auto mb-4 opacity-30" />
          <p className="text-lg">Select an email to view</p>
          <p className="text-sm">Choose an email from the list to read its contents</p>
        </div>
      </div>
    )
  }

// Define classes for the hyperlink-like appearance
const linkStyleClasses = "inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium leading-relaxed cursor-pointer"; // Use inline-flex to align icon and text, add cursor-pointer

const renderAnalysisButton = () => {
  if (email.type === "PO Acknowledgment") return null

  return (
    <div className="flex gap-4"> {/* Keep flex gap for spacing between buttons in the row */}
      {/* Analyze Link/Button */}
      <button 
        onClick={handleAnalyze}

      
        className={cn(linkStyleClasses)} // Add disabled styling
      >
        {
          <BarChart3 className="mr-1 h-4 w-4 text-blue-500" /> // Analysis icon with blue color
      }
        Analyze Email
      </button>

     
      {email.type === "SAP Invoice" && (
        <button
          onClick={onShowInvoiceDialog}
          className={linkStyleClasses} // Apply link styling classes
        >
          <Receipt className="mr-1 h-4 w-4 text-blue-500" /> {/* Invoice/Receipt icon with blue color */}
          View Details
        </button>
      )}
    </div>
  )
}

const renderActionButtons = () => {
  
  if (email.type === "PO Discrepancy Alert") {
    return (
      <div className="flex gap-4"> {/* Keep flex gap */}
        <button
          onClick={onShowChangesDialog}
          className={linkStyleClasses} // Apply link styling classes
        >
           <FileText className="mr-1 h-4 w-4 text-blue-500" /> {/* Icon with blue color */}
          Review Changes
        </button>
      </div>
    )
  }

  if (email.type === "Invoice Missing PO") {
    return (
      <div className="flex gap-4"> {/* Keep flex gap */}
        <button
          onClick={onShowResponseDialog}
          className={linkStyleClasses} // Apply link styling classes
        >
          <MessageSquare className="mr-1 h-4 w-4 text-blue-500" /> {/* Icon with blue color */}
          View Response
        </button>
      </div>
    )
  }

  if(email.type === "Invoice Received" ) {
      return(
        <div className="flex gap-4"> {/* Keep flex gap */}
        <button
          onClick={onShowInvoiceDialog}
          className={linkStyleClasses} // Apply link styling classes
        >
          <Receipt className="mr-1 h-4 w-4 text-blue-500" /> {/* Icon with blue color */}
          View Invoice Details
        </button>
        </div>
      )
  }

  return null 
}

const splitMarker = "Best regards,";
const markerIndex = email.body.indexOf(splitMarker);

let partBefore = email.body;
let partAfter = '';

if (markerIndex !== -1) {
  let splitPoint = markerIndex;
 
  let lastNewlineBefore = email.body.lastIndexOf('\n', markerIndex - 1);

  if (lastNewlineBefore !== -1) {
      splitPoint = lastNewlineBefore + 1; // Split just after the newline
  } else {
      splitPoint = 0;
  }

  partBefore = email.body.substring(0, splitPoint);
  partAfter = email.body.substring(splitPoint);
}


  return (
 <div className="w-full flex flex-col h-full max-h-[900px] bg-white ">
      {/* Email Header */}
      <div className="p-6 border-b border-slate-200 bg-slate-50">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-xl font-semibold text-slate-800 mb-2">{email.subject}</h1>
              <div className="flex items-center gap-2">
                <Badge className={cn("text-xs", getEmailTypeColor(email.type))}>{email.type}</Badge>
                {onReferEmail && (
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => onReferEmail(email)}
                    className="h-6 px-2 text-xs border-orange-300 text-orange-600 hover:bg-orange-50"
                  >
                    <Share2 className="h-3 w-3 mr-1" />
                    Refer
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Email metadata */}
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-slate-500" />
              <span className="font-medium text-slate-700">From:</span>
              <span className="text-slate-600">{email.from}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-slate-500" />
              <span className="font-medium text-slate-700">To:</span>
              <span className="text-slate-600">{email.to}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-slate-500" />
              <span className="font-medium text-slate-700">Sent:</span>
              <span className="text-slate-600">
                {email.date} at {email.time}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Email Body */}
      <div className="flex-1 mb-16 p-6 overflow-y-auto">
        <div className="space-y-6">
          <div>
          
            <div className="bg-white rounded-lg text-sm whitespace-pre-line text-slate-700 leading-relaxed">

             
              {partBefore}

              
              {markerIndex !== -1 && (
               
                <div className="flex gap-6  mb-4">
                 
                  {renderAnalysisButton()}
                  {renderActionButtons()}
                </div>
              )}

              
              {partAfter}
           </div> 
          </div>


        </div>
      </div>
    </div>
  )
}