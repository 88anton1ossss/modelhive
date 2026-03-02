'use client'

import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface WorkspaceInspectorProps {
    children: React.ReactNode
}

export function WorkspaceInspector({ children }: WorkspaceInspectorProps) {
    const [mounted, setMounted] = useState(false)
    const [container, setContainer] = useState<Element | null>(null)

    useEffect(() => {
        setMounted(true)
        setContainer(document.getElementById('inspector-content'))
    }, [])

    if (!mounted || !container) return null

    return createPortal(children, container)
}
