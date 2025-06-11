'use client';

import type React from "react"
import { useState } from 'react';

import { Mail, Star, Trash, Folder, ChevronRight, Send, FileText, AlertTriangle, Archive, Calendar, Users, Plus } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";

interface EmailCategory {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

interface EmailCounts {
  inbox: number
  drafts: number
  sent: number
  trash: number
  starred: number
  archive: number
  'all-mail': number
  spam: number
}

interface EmailSidebarProps {
  selectedCategory: string
  onCategorySelect: (category: string) => void
  emailCounts: EmailCounts
}

const emailCategories: EmailCategory[] = [
  { id: "inbox", label: "Inbox", icon: Mail },
  { id: "starred", label: "Starred", icon: Star },
  { id: "sent", label: "Sent Items", icon: Send },
  { id: "trash", label: "Deleted Items", icon: Trash },
];

const foldersCategories: EmailCategory[] = [
  
  { id: "drafts", label: "Drafts", icon: FileText },


  { id: "spam", label: "Junk Email", icon: AlertTriangle },
  { id: "archive", label: "Archive", icon: Archive },
  { id: "all-mail", label: "All Mail", icon: Mail },
];

const quickActions: EmailCategory[] = [
  { id: "calendar", label: "Calendar", icon: Calendar },
  { id: "people", label: "People", icon: Users },
];

export function EmailSidebar({ selectedCategory, onCategorySelect, emailCounts }: EmailSidebarProps) {
  return (
    <div className="h-full mt-12 flex flex-col py-2 bg-[#f3f2f1] text-gray-700">

      
      <div className="px-2 py-1">
        <div className="flex items-center justify-between text-sm font-semibold mb-1 text-gray-700">
          <span>Favorites</span>
          <ChevronRight className="h-4 w-4" />
        </div>
        <div className="pl-4  space-y-1">
          {emailCategories.map((category) => (
            <div
              key={category.id}
              className={`
                flex items-center text-sm py-1 px-1 text-gray-700 cursor-pointer rounded
                hover:bg-blue-200
                ${selectedCategory === category.id ? 'bg-blue-300 text-black font-semibold' : ''}
              `}
              onClick={() => onCategorySelect(category.id)}
            >
              <category.icon className={`h-4 w-4 mr-2 ${selectedCategory === category.id ? 'text-blue-600' : 'text-gray-600'}`} />
              <span>{category.label}</span>
              {emailCounts[category.id as keyof EmailCounts] > 0 && (
                <Badge className={`ml-auto text-xs px-1.5 rounded ${selectedCategory === category.id ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white'}`}>
                   {emailCounts[category.id as keyof EmailCounts]}
                </Badge>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="px-2 py-1 mt-2">
        <div className="flex items-center justify-between text-sm font-semibold mb-1 text-gray-700">
          <span>Folders</span>
          <ChevronRight className="h-4 w-4" />
        </div>
        <div className="pl-4 space-y-1">
           {foldersCategories.map((category) => (
            <div
              key={category.id}
               className={`
                flex items-center text-sm py-1 px-1 text-gray-700 cursor-pointer rounded
                 hover:bg-blue-200
                ${selectedCategory === category.id ? 'bg-blue-300 text-black font-semibold' : ''}
              `}
               onClick={() => onCategorySelect(category.id)}
            >
              <category.icon className={`h-4 w-4 mr-2 ${selectedCategory === category.id ? 'text-blue-600' : 'text-gray-600'}`} />
              <span>{category.label}</span>
               {emailCounts[category.id as keyof EmailCounts] > 0 && !emailCategories.some(favCat => favCat.id === category.id) && (
                <Badge className={`ml-auto text-xs px-1.5 rounded ${selectedCategory === category.id ? 'bg-blue-700 text-white' : (category.id === 'spam' ? 'bg-gray-400' : 'bg-blue-600')} text-white`}>
                   {emailCounts[category.id as keyof EmailCounts]}
                </Badge>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="px-2 py-1 mt-2">
        <div className="flex items-center justify-between text-sm font-semibold mb-1 text-gray-700">
          <span>Quick Access</span>
          <ChevronRight className="h-4 w-4" />
        </div>
        <div className="pl-4 space-y-1">
           {quickActions.map((action) => (
            <div
              key={action.id}
               className={`
                flex items-center text-sm py-1 px-1 text-gray-700 cursor-pointer rounded
                 hover:bg-blue-200
                ${selectedCategory === action.id ? 'bg-blue-300 text-black font-semibold' : ''}
              `}
               onClick={() => onCategorySelect(action.id)}
            >
              <action.icon className={`h-4 w-4 mr-2 ${selectedCategory === action.id ? 'text-blue-600 ' : 'text-gray-600'}`} />
              <span>{action.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}