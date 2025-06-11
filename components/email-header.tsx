"use client"

import { Button } from "@/components/ui/button"
import { RefreshCw, Mail, Search, Trash, Archive, Folder, Settings, Bell, Grid3X3, ChevronDown,HelpCircle } from "lucide-react"
import { useState } from "react"

import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { User, Video  } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"


interface OutlookHeaderProps {
  onRefresh: () => void
  isRefreshing: boolean
}

export function EmailHeader() {

  const [searchQuery, setSearchQuery] = useState("")
    const [selectedTab, setSelectedTab] = useState('HOME');

  // Define your tabs for easier mapping
  const tabs = ['FILE', 'HOME', 'SEND / RECEIVE', 'FOLDER', 'VIEW'];

  return (
    <div className="flex flex-col">
      {/* Top blue bar */}
 <header className="h-12 bg-[#0F6CBD] text-white flex items-center px-4 border-b border-blue-700 shadow-sm">
      <div className="flex items-center gap-4 flex-1 max-w-full">
        {/* App Launcher */}
        <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700 p-1 flex-shrink-0">
          <Grid3X3 className="h-4 w-4" />
        </Button>

        {/* Outlook Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Mail className="h-5 w-5" />
          <span className="font-semibold text-sm">Outlook</span>
        </div>

        {/* Search Bar - Properly centered and responsive */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search mail and people"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 h-8 bg-white border-white/20 text-white "
            />
          </div>
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Meet Button */}
        <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700 flex items-center gap-1 px-2">
          <Video className="h-4 w-4" />
          <span className="text-xs hidden sm:inline">Meet</span>
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700 relative p-2">
          <Bell className="h-4 w-4" />
          <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 bg-red-500 text-white text-xs flex items-center justify-center">
            3
          </Badge>
        </Button>

        {/* Settings */}
        <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700 p-2">
          <Settings className="h-4 w-4" />
        </Button>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700 flex items-center gap-1 px-2">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="h-3 w-3" />
              </div>
              <ChevronDown className="h-3 w-3 hidden sm:inline" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>
              <div className="flex flex-col">
                <span className="font-medium">John Doe</span>
                <span className="text-xs text-slate-500">john.doe@chemcorp.com</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>My Profile</DropdownMenuItem>
            <DropdownMenuItem>Account Settings</DropdownMenuItem>
            <DropdownMenuItem>Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>

      {/* Ribbon menu */}
      <div className="bg-[#f3f2f1] border-b border-gray-300">
        {/* Main ribbon */}
         <div className="flex items-center px-2 py-1 border-b border-gray-300">
      <div className="flex items-center mr-4">
        {tabs.map((tab) => (
         <Button
            key={tab}
            variant="secondary" // Use your secondary variant
            size="sm"
            onClick={() => setSelectedTab(tab)}
            className={`
              bg-[#f3f2f1]
              text-xs font-normal  h-7
              rounded-none
              
              pb-1 
             
              ${selectedTab === tab ? 'border-b-4 border-blue-500 font-semibold ' : 'border-none'}
             
       
            `}
          >
            {tab}
          </Button>
        ))}
      </div>
    </div>

        {/* Command bar */}
        <div className="flex items-center px-2 py-1">
          <div className="flex items-center space-x-1 mr-4">
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <Mail className="h-4 w-4 mr-1" />
              New
            </Button>
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <Trash className="h-4 w-4 mr-1" />
              Delete
            </Button>
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <Archive className="h-4 w-4 mr-1" />
              Archive
            </Button>
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <Folder className="h-4 w-4 mr-1" />
              Move to
            </Button>
            {/* <Button variant="ghost" size="sm" className="h-8 px-2" onClick={onRefresh} disabled={isRefreshing}>
              <RefreshCw className={`h-4 w-4 mr-1 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button> */}
          </div>
          <div className="flex-1"></div>
         
        </div>
      </div>
    </div>
  )
}
