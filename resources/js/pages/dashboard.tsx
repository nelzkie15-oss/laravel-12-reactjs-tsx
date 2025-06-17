import { FileText, LayoutGrid, SquareChartGantt, SquareUser, Users, Printer } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-col flex-1 h-full gap-4 p-4 overflow-x-auto rounded-xl">
                <div className="grid mb-12 gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-4">
                    <div className="relative flex flex-col text-gray-700 bg-white border shadow-sm border-blue-gray-100 rounded-xl bg-clip-border">
                        <div className="absolute grid w-12 h-12 mx-4 mt-4 overflow-hidden text-white place-items-center rounded-xl bg-gradient-to-tr from-gray-900 to-gray-800 bg-clip-border shadow-gray-900/20">
                           <SquareChartGantt />
                        </div>
                        <div className="p-4 text-right">
                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-600">Total Products</p>
                            <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">0</h4>
                        </div>
                        <div className="p-4 border-t border-blue-gray-50">
                            <p className="block font-sans text-base antialiased font-normal leading-relaxed text-blue-gray-600">
                                <strong className="text-green-500">View Product</strong>
                            </p>
                        </div>
                    </div>
                    <div className="relative flex flex-col text-gray-700 bg-white border shadow-sm border-blue-gray-100 rounded-xl bg-clip-border">
                        <div className="absolute grid w-12 h-12 mx-4 mt-4 overflow-hidden text-white place-items-center rounded-xl bg-gradient-to-tr from-gray-900 to-gray-800 bg-clip-border shadow-gray-900/20">
                            <FileText />
                        </div>
                        <div className="p-4 text-right">
                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-600">Total Category</p>
                            <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">0</h4>
                        </div>
                        <div className="p-4 border-t border-blue-gray-50">
                            <p className="block font-sans text-base antialiased font-normal leading-relaxed text-blue-gray-600">
                                <strong className="text-green-500">View Category</strong>&nbsp;
                            </p>
                        </div>
                    </div>
                    <div className="relative flex flex-col text-gray-700 bg-white border shadow-sm border-blue-gray-100 rounded-xl bg-clip-border">
                        <div className="absolute grid w-12 h-12 mx-4 mt-4 overflow-hidden text-white place-items-center rounded-xl bg-gradient-to-tr from-gray-900 to-gray-800 bg-clip-border shadow-gray-900/20">
                        <SquareUser />
                        </div>
                        <div className="p-4 text-right">
                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-600">Total Order</p>
                            <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">0</h4>
                        </div>
                        <div className="p-4 border-t border-blue-gray-50">
                            <p className="block font-sans text-base antialiased font-normal leading-relaxed text-blue-gray-600">
                                <strong className="text-green-500">View Order</strong>&nbsp;
                            </p>
                        </div>
                    </div>
                    <div className="relative flex flex-col text-gray-700 bg-white border shadow-sm border-blue-gray-100 rounded-xl bg-clip-border">
                        <div className="absolute grid w-12 h-12 mx-4 mt-4 overflow-hidden text-white place-items-center rounded-xl bg-gradient-to-tr from-gray-900 to-gray-800 bg-clip-border shadow-gray-900/20">
                         <Users />
                        </div>
                        <div className="p-4 text-right">
                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-600">Total Customer</p>
                            <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                               0
                            </h4>
                        </div>
                        <div className="p-4 border-t border-blue-gray-50">
                            <p className="block font-sans text-base antialiased font-normal leading-relaxed text-blue-gray-600">
                                <strong className="text-green-500">view O</strong>&nbsp;
                            </p>
                        </div>
                    </div>
                </div>
                {/* <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div> */}
            </div>
        </AppLayout>
    );
}
