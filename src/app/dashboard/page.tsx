import { Navbar } from '@/components/Navbar'
import { ProductTable } from '@/components/ProductTable'

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-[#0a0f1a]">
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <main className="p-8">
                <div className='max-w-7xl mx-auto'>

                    {/* Products Table */}
                    <ProductTable />
                
                </div>
            </main>
        </div>
    )
}