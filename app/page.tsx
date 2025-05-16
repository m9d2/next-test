'use client'
import dynamic from 'next/dynamic'
import Skeleton from "@/app/components/dashboard/components/skeleton";


const Dashboard = dynamic(() => import('@/app/components/dashboard'), {
    ssr: false,
    loading: () => <Skeleton/>,
})

export default function BlogPage() {
    return <Dashboard/>
}
