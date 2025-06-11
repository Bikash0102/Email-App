"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Flag, Paperclip, RefreshCcw, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState,useEffect } from "react"

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

interface EmailListProps {
  emails: Email[]
  selectedEmail: Email | null
  onEmailSelect: (email: Email) => void
  category: string
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

const getPriorityIcon = (priority: string) => {
  if (priority === "high") {
    return <Flag className="h-3 w-3 text-red-500" />
  }
  return null
}



export function EmailList({ emails, selectedEmail, onEmailSelect, category, onReferEmail }: EmailListProps) {

  const [isRefreshing, setIsRefreshing] = useState(false)
  const [visibleEmails, setVisibleEmails] = useState(emails)
useEffect(()=>{
setVisibleEmails(emails)


},[emails])



  const handleRefresh = async () => {
    setIsRefreshing(true)
    setVisibleEmails([]) // simulate blank state to show refresh effect

    await new Promise((res) => setTimeout(res, 1000))

    // simulate reload (same emails restored)
    setVisibleEmails(emails)
    setIsRefreshing(false)
  }



useEffect(()=>{
setVisibleEmails(emails)


},[emails])
  if (!emails || emails.length === 0) {
    return (
      <div className="p-6 text-center text-slate-500">
        <p>No emails in {category}</p>
      </div>
    )
  }

  return (
    <div className=" overflow-x-hidden flex flex-col">
      <div className="p-4 border-b flex justify-between items-center border-slate-200 bg-white">
        <div>
          <h2 className="font-semibold text-slate-800 capitalize text-lg">{category}</h2>
          <p className="text-sm text-slate-500">{emails.length} items</p>
        </div>
    <button
  onClick={() => handleRefresh()}
  className="p-1 rounded hover:bg-slate-100 transition-colors"
  title="Refresh"
>
  <RefreshCcw
            className={cn(
              "h-4 w-4 text-slate-500",
              isRefreshing && "animate-spin"
            )}
          />
</button>
      </div>
      <div className="flex-1 overflow-auto">
        {visibleEmails.map((email) => (
          <div
            key={email.id}
            className={cn(
              "p-4 cursor-pointer border-b border-slate-100 hover:bg-blue-50 transition-colors group",
              selectedEmail?.id === email.id && "bg-blue-100 border-l-4 border-l-blue-500",
              !email.isRead && "bg-slate-50 border-l-4 border-l-blue-400",
            )}
            onClick={() => onEmailSelect(email)}
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className={cn("text-sm font-medium text-slate-800 truncate", !email.isRead && "font-semibold")}>
                      {email.from}
                    </p>
                    {getPriorityIcon(email.priority)}
                    <Paperclip className="h-3 w-3 text-slate-400" />
                    {onReferEmail && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          onReferEmail(email)
                        }}
                        className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Share2 className="h-4 w-4 text-orange-500" />
                        <span className="sr-only">Refer</span>
                      </Button>
                    )}
                  </div>
                  <p className={cn("text-sm text-slate-700 truncate mb-1", !email.isRead && "font-semibold")}>
                    {email.subject}
                  </p>
                  <p className="text-xs text-slate-500 truncate mb-2">{email.preview}</p>
                  <div className="flex items-center justify-between">
                 
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <span>{email.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
