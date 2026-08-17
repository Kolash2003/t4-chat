"use client";

import React from 'react'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import UserButton from '@/modules/authentication/components/user-button';
import {
    PlusIcon,
    SearchIcon,
    MenuIcon,
    EllipsisIcon,
    Trash,
    X,
  } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useMemo } from 'react';
import { isToday, isYesterday, isWithinInterval, subDays } from 'date-fns';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";

const ChatSideBar = ({user}) => {
    const [searchQuery, setSearchQuery] = useState("");


  return (
    <div className='flex h-full w-64 flex-col border-r border-border bg-sidebar'>
        {/* Header */}
        <div className='flex items-center border-b border-sidebar-border px-4 py-3'>
            <Image src="/logo.svg" alt="logo" width={100} height={100}/>
        </div>

        <div className='p-4'>
            <Link href={"/"}>
                <Button className={"w-full"}>
                    <PlusIcon className="mr-2 h-4 w-4" />
                        New Chat
                </Button>
            </Link>
        </div>

        <div className='px-4 pb-4'>
            <div className='relative'>
                <SearchIcon className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground'/>
                <Input 
                    placeholder='Search your threads...'
                    className='pl-9 pr-8 bg-sidebar-accent border-sidebar-border'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                {
                    searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground'
                        >
                            <X className='h-4 w-4' />
                        </button>
                    )
                }
            </div>
        </div>

        <div className='flex-1 overflow-y-auto px-2'>
                {/* TODO */}
        </div>

        {/* Footer */}
        <div className="p-4 flex items-center gap-3 border-t border-sidebar-border">
            <UserButton user={user} />
            <span className="flex-1 text-sm text-sidebar-foreground truncate">
                {user.email}
            </span>
      </div>
    </div>
  )
}

export default ChatSideBar
