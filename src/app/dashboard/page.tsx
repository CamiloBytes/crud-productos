import { Navbar } from '@/components/Navbar'
import { ProductCards } from '@/components/ProductCards'

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-[#0a0f1a]">
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <main className="p-8">
                <div className='max-w-7xl mx-auto'>

                    {/* Products Cards */}
                    <ProductCards />
                
                </div>
            </main>
        </div>
    )
}