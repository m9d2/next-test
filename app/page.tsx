'use client'

import { useRouter } from "next/navigation"

export default function BlogPage() {
    const router = useRouter()
    router.push('/dashboard')
}
