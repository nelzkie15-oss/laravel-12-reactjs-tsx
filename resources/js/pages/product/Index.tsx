import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { SquareCheckBig } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Product {
    id: number;
    product_name: string;
    quantity: number;
    price: number;
    description: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Product',
        href: '/products',
    },
];

export default function Index() {
    const { flash, products = [] } = usePage<{ flash: { message?: string }, products?: Product[] }>().props;
    const [showFlash, setShowFlash] = useState(false);

    useEffect(() => {
        if (flash.message) {
            setShowFlash(true);
            const timer = setTimeout(() => {
                setShowFlash(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [flash.message]);

    const { processing, delete: destroy } = useForm({});

    const handleDelete = (id: number, product_name: string) => {
        if (confirm(`Do you want to delete "${product_name}"?`)) {
            destroy(route('product.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Product" />

            <div className="m-4">
                <Link href={route('product.create')}>
                    <Button>Add Product</Button>
                </Link>
            </div>

            {flash.message && showFlash && (
                <div className="m-3 mb-4 flex w-full max-w-2xl items-center gap-2 rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700 transition-opacity duration-300">
                    <SquareCheckBig size={18} />
                    {flash.message}
                </div>
            )}

            {products.length > 0 ? (
                <Table className="w-full lg:w-8/12">
                    <TableCaption>A list of your products.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[150px]">Product Name</TableHead>
                            <TableHead className="w-[100px]">Quantity</TableHead>
                            <TableHead className="w-[100px]">Price</TableHead>
                            <TableHead className="w-[200px]">Description</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell className="font-medium">{product.product_name}</TableCell>
                                <TableCell>{product.quantity}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{product.description}</TableCell>
                                <TableCell className="space-x-1 text-right">
                                    <Link href={route('product.edit', product.id)}>
                                        <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button
                                        disabled={processing}
                                        onClick={() => handleDelete(product.id, product.product_name)}
                                        variant="destructive"
                                        size="sm"
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <div className="m-4 text-center text-gray-500">
                    <p>No products found. Create your first product!</p>
                </div>
            )}
        </AppLayout>
    );
}
